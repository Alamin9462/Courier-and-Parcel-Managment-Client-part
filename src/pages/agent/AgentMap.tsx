/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { io, Socket } from "socket.io-client";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/feature/auth/authSlice";
import { useGetPickupsByAgentQuery } from "../../redux/feature/pickup/pickupSlice";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface AgentLocation {
  lat: number;
  lng: number;
}


const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function AgentMap() {
  const user = useSelector(selectCurrentUser);
  const agentId = user?._id ?? "";

  // API call: pickups by agent
  const { data, isLoading, error } = useGetPickupsByAgentQuery(agentId, {
    skip: !agentId,
  });

 const pickups = Array.isArray((data as any)?.pickups) ? (data as any).pickups : [];


  // Socket.io live agent locations (if needed)
  const [locations, setLocations] = useState<Record<string, AgentLocation>>({});
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!agentId) {
      console.warn("Agent ID not found");
      return;
    }

    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.connected);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    socket.on("locationUpdate", ({ agentId, lat, lng }) => {
      setLocations((prev) => ({
        ...prev,
        [agentId]: { lat, lng },
      }));
    });

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        socket.emit("agentLocation", {
          agentId: agentId,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Geolocation error:", err);
      },
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.disconnect();
    };
  }, [agentId]);

  if (isLoading) return <p>Loading pickups...</p>;
  if (error) return <p>Error loading pickups</p>;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Pickup parcel markers from API */}
        {pickups
          .filter((p : any) => p.lat !== null && p.lng !== null)
          .map((pickup: any) => (
            <Marker
              key={pickup.parcelId}
              position={[pickup.lat!, pickup.lng!]}
              icon={redIcon} 
            >
              <Popup>
                <b>Parcel ID:</b> {pickup.parcelId} <br />
                <b>Pickup Address:</b> {pickup.address}
              </Popup>
            </Marker>
          ))}

        {/* Live agent locations from socket (optional, can hide if not needed) */}
        {Object.entries(locations).map(([id, loc]) => (
          <Marker key={id} position={[loc.lat, loc.lng]} opacity={0.7}>
            <Popup>
              <b>Agent ID:</b> {id} <br />
              Lat: {loc.lat.toFixed(5)} <br />
              Lng: {loc.lng.toFixed(5)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
