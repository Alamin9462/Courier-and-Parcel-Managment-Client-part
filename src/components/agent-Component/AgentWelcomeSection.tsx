import { Route } from "lucide-react";
import { Link } from "react-router-dom";

const AgentWelcomeSection = () => {
    return (
     <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-lg shadow mb-6">
      <div className="text-center sm:text-left">
        <h3 className="text-lg text-[#007088]">Welcome back...</h3>
        <h2 className="text-2xl sm:text-3xl font-bold mb-1">Agent Dashboard</h2>
        <p className="text-gray-600 text-lg">Manage your assigned parcels and deliveries</p>
      </div>
      <div>
        <Link to="" className="btn btn-outline w-full border-[#007088] text-[#007088] sm:w-auto border-2 flex items-center gap-2">
          <Route className="w-5 h-5" />
          Get Route
        </Link>
      </div>
    </div>
    );
};

export default AgentWelcomeSection;