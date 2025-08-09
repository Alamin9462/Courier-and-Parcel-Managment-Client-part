/* eslint-disable @typescript-eslint/no-explicit-any */
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { useGetMyParcelsQuery } from "../../redux/feature/parcel/Parcel";


const CustomerCardSection = () => {
  const { data, isLoading, error } = useGetMyParcelsQuery(undefined);
  const parcels = data?.data || [];

  const total = parcels.length;
  const inTransit = parcels.filter((p: { status: any; }) => p.status === 'In Transit').length;
  const delivered = parcels.filter((p: { status: any; }) => p.status === 'Delivered').length;
  const cancelled = parcels.filter((p: { status: any; }) => p.status === 'Failed').length;

  const stats = [
    {
      title: "Total Parcels",
      value: total,
      icon: <Package className="w-7 h-7 text-[#007088]" />,
      color: "bg-blue-50",
    },
    {
      title: "In Transit",
      value: inTransit,
      icon: <Truck className="w-7 h-7 text-[#007088]" />,
      color: "bg-yellow-50",
    },
    {
      title: "Delivered",
      value: delivered,
      icon: <CheckCircle className="w-7 h-7 text-[#007088]" />,
      color: "bg-green-50",
    },
    {
      title: "Cancelled",
      value: cancelled,
      icon: <XCircle className="w-7 h-7 text-[#007088]" />,
      color: "bg-red-50",
    },
  ];

  if (isLoading) return <p>Loading summary...</p>;
  if (error) return <p className="text-red-500">Failed to load summary</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`flex items-center gap-4 p-4 rounded-lg shadow-sm ${stat.color} min-w-0`}
        >
          <div className="flex-shrink-0">{stat.icon}</div>
          <div className="min-w-0">
            <div className="text-xs text-gray-500 font-medium truncate">
              {stat.title}
            </div>
            <div className="text-lg sm:text-xl font-bold text-[#202938] truncate">
              {stat.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerCardSection;
