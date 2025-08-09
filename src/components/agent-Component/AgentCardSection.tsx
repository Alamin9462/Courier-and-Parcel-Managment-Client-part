
import { Package, Truck, UserCheck, XCircle } from "lucide-react";

const stats = [
  {
    title: "Assigned",
    value: "1,250",
    icon: <Package className="text-[#007088] w-6 h-6" />,
  },
  {
    title: "Picked Up",
    value: "48",
    icon: <Truck className="text-[#007088] w-6 h-6" />,
  },
  {
    title: "Delivered",
    value: "2,340",
    icon: <UserCheck className="text-[#007088] w-6 h-6" />,
  },
  {
    title: "Failed",
    value: "12",
    icon: <XCircle className="text-[#007088] w-6 h-6" />,
  },
];

const AgentCardSection = () => {
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

export default AgentCardSection;