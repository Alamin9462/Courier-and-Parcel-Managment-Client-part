/* eslint-disable @typescript-eslint/no-explicit-any */

import { Package, Truck, CheckCircle, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetMyParcelsQuery } from "../../redux/feature/parcel/Parcel";

const statusColor: Record<string, string> = {
  "In Transit": "bg-yellow-100 text-yellow-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const MyParcelsPage = () => {
  const { data, isLoading, error } = useGetMyParcelsQuery(undefined);

  const parcels = data?.data || [];

  if (isLoading) return <div>Loading parcels...</div>;
  if (error) return <div>Error loading parcels</div>;

  return (
    <div className="p-2 sm:p-4 md:p-8 w-full">
      <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-[#202938]">
        <Package className="w-6 h-6 text-[#007088]" /> My Parcels
      </h1>
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-[600px] w-full divide-y divide-gray-200 text-xs sm:text-sm md:text-base">
          <thead className="bg-[#F5F7FA]">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Parcel ID
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Pickup
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Delivery
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Size/Type
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {parcels && parcels.length > 0 ? (
              parcels.map((parcel: any) => (
                <tr key={parcel._id} className="hover:bg-gray-50 transition">
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#007088] min-w-[16px]" />
                      <span className="truncate max-w-[80px] inline-block align-middle">
                        {parcel.trackingCode || parcel._id}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2 max-w-[110px] sm:max-w-[180px]">
                      <MapPin className="w-4 h-4 text-[#007088] min-w-[16px]" />
                      <span className="truncate align-middle">
                        {parcel.pickupAddress}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2 max-w-[110px] sm:max-w-[180px]">
                      <MapPin className="w-4 h-4 text-[#007088] min-w-[16px]" />
                      <span className="truncate align-middle">
                        {parcel.deliveryAddress}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#007088] min-w-[16px]" />
                      <span className="align-middle">
                        {parcel.type || parcel.size}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#007088] min-w-[16px]" />
                      <span className="align-middle">
                        {parcel.isCOD ? "COD" : "Prepaid"}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                        statusColor[parcel.status]
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                    <Link
                      to={`/dashboard/track/${parcel._id}`}
                      className="flex items-center gap-1 px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-[#007088]/10 text-[#007088] rounded-md hover:bg-[#007088]/20 transition"
                    >
                      <Search className="w-4 h-4" />{" "}
                      <span className="hidden sm:inline">Track</span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcelsPage;
