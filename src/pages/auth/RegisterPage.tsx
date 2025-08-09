/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from 'react-router-dom';
import registerImage from '../../assets/image/Group.svg';
import { useState } from 'react';
import { useRegisterMutation } from '../../redux/feature/auth/authApi';
import { toast } from 'sonner';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await register({ name, email, password }).unwrap();
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 max-w-6xl w-full shadow-xl bg-white">
        {/* 🖼️ Image Section */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#7c87e9e5] to-[#212b4b] p-4">
          <img
            src={registerImage}
            alt="Register Visual"
            className="w-full h-full object-contain"
          />
        </div>
        {/* 📝 Registration Form */}
        <div className="w-full lg:w-1/2">
          <div className="w-3/4 mx-7">
            <h1 className="text-3xl text-center font-bold text-gray-800">
              Sign Up
            </h1>
            <p className="text-gray-500 my-2 text-center text-lg">
              To create an account, please fill in the form below.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
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
                  onChange={e => setEmail(e.target.value)}
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
                  onChange={e => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Retype your password"
                  className="input input-bordered w-full"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <button
                className="btn btn-primary px-6 text-base font-semibold shadow w-full text-white"
                type="submit"
                disabled={isLoading}
              >
               {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            <p className="text-center text-sm my-1 text-gray-500">
              Already have an account?
              <Link to="/login" className="text-blue-600 hover:underline ml-1">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;