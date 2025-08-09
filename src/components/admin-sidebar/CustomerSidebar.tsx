import {
  Box,
  ChevronDown,
  ChevronUp,
  Gauge,
  LocateIcon,
  Route,
  UserCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/feature/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-4 py-2 rounded-md transition ${
    isActive ? "bg-[#007088] text-white" : "hover:bg-gray-100 text-gray-700"
  }`;

const CustomerSidebar = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logout successful!');
    navigate('/login');
  };
  return (
    <div className="h-full w-full shadow-md flex flex-col justify-between bg-base-200">
      <div className="p-5">
        <div className="flex items-center min-w-[140px]">
          <a className="flex items-center gap-3" href="/">
            <span className="w-10 h-10 flex items-center justify-center rounded-full border border-base-200 bg-white shadow">
              <Box size={32} className="text-[#006f87]" />
            </span>
            <span className="font-bold text-2xl tracking-tight">
              TrackSwift
            </span>
          </a>
        </div>

        <nav className="space-y-2 my-8 font-light">
          <NavLink to="/customer" onClick={onLinkClick} end className={linkClass}>
            <Gauge className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink to="/customer/book-parcel" onClick={onLinkClick} className={linkClass}>
            <Box className="w-5 h-5" />
            Book Parcel
          </NavLink>

          <NavLink to="/customer/my-parcels" onClick={onLinkClick} className={linkClass}>
            <LocateIcon className="w-5 h-5" />
            My Parcels
          </NavLink>

          <NavLink to="/customer/track-parcel" onClick={onLinkClick} className={linkClass}>
            <Route className="w-5 h-5" />
            Live Tracking
          </NavLink>
          <NavLink to="/customer/profile" onClick={onLinkClick} className={linkClass}>
            <Users className="w-5 h-5" />
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Bottom User Profile Section */}
      <div className="-mt-2 p-4">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="w-full flex justify-between items-center text-left px-2 py-2 rounded-md hover:bg-gray-100 transition"
        >
          <div className="flex items-center gap-2 text-[#007088]">
            <UserCircle className="w-7 h-7" />
            <div className="text-sm">
              <p className="font-semibold leading-none">Alamin</p>
              <p className="text-xs text-gray-600">alamin@example.com</p>
            </div>
          </div>
          {showDropdown ? (
            <ChevronUp className="text-gray-500 w-5 h-5" />
          ) : (
            <ChevronDown className="text-gray-500 w-5 h-5" />
          )}
        </button>

        {showDropdown && (
          <div className="mt-2 bg-white shadow rounded-md overflow-hidden text-sm">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSidebar;
