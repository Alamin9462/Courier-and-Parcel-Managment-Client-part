/* eslint-disable @typescript-eslint/no-explicit-any */

import { Package, User, UserCheck, DollarSign, BadgeCheck } from "lucide-react";
import { useGetAllParcelsQuery } from "../../redux/feature/parcel/Parcel";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-yellow-600";      
    case "picked up":
      return "text-purple-600";      
    case "in transit":
      return "text-blue-600";        
    case "delivered":
      return "text-green-600";      
    case "failed":
      return "text-red-600";        
    default:
      return "text-gray-600";        
  }
};

const RecentParcels = () => {
  const { data, isLoading, isError } = useGetAllParcelsQuery(undefined);

  if (isLoading) {
    return <div className="p-6 text-center text-gray-600">Loading parcels...</div>;
  }

  if (isError) {
    return <div className="p-6 text-center text-red-600">Failed to load parcels.</div>;
  }

  const parcels = data?.data || [];

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-[#007088]" /> Recent Parcels
      </h3>
      <div className="divide-y">
        {/* Heading Row */}
        <div className="hidden sm:grid grid-cols-6 items-center pb-2 text-xs font-semibold text-gray-500 uppercase">
          <div className="col-span-1">Tracking Code</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Customer</div>
          <div className="col-span-1">Agent</div>
          <div className="col-span-1">COD Amount</div>
          <div className="col-span-1">Date</div>
        </div>

        {parcels.length === 0 && (
          <div className="text-center text-gray-500 py-4 col-span-6">No parcels found.</div>
        )}

        {parcels.map((parcel: any) => (
          <div
            key={parcel.trackingCode}
            className="grid grid-cols-2 sm:grid-cols-6 items-center py-3 gap-2"
          >
            {/* Tracking Code */}
            <div className="flex items-center gap-2 min-w-0 col-span-2 sm:col-span-1">
              <BadgeCheck className="w-5 h-5 text-[#007088] flex-shrink-0" />
              <span className="font-mono text-sm text-gray-700 truncate">
                {parcel.trackingCode}
              </span>
            </div>

            {/* Status */}
            <div
              className={`font-semibold text-xs sm:text-sm ${getStatusColor(parcel.status)} col-span-1`}
            >
              {parcel.status}
            </div>

            {/* Customer */}
            <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm col-span-1">
              <User className="w-4 h-4" />{" "}
              {parcel.customer && typeof parcel.customer === "object" && parcel.customer !== null
                ? parcel.customer.name
                : parcel.customer || "N/A"}
            </div>

            {/* Agent */}
            <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm col-span-1">
              <UserCheck className="w-4 h-4" />{" "}
              {parcel.agent && typeof parcel.agent === "object" && parcel.agent !== null
                ? parcel.agent.name
                : parcel.agent || "N/A"}
            </div>

            {/* COD */}
            <div className="flex items-center gap-1 text-gray-700 font-semibold col-span-1">
              <DollarSign className="w-4 h-4" /> {parcel.cod}
            </div>

            {/* Date */}
            <div className="text-xs text-gray-500 col-span-1">
              {new Date(parcel.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentParcels;
