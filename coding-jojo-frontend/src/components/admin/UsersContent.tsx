// components/dashboard/UsersContent.tsx
import React, { useState } from "react";
import Image from "next/image";
import { Search, Edit, Trash } from "lucide-react";
import { User } from "../../types/admin";
import DeleteConfirmationDialog from "../ui/DeleteConfirmationDialog";

interface UsersContentProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}

const UsersContent: React.FC<UsersContentProps> = ({
  users,
  onEditUser,
  onDeleteUser,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      (searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (roleFilter === "all" ||
        user.role.toLowerCase() === roleFilter.toLowerCase())
  );

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      onDeleteUser(userToDelete);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <>
      <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 mb-6">
        <div className="p-5 border-b border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
            Users
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64  bg-gray-900/70 border border-gray-700 pl-10 pr-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <select
              className="bg-gray-800 border border-gray-700 px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  User
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Role
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Courses
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Join Date
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Last Active
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 relative mr-3">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-300">{user.role}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-300">
                      {user.coursesEnrolled}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-300">{user.joinDate}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-300">
                      {user.lastActive}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEditUser(user)}
                        className="p-1.5 text-gray-400 hover:text-white transition-colors hover:bg-gray-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors hover:bg-gray-800"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium text-white">1</span> to{" "}
            <span className="font-medium text-white">
              {filteredUsers.length}
            </span>{" "}
            of <span className="font-medium text-white">{users.length}</span>{" "}
            users
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-2  bg-gray-900 text-gray-400 hover:bg-gray-700 transition-colors">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="px-3 py-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white">
              1
            </button>
            <button className="px-3 py-1  bg-gray-900 text-gray-400 hover:bg-gray-700 transition-colors">
              2
            </button>
            <button className="px-3 py-1  bg-gray-900 text-gray-400 hover:bg-gray-700 transition-colors">
              3
            </button>
            <button className="p-2  bg-gray-900 text-gray-400 hover:bg-gray-700 transition-colors">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:shadow-lg transition duration-300">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              User Growth
            </h3>
          </div>
          <div className="p-5 h-64 relative">
            {/* This would be where your chart goes */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Chart placeholder - User growth chart would render here
            </div>
          </div>
        </div>

        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:shadow-lg transition duration-300">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              User Demographics
            </h3>
          </div>
          <div className="p-5 h-64 relative">
            {/* This would be where your chart goes */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Chart placeholder - User demographics would render here
            </div>
          </div>
        </div>

        <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:shadow-lg transition duration-300">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              User Statistics
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Users</span>
              <span className="text-white font-medium">{users.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Students</span>
              <span className="text-white font-medium">
                {users.filter((u) => u.role === "Student").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Instructors</span>
              <span className="text-white font-medium">
                {users.filter((u) => u.role === "Instructor").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Admin</span>
              <span className="text-white font-medium">
                {users.filter((u) => u.role === "Admin").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">User Retention</span>
              <span className="text-white font-medium">85.4%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Courses Per Student</span>
              <span className="text-white font-medium">2.3</span>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        itemName="user"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default UsersContent;
