import { Package, Users, DollarSign, TrendingUp, UserCheck, XCircle } from "lucide-react";
import { useGetParcelMetricsQuery } from "../../redux/feature/parcel/Parcel";

const AdminCard = () => {
  const { data, isLoading, isError } = useGetParcelMetricsQuery(undefined);

  if (isLoading) return <p>Loading metrics...</p>;
  if (isError) return <p>Failed to load metrics</p>;

  const metrics = data?.data ?? {}; 

  const codAmount = metrics.codAmount ?? 0;
  const failedDeliveries = metrics.failedDeliveries ?? 0;
  const dailyBookings = metrics.dailyBookings ?? 0;

  
  const totalParcels = 13;
  const activeAgents = 5;
  const totalCustomers = 8;

  const stats = [
    { title: "Total Parcels", value: totalParcels, icon: <Package className="text-[#007088] w-6 h-6" /> },
    { title: "Active Agents", value: activeAgents, icon: <Users className="text-[#007088] w-6 h-6" /> },
    { title: "Total Customers", value: totalCustomers, icon: <UserCheck className="text-[#007088] w-6 h-6" /> },
    { title: "COD Amount", value: `$${codAmount}`, icon: <DollarSign className="text-[#007088] w-6 h-6" /> },
    { title: "Daily Bookings", value: dailyBookings, icon: <TrendingUp className="text-[#007088] w-6 h-6" /> },
    { title: "Failed Deliveries", value: failedDeliveries, icon: <XCircle className="text-red-500 w-6 h-6" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-white shadow-md rounded-md p-6 hover:shadow-lg transition duration-300"
        >
          <div className="p-3 bg-[#e0f4f8] rounded-full flex items-center justify-center">
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h4 className="text-lg font-semibold text-gray-800">{stat.value}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCard;
