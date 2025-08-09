/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/image/login.jpg";
import { useState } from "react";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/feature/auth/authApi";

import { UserCircle, Shield, Truck } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/feature/auth/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Demo credentials
  const demoCredentials = [
    {
      label: "Admin",
      icon: <Shield className="w-5 h-5 text-blue-700" />,
      email: "admin@example.com",
      password: "Admin@123",
    },
    {
      label: "Agent",
      icon: <Truck className="w-5 h-5 text-green-700" />,
      email: "agent1@example.com",
      password: "Agent@123",
    },
    {
      label: "Customer",
      icon: <UserCircle className="w-5 h-5 text-purple-700" />,
      email: "mitu@example.com",
      password: "mitu@123",
    },
  ];

  const handleFillCredential = (cred: { email: string; password: string }) => {
    setEmail(cred.email);
    setPassword(cred.password);
  };
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      console.log(result);

      dispatch(setUser({ user: result.data, token: result.token }));
      toast.success("Login successful!");
      // Role-based navigation

      const roleRaw = result.data?.role;
      const role = typeof roleRaw === "string" ? roleRaw.toLowerCase() : "";
      console.log("User role:", role);
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "delivery_agent") {
        navigate("/agent");
      } else if (role === "customer") {
        navigate("/customer");
      } else {
        toast.error("User role not found!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center">
      {/* Demo credentials bar */}
      <div className="flex gap-4 items-center justify-center px-2 py-2 bg-gray-100 border-b border-gray-200 mb-2">
        {demoCredentials.map((cred) => (
          <button
            key={cred.label}
            className="flex items-center gap-2 px-3 py-1 rounded bg-white shadow hover:bg-blue-50 border border-gray-200 text-sm"
            onClick={() =>
              handleFillCredential({
                email: cred.email,
                password: cred.password,
              })
            }
            type="button"
          >
            {cred.icon}
            <span className="font-semibold">{cred.label}</span>
            <span className="ml-2 text-xs text-gray-500">{cred.email}</span>
            <span className="ml-1 text-xs text-gray-400">{cred.password}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 max-w-6xl w-full shadow-xl bg-white">
        <div className="w-full lg:w-1/2 ">
          <img
            src={loginImage}
            alt="Login Visual"
            className="w-full h-full object-contain"
          />
        </div>
        {/*  Login Form */}
        <div className="w-full lg:w-1/2">
          <div className="w-3/4 mx-7">
            <h1 className="text-3xl lg:text-3xl text-center font-bold text-gray-800">
              Login
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="input input-bordered w-full"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox  mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="btn btn-primary px-6 text-base font-semibold shadow w-full text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="text-center text-sm my-1 text-gray-500">
              Don’t have an account?
              <Link
                to="/register"
                className="text-blue-600 hover:underline ml-1"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
