import { FileBarChart2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const WelcomeSection = () => {
  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-lg shadow mb-6">
      <div className="text-center sm:text-left">
        <h3 className="text-lg text-[#007088]">Welcome back...</h3>
        <h2 className="text-2xl sm:text-3xl font-bold mb-1">Dashboard</h2>
        <p className="text-gray-600 text-lg">Manage your parcel deliveries</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Link to="/admin/reports" className="btn btn-outline w-full border-[#007088] text-[#007088] sm:w-auto border-2 flex items-center gap-2">
          <FileBarChart2 className="w-5 h-5" />
          Export Report
        </Link>
        <Link to="/admin/assign-parcel" className="btn w-full sm:w-auto flex items-center bg-[#007088] gap-2 text-white">
          <UserPlus className="w-5 h-5" />
          Assign Parcel to Agent
        </Link>
      </div>
    </div>
  );
};

export default WelcomeSection;
