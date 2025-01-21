import AdminButton from "@/components/dashboard/button";
import DeleteButton from "@/components/ui/deleteButton";
import Breadcrumb from "@/components/website/Breadcrumb";
import axios from "axios";
import {
  LucideUsers,
  LucideBarChart,
  LucideDollarSign,
  LucideActivity,
  LucidePlus,
  LucidePencil,
  LucideTrash2
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const breadcrumbItems = [
  {
    label: "Users",
    href: "/admin/users",
  },
];

const UsersPage = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/admin/users");
    const users = res.data;

    if (!users) {
      return <div>No users found</div>;
    }

    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex justify-end mb-4 mr-4">
          <AdminButton 
            link="/admin/users/add"
            Name="Add"
            className="mt-3 bg-gray-900 hover:bg-gray-700"
          />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user: User) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <AdminButton 
                            link={`/admin/users/edit/${user.id}`}
                            icon={<LucidePencil className="w-4 h-4 text-white" />}
                            title="Edit User"
                          />
                          <DeleteButton 
                            userId={user.id}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return <div>Error fetching users</div>;
  }
};

export default UsersPage;
