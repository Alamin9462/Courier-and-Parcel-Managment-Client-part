import { Box, Truck, Package, MapPin, Users, BarChart } from "lucide-react";

const cardData = [
  {
    icon: Box,
    title: "Parcel Management",
    description: "Easily manage all your parcels in one place.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery service for your parcels.",
  },
  {
    icon: Package,
    title: "Package Tracking",
    description: "Track your packages in real-time with live updates.",
  },
  {
    icon: MapPin,
    title: "Live Location",
    description: "See the exact location of your parcel anytime.",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Manage customers, agents, and admins easily.",
  },
  {
    icon: BarChart,
    title: "Analytics & Reports",
    description: "Get insights and analytics for your deliveries.",
  },
];

const IconBox = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Everything You Need</h1>
        <p>
          Powerful features for customers, delivery agents, and administrators
        </p>
      </div>
      <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {cardData.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="card bg-base-100 w-80 p-5 shadow-sm flex flex-col items-center"
            >
              <div className="flex justify-center items-center mb-2">
                <Icon size={48} className="text-primary" />
              </div>
              <div className="card-body items-center text-center p-0">
                <h2 className="card-title text-xl font-bold mb-1">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconBox;
