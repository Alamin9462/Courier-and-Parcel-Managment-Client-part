

import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { useState, useEffect, useMemo } from "react";
import { MapPin, Truck, Package, User } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Mock data for demonstration
const mockParcel = {
  id: "PCL001",
  pickup: {
    address: "123 Main St, Dhaka",
    latlng: [23.8103, 90.4125] as [number, number],
  },
  delivery: {
    address: "456 Park Ave, Chattogram",
    latlng: [22.3569, 91.7832] as [number, number],
  },
  status: "In Transit",
  agent: {
    name: "Agent Rahim",
    phone: "+880123456789",
    currentLocation: [23.5, 90.8] as [number, number],
  },
  size: "Medium",
  payment: "COD",
};

const iconPickup = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -36],
  className: "leaflet-pickup-icon",
});
const iconDelivery = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-red.png",
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -36],
  className: "leaflet-delivery-icon",
});
const iconAgent = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-green.png",
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -36],
  className: "leaflet-agent-icon",
});

const TrackParcelPage = () => {
  // In real app, get parcelId from params and fetch data
  // const { parcelId } = useParams();
  const parcel = mockParcel; // Replace with fetched data

  // Demo route: simulate a polyline with multiple points (like Google Maps directions)

  const route: [number, number][] = useMemo(() => [
    parcel.pickup.latlng,
    [23.7, 90.6],
    [23.6, 90.9],
    [23.4, 91.1],
    [22.9, 91.4],
    parcel.delivery.latlng,
  ], [parcel.pickup.latlng, parcel.delivery.latlng]);

  // Simulate agent moving along the route
  const [agentPos, setAgentPos] = useState<[number, number]>(route[0]);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < route.length - 1) {
        setAgentPos(route[step + 1]);
        step += 1;
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [route]);

  // Custom truck icon for agent marker (not used)

  return (
    <div className="p-2 sm:p-4 md:p-8 w-full">
      <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2 text-[#202938]">
        <SearchIcon className="w-6 h-6 text-[#007088]" /> Track Parcel
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="md:col-span-2 w-full h-[320px] sm:h-[400px] md:h-[480px] rounded-lg overflow-hidden shadow">
          <MapContainer
            center={agentPos}
            zoom={8}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {/* Pickup Marker */}
            <Marker position={parcel.pickup.latlng as [number, number]} icon={iconPickup} />
            {/* Delivery Marker */}
            <Marker position={parcel.delivery.latlng as [number, number]} icon={iconDelivery} />
            {/* Agent Marker (moving) */}
            <Marker position={agentPos} icon={iconAgent} />
            {/* Route Polyline */}
            <Polyline positions={route as [number, number][]} color="#0465a5" weight={6} />
          </MapContainer>
        </div>
        {/* Info Card */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#007088]">
            <Package className="w-5 h-5" /> <span className="font-semibold">Parcel ID:</span> <span>{parcel.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#007088]" />
            <span className="font-semibold">Pickup:</span>
            <span className="truncate" title={parcel.pickup.address}>{parcel.pickup.address.split(",").pop()?.trim() || parcel.pickup.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#007088]" />
            <span className="font-semibold">Delivery:</span>
            <span className="truncate" title={parcel.delivery.address}>{parcel.delivery.address.split(",").pop()?.trim() || parcel.delivery.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#007088]" />
            <span className="font-semibold">Size:</span>
            <span>{parcel.size}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#007088]" />
            <span className="font-semibold">Agent:</span>
            <span>{parcel.agent.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Phone:</span>
            <span>{parcel.agent.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Status:</span>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">{parcel.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Lucide icon for search (track)
import type { SVGProps } from "react";
const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default TrackParcelPage;