const AssignedParcelHeading = () => {
  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="bg-[#007088]/10 text-[#007088] font-semibold px-4 py-2 rounded-md">
          Assigned Parcels
        </button>
        <button className="bg-gray-100 text-gray-500 font-semibold px-4 py-2 rounded-md">
          Delivery Route
        </button>
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
        Today's Assignments
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
        Parcels assigned to you for delivery
      </p>
    </div>
  );
};

export default AssignedParcelHeading;
