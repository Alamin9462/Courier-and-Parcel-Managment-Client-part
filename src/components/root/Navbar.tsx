import { Box } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-base-100 shadow-sm mt-4">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 rounded-lg flex items-center justify-between min-h-[64px]">
        {/* Left Section: Logo */}
        <div className="flex items-center min-w-[140px]">
          <a className="flex items-center gap-3" href="/">
            <span className="w-10 h-10 flex items-center justify-center rounded-full border border-base-200 bg-white shadow">
              <Box size={32} className="text-primary" />
            </span>
            <span className="font-bold text-2xl tracking-tight">TrackSwift</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <details className="dropdown dropdown-end">
            <summary className="btn btn-ghost px-2 min-h-0 h-10 flex items-center">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
            </summary>
            <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40 mt-2 z-[1]">
              <li>
                <Link to="/login" className="btn btn-ghost w-full text-base font-medium justify-start">Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary w-full text-base font-semibold justify-start">Register</Link>
              </li>
            </ul>
          </details>
        </div>

        {/* Right Section: Buttons (Desktop) */}
        <div className="flex-none hidden md:flex gap-3">
          <a href="/login" className="btn btn-ghost px-6 text-base font-medium">
            Login
          </a>
          <a href="/register" className="btn btn-primary px-6 text-base font-semibold shadow">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
