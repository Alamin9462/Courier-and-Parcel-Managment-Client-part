/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useGetAssignedParcelsQuery } from "../../redux/feature/user/userApi";
import AssignedParcelHeading from "./AssignedParcelHeading";

const Tag = ({ text }: { text: string }) => {
  const base = "text-xs font-medium px-2 py-1 rounded-full border";
  const color =
    text === "High"
      ? "bg-red-100 text-red-700 border-red-200"
      : text === "Medium"
      ? "bg-[#007088]/10 text-[#007088] border-[#007088]/20"
      : "bg-gray-100 text-gray-700 border-gray-200";

  return <span className={`${base} ${color}`}>{text}</span>;
};

const AgentAssignments = () => {
  const { user } = useSelector((state: any) => state.auth);
  const agentId = user?._id;
  // console.log(agentId);

  const { data, error, isLoading } = useGetAssignedParcelsQuery(agentId, {
    skip: !agentId,
  });

  if (isLoading) {
    return <p className="p-4 text-gray-500">Loading assigned parcels...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Error loading parcels.</p>;
  }

  const assignments = data?.data || [];
  console.log("Assignments:", assignments);

  return (
    <div className="p-2 sm:p-4 md:p-8">
       <AssignedParcelHeading />
      {/* Parcel List */}
      <div className="space-y-4">
        {assignments.length === 0 ? (
          <p className="text-gray-500">No parcels assigned.</p>
        ) : (
          assignments.map((parcel: any) => (
            <div
              key={parcel._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 rounded-md p-4 shadow-sm gap-4 sm:gap-0"
            >
              {/* Left side info */}
              <div className="w-full sm:w-1/2">
                <h3 className="font-semibold text-base sm:text-md truncate">
                  #{parcel.trackingCode || parcel._id} -{" "}
                  {parcel.customer?.name || "Unknown"}
                </h3>
              

                <div className="mt-2">
                  <p className="text-xs sm:text-sm font-medium">Pickup:</p>
                  <p className="text-xs sm:text-sm text-gray-600 break-all">
                    📍 {parcel.pickupAddress}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="px-3 py-1 text-xs sm:text-sm bg-[#007088]/10 text-[#007088] rounded-md hover:bg-[#007088]/20 transition">
                    Mark as {parcel.status === "Assigned" ? "Picked Up" : "In Transit"}
                  </button>
                  <p className="px-3 py-1 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                    {parcel.customer?.phone}
                  </p>
                </div>
              </div>

              {/* Right side info */}
              <div className="w-full sm:w-1/2 text-left sm:text-right space-y-2 sm:space-y-3 mt-4 sm:mt-0">
                <div>
                  <p className="text-xs sm:text-sm font-medium">Delivery:</p>
                  <p className="text-xs sm:text-sm text-gray-600 break-all">
                    📍 {parcel.deliveryAddress}
                  </p>
                </div>

                <div className="flex flex-wrap justify-start sm:justify-end gap-2">
                  <Tag text={parcel.priority || "Normal"} />
                  <Tag text={parcel.status} />
                  <Tag text={parcel.paymentType || "Prepaid"} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentAssignments;
