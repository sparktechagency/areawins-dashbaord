import { User } from "@/types";
import React from "react";

const users: User[] = [
  {
    id: "#EB-90412",
    name: 'Alex "TheAce" Rivera',
    email: "arivera@example.com",
    role: "VIP Bettor",
    status: "ACTIVE",
    balance: 4520,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: "#EB-88231",
    name: "Sarah Jenkins",
    email: "s.jenkins@webmail.com",
    role: "Standard",
    status: "BLOCKED",
    balance: 12.5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "#EB-92100",
    name: "Marko Polo",
    email: "marko.p@bet.io",
    role: "Moderator",
    status: "ACTIVE",
    balance: 0,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marko",
  },
  {
    id: "#EB-85521",
    name: "Elena Fisher",
    email: "fisher.e@example.net",
    role: "VIP Bettor",
    status: "ACTIVE",
    balance: 840.15,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
  },
];

const UserManagement: React.FC = () => {
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
        <button className="bg-accent hover:brightness-110 text-primary font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 shadow-lg shadow-green-500/20 transition-all active:scale-95">
          <span className="material-symbols-outlined text-[20px]">
            person_add
          </span>
          <span>Create New User</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap gap-4 items-center shadow-sm">
        <div className="flex-1 min-w-[300px]">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">
              search
            </span>
            <input
              className="w-full bg-slate-50 border-none rounded-lg py-2.5 pl-10 text-sm focus:ring-2 focus:ring-primary"
              placeholder="Search by email, ID, or nickname..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-slate-50 border-none rounded-lg px-4 py-2.5 text-sm font-semibold focus:ring-1 focus:ring-primary">
            <option>All Roles</option>
            <option>VIP Bettor</option>
            <option>Moderator</option>
          </select>
          <select className="bg-slate-50 border-none rounded-lg px-4 py-2.5 text-sm font-semibold focus:ring-1 focus:ring-primary">
            <option>Active Status</option>
            <option>Blocked</option>
            <option>Pending</option>
          </select>
        </div>
        <button className="text-sm font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors">
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
                <th className="px-6 py-4 text-right">Wallet Balance</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full border border-slate-100"
                        src={user.avatar}
                        alt={user.name}
                      />
                      <div>
                        <p className="text-sm font-bold leading-tight">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-gray-400">
                    {user.id}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-1.5 ${
                        user.status === "ACTIVE"
                          ? "text-accent"
                          : "text-red-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "ACTIVE" ? "bg-accent" : "bg-red-500"
                        }`}
                      ></span>
                      <span className="text-[10px] font-extrabold uppercase">
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black tabular-nums">
                      $
                      {user.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all">
                        <span className="material-symbols-outlined text-[18px]">
                          visibility
                        </span>
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all">
                        <span className="material-symbols-outlined text-[18px]">
                          edit
                        </span>
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <span className="material-symbols-outlined text-[18px]">
                          block
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
