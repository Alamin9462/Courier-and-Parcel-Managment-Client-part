const Banner = () => {
  return (
    <section className="w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 py-10 px-2">
      <div className=" mx-auto flex flex-col items-center text-center rounded-2xl backdrop-blur-sm p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black">
          Streamline Your
          <span className="text-primary ml-2">Parcel Delivery</span>
        </h1>
        <p className="py-3 text-base sm:text-lg text-gray-600 mb-6">
          Complete parcel management solution with real-time tracking, <br /> route
          optimization, and comprehensive analytics.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
          <button className="btn btn-primary w-full sm:w-auto">
            Get Started
          </button>
          <button className="btn btn-outline btn-primary w-full sm:w-auto">
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
