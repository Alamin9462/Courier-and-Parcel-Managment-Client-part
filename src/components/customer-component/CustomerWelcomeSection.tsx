
import { Plus, User } from "lucide-react";
import { Link } from "react-router-dom";

const CustomerWelcomeSection = () => {
  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-[#e0f4f8] to-[#f5fafd] rounded-lg shadow mb-6">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="hidden sm:flex items-center justify-center bg-[#007088]/10 rounded-full p-3">
          <User className="w-7 h-7 text-[#007088]" />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-base sm:text-lg text-[#007088]">Welcome back!</h3>
          <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-[#202938]">Your Dashboard</h2>
          <p className="text-gray-600 text-lg">Easily manage your parcel deliveries and bookings</p>
        </div>
      </div>
      <div className="w-full sm:w-auto flex justify-center">
        <Link to="/dashboard/book-parcel" className="flex items-center gap-2 btn btn-outline w-full sm:w-auto border-[#007088] text-[#007088] border-2 font-semibold px-6 py-2 rounded-md hover:bg-[#e0f4f8] transition">
          <Plus className="w-5 h-5" /> Book Parcel
        </Link>
      </div>
    </div>
  );
};

export default CustomerWelcomeSection;
