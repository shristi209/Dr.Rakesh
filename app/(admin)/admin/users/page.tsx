import AdminButton from "@/components/dashboard/button";
import Breadcrumb from "@/components/website/Breadcrumb";
import axios from "axios";
import {
  LucideUsers,
  LucideBarChart,
  LucideDollarSign,
  LucideActivity,
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
    // console.log(users);

    if (!users) {
      return <div>No users found</div>;
    }

    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        
        <AdminButton Name="Add" link="/admin/users/add" />
        
        {/* <h1>Admin Users</h1> */}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex gap-2">
                  <AdminButton Name="Edit" link={`/admin/users/edit/${user.id}`}/>
                  <AdminButton Name="Delete" link={`/admin/users/delete/${user.id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return <div>Error fetching users</div>;
  }
};

export default UsersPage;
