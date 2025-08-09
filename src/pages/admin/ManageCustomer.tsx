/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, Mail, Phone, BadgeCheck, Ban, Edit, Trash2 } from "lucide-react";
import { useGetUsersQuery } from "../../redux/feature/user/userApi";


const statusColor: Record<string, string> = {
  Active: "text-green-600 bg-green-100",
  Inactive: "text-red-600 bg-red-100",
};

const ManageCustomer = () => {
  const { data, isLoading, isError } = useGetUsersQuery(undefined);

  const customers = data?.data?.filter((user: any) => user.role === "customer") || [];

  if (isLoading) return <p className="text-center">Loading customers...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load customers.</p>;
  if (customers.length === 0) return <p className="text-center">No customers found.</p>;

  return (
    <div className="p-2 sm:p-4 md:p-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-[#202938]">
        <User className="w-6 h-6 sm:w-7 sm:h-7 text-[#007088]" /> Manage Customers
      </h1>
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-[600px] w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-[#F5F7FA]">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4 text-[#007088]" />
                  <span>ID</span>
                </div>
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-[#007088]" />
                  <span>Name</span>
                </div>
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-[#007088]" />
                  <span>Email</span>
                </div>
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4 text-[#007088]" />
                  <span>Phone</span>
                </div>
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <span>Status</span>
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {customers.map((user:any) => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-[#007088]" />
                    <span>{user._id}</span>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#007088]" />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#007088]" />
                    <span>{user.email}</span>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#007088]" />
                    <span>{user.phone}</span>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button className="p-1 rounded hover:bg-blue-100" title="Edit">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-1 rounded hover:bg-red-100" title="Delete">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                    {user.status === "Active" ? (
                      <button className="p-1 rounded hover:bg-red-50" title="Deactivate">
                        <Ban className="w-4 h-4 text-red-500" />
                      </button>
                    ) : (
                      <button className="p-1 rounded hover:bg-green-50" title="Activate">
                        <BadgeCheck className="w-4 h-4 text-green-500" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCustomer;
