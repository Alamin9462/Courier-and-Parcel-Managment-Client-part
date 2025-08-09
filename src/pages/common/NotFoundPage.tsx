import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <AlertTriangle className="text-[#027089] w-20 h-20 mb-6" />
      <h1 className="text-9xl font-extrabold text-[#027089]">404</h1>
      <p className="text-2xl sm:text-3xl font-semibold mt-4 mb-6 text-gray-700">
        Oops! Page not found.
      </p>
      <p className="max-w-md text-gray-500 mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <a
        href="/"
        className="inline-block px-6 py-3 bg-[#027089] text-white rounded-md hover:bg-[#02575a] transition"
      >
        Go back home
      </a>
    </div>
  );
};

export default NotFoundPage;
