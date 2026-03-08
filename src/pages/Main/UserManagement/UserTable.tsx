import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface UserTableProps {
  users: any[];
  isLoading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, isLoading }) => {
  return (
    <div className="bg-white rounded border border-gray-200 overflow-hidden ">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-[11px] font-extrabold text-gray-400 tracking-widest border-b border-gray-100">
              <th className="px-6 py-4">User Profile</th>
              <th className="px-6 py-4">User ID</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={5} className="px-6 py-4">
                    <Skeleton className="h-10 w-full" />
                  </td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-12 text-slate-400 font-medium"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user: any) => (
                <tr
                  key={user._id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.profileImage ? (
                        <img
                          className="w-10 h-10 rounded-full border border-slate-100 object-cover"
                          src={user.profileImage}
                          alt={user.fullName}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full border border-slate-100 bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
                          {user.fullName?.charAt(0) || "U"}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold leading-tight">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-gray-400">
                    {user._id?.slice(-8)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-1.5 ${
                        user.isDeleted ? "text-red-500" : "text-accent"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.isDeleted ? "bg-red-500" : "bg-secondary"
                        }`}
                      />
                      <span className="text-[10px] font-extrabold">
                        {user.isDeleted ? "DELETED" : "ACTIVE"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded transition-all">
                        <span className="material-symbols-outlined text-[18px]">
                          visibility
                        </span>
                      </button>
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

export default UserTable;
