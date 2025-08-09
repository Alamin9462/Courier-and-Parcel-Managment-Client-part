/* eslint-disable @typescript-eslint/no-explicit-any */

import { User, Mail, Phone, MapPin, BadgeCheck, Ban, Edit, Trash2 } from "lucide-react";
import { useGetUsersQuery } from "../../redux/feature/user/userApi";


// const statusColor: Record<string, string> = {
//   Active: "text-green-600 bg-green-100",
//   Inactive: "text-red-600 bg-red-100",
// };

const ManageAgentsPage = () => {
  // RTK Query hook
  const { data, isLoading, isError } = useGetUsersQuery(undefined);

  if (isLoading) return <p className="text-center py-8">Loading agents...</p>;
  if (isError) return <p className="text-center py-8 text-red-600">Failed to load agents.</p>;


  const agents = data?.data?.filter((user: any) => user.role === "delivery_agent") || [];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-[#202938]">
        <User className="w-7 h-7 text-[#007088]" /> Manage Agents
      </h1>

      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F5F7FA]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4 text-[#007088]" />
                  <span>ID</span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-[#007088]" />
                  <span>Name</span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-[#007088]" />
                  <span>Email</span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4 text-[#007088]" />
                  <span>Phone</span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#007088]" />
                  <span>Address</span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <span>Status</span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <span>Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {agents.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No delivery agents found.
                </td>
              </tr>
            ) : (
              agents.map((agent: any) => (
                <tr key={agent._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4 text-[#007088]" />
                      <span>{agent._id}</span> 
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#007088]" />
                      <span>{agent.name || agent.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#007088]" />
                      <span>{agent.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#007088]" />
                      <span>{agent.phone || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#007088]" />
                      <span>{agent.address || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        agent.isActive
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {agent.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        className="p-1 rounded hover:bg-blue-100"
                        title="Edit"
                        // onClick={() => editHandler(agent._id)} // define handler later
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-red-100"
                        title="Delete"
                        // onClick={() => deleteHandler(agent._id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                      {agent.isActive ? (
                        <button
                          className="p-1 rounded hover:bg-red-50"
                          title="Deactivate"
                          // onClick={() => deactivateHandler(agent._id)}
                        >
                          <Ban className="w-4 h-4 text-red-500" />
                        </button>
                      ) : (
                        <button
                          className="p-1 rounded hover:bg-green-50"
                          title="Activate"
                          // onClick={() => activateHandler(agent._id)}
                        >
                          <BadgeCheck className="w-4 h-4 text-green-500" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAgentsPage;
