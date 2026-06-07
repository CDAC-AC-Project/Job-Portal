import { useState } from "react";
import { Search } from "lucide-react";
import { users as initialUsers } from "../../data/usersData";

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : user
      )
    );
  };

  const handleDelete = (id) => {
    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>

      {/* Header */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          User Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage applicants and recruiters
        </p>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left px-6 py-4">
                Name
              </th>

              <th className="text-left px-6 py-4">
                Email
              </th>

              <th className="text-left px-6 py-4">
                Role
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user.id}
                className="border-t"
              >

                <td className="px-6 py-4">
                  {user.name}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  {user.role}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>

                </td>

                <td className="px-6 py-4 flex gap-2">

                  <button
                    onClick={() =>
                      handleToggleStatus(user.id)
                    }
                    className={`px-3 py-2 rounded-lg text-white ${
                      user.status === "Active"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {user.status === "Active"
                      ? "Block"
                      : "Unblock"}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(user.id)
                    }
                    className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UserManagement;