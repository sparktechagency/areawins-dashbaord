import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import React, { useState } from "react";

const UserManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data: usersRes, isLoading } = useGetAllUsersQuery({
    searchTerms: search || undefined,
    role: roleFilter || undefined,
    status: statusFilter || undefined,
  });
  const users = usersRes?.data?.results || [];

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">
            User Management
          </h2>
          <p className="text-gray-500 font-medium">
            Manage accounts, monitor balances, and update platform roles.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap gap-4 items-center shadow-sm">
        <div className="flex-1 min-w-75">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">
              search
            </span>
            <input
              className="w-full bg-slate-50 border-none rounded-lg py-2.5 pl-10 text-sm focus:ring-2 focus:ring-primary"
              placeholder="Search by email, ID, or nickname..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="bg-slate-50 border-none rounded-lg px-4 py-2.5 text-sm font-semibold focus:ring-1 focus:ring-primary"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          className="text-sm font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
          onClick={() => {
            setSearch("");
            setRoleFilter("");
            setStatusFilter("");
          }}
        >
          <span className="material-symbols-outlined text-[18px]">
            filter_alt_off
          </span>
          <span>Clear Filters</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100">
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
                      <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">
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
                        <span className="text-[10px] font-extrabold uppercase">
                          {user.isDeleted ? "DELETED" : "ACTIVE"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all">
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
    </div>
  );
};

export default UserManagement;
