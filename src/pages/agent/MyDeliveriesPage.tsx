/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useGetAssignedParcelsQuery } from "../../redux/feature/user/userApi";
import socket from "../../socket";
import { useEffect, useState } from "react";

const Tag = ({
  text,
  type,
}: {
  text: string;
  type?: "priority" | "status";
}) => {
  const base = "text-xs font-medium px-2 py-1 rounded-full border";

  let color = "bg-gray-100 text-gray-700 border-gray-200";

  if (type === "priority") {
    color =
      text === "High"
        ? "bg-red-100 text-red-700 border-red-200"
        : text === "Medium"
        ? "bg-[#007088]/10 text-[#007088] border-[#007088]/20"
        : "bg-gray-100 text-gray-700 border-gray-200";
  }

  if (type === "status") {
    switch (text) {
      case "Pending":
        color = "bg-purple-100 text-purple-800 border-purple-200";
        break;
      case "Assigned":
        color = "bg-yellow-100 text-yellow-800 border-yellow-200";
        break;
      case "Picked Up":
        color = "bg-blue-100 text-blue-800 border-blue-200";
        break;
      case "In Transit":
        color = "bg-indigo-100 text-indigo-800 border-indigo-200";
        break;
      case "Delivered":
        color = "bg-green-100 text-green-800 border-green-200";
        break;
      case "Failed":
        color = "bg-red-100 text-red-800 border-red-200";
        break;
      default:
        color = "bg-gray-100 text-gray-700 border-gray-200";
    }
  }
  return <span className={`${base} ${color}`}>{text}</span>;
};

const nextStatusMap: Record<string, string> = {
  Pending: "Picked Up",
  "Picked Up": "In Transit",
  "In Transit": "Delivered",
  Delivered: "Delivered",
  Failed: "Failed",
  
};

const MyDeliveriesPage = () => {
  const { user } = useSelector((state: any) => state.auth);
  const agentId = user?._id;

  // Local state to manage assignments for real-time update
  const [assignments, setAssignments] = useState<any[]>([]);

  // Fetch parcels initially via RTK Query
  const { data, error, isLoading } = useGetAssignedParcelsQuery(agentId, {
    skip: !agentId,
  });

  // When data arrives from API, set local state
  useEffect(() => {
    if (data?.data) {
      setAssignments(data.data);
    }
  }, [data]);

  // Listen to WebSocket parcel status updates
  useEffect(() => {
    socket.on("parcelStatusUpdated", ({ parcelId, status }) => {
      console.log(`Parcel ${parcelId} status updated to ${status}`);

      setAssignments((prev) =>
        prev.map((parcel) =>
          parcel._id === parcelId ? { ...parcel, status } : parcel
        )
      );
    });

    return () => {
      socket.off("parcelStatusUpdated");
    };
  }, []);

  const handleStatusUpdate = (parcelId: string, currentStatus: string) => {
    console.log("handleStatusUpdate called", parcelId, currentStatus);
    const newStatus = nextStatusMap[currentStatus] || currentStatus;

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        socket.emit("updateParcelStatus", {
          parcelId,
          status: newStatus,
          currentLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        socket.emit("updateParcelStatus", {
          parcelId,
          status: newStatus,
        });
      }
    );
  };

  if (isLoading) {
    return <p className="p-4 text-gray-500">Loading assigned parcels...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Error loading parcels.</p>;
  }

  return (
    <div className="p-2 sm:p-4 md:p-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
        Today's Assignments
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
        Parcels assigned to you for delivery
      </p>

      <div className="space-y-4">
        {assignments.length === 0 ? (
          <p className="text-gray-500">No parcels assigned.</p>
        ) : (
          assignments.map((parcel: any) => (
            <div
              key={parcel._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 rounded-md p-4 shadow-sm gap-4 sm:gap-0"
            >
              <div className="w-full sm:w-1/2">
                <h3 className="font-semibold text-base sm:text-md truncate">
                  #{parcel.trackingCode || parcel._id} -{" "}
                  {parcel.customer?.name || "Unknown"}
                </h3>

                <div className="mt-2">
                  <p className="text-xs sm:text-sm font-medium">Pickup:</p>
                  <p className="text-xs sm:text-sm text-gray-600 break-all">
                    📍 {parcel.pickupAddress}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      handleStatusUpdate(parcel._id, parcel.status)
                    }
                    disabled={
                      parcel.status === "Delivered" ||
                      parcel.status === "Failed"
                    }
                    className="px-3 py-1 text-xs sm:text-sm bg-[#007088]/10 text-[#007088] rounded-md hover:bg-[#007088]/20 transition"
                  >
                    Mark as {nextStatusMap[parcel.status] || parcel.status}
                  </button>

                  <p className="px-3 py-1 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                    {parcel.customer?.phone}
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-1/2 text-left sm:text-right space-y-2 sm:space-y-3 mt-4 sm:mt-0">
                <div>
                  <p className="text-xs sm:text-sm font-medium">Delivery:</p>
                  <p className="text-xs sm:text-sm text-gray-600 break-all">
                    📍 {parcel.deliveryAddress}
                  </p>
                </div>

                <div className="flex flex-wrap justify-start sm:justify-end gap-2">
                  <Tag text={parcel.priority || "Normal"} type="priority" />
                  <Tag text={parcel.status} type="status" />
                  <Tag text={parcel.paymentType || "Prepaid"} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyDeliveriesPage;
