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

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const AllParcel = () => {
  const { data, isLoading, isError } = useGetAllParcelsQuery(undefined);

  if (isLoading)
    return <p className="text-center text-gray-500">Loading parcels...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load parcels.</p>;

  const parcels = data?.data || [];

  if (parcels.length === 0) {
    return <p className="text-center text-gray-500">No parcels found.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-[#202938]">
        <Package className="w-7 h-7 text-[#007088]" /> All Parcels
      </h3>
      <div className="divide-y">
        {/* Heading Row */}
        <div className="hidden sm:grid grid-cols-6 items-center pb-2 text-xs font-semibold text-gray-500 uppercase">
          <div className="col-span-1">Tracking Code</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Customer</div>
          <div className="col-span-1">Pickup</div>
          <div className="col-span-1">COD Amount</div>
          <div className="col-span-1">Date</div>
        </div>

        {parcels.map((parcel: any, idx: number) => (
          <div
            key={parcel._id || idx}
            className="grid grid-cols-2 sm:grid-cols-6 items-center py-3 gap-2"
          >
            {/* Tracking Code */}
            <div className="flex items-center gap-2 min-w-0 col-span-2 sm:col-span-1">
              <BadgeCheck className="w-5 h-5 text-[#007088] flex-shrink-0" />
              <span className="font-mono text-sm text-gray-700 truncate">
                {parcel._id || parcel.trackingCode}
              </span>
            </div>

            {/* Status */}
            <div
              className={`font-semibold text-xs sm:text-sm ${getStatusColor(
                parcel.status
              )} col-span-1`}
            >
              {capitalize(parcel.status)}
            </div>

            {/* Customer */}
            <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm col-span-1">
              <User className="w-4 h-4" /> {parcel.customer?.name || "N/A"}
            </div>

            {/* Pickup Address */}
            <div className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm col-span-1">
              <UserCheck className="w-4 h-4" /> {parcel.pickupAddress || "N/A"}
            </div>

            {/* COD */}
            <div className="flex items-center gap-1 text-gray-700 font-semibold col-span-1">
              <DollarSign className="w-4 h-4" />
              {parcel.isCOD ? `$${parcel.amount}` : "No COD"}
            </div>

            {/* Date */}
            <div className="text-xs text-gray-500 col-span-1">
              {parcel.createdAt
                ? new Date(parcel.createdAt).toLocaleDateString()
                : "N/A"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllParcel;
