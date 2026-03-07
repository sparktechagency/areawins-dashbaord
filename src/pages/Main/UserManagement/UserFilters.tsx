import React from "react";

interface UserFiltersProps {
  search: string;
  roleFilter: string;
  onSearchChange: (val: string) => void;
  onRoleChange: (val: string) => void;
  onClear: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  search,
  roleFilter,
  onSearchChange,
  onRoleChange,
  onClear,
}) => {
  return (
    <div className="bg-white p-4 rounded border border-gray-200 flex flex-wrap gap-4 items-center shadow-sm">
      <div className="flex-1 min-w-[280px]">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary">
            search
          </span>
          <input
            className="w-full bg-slate-50 border-none rounded py-2.5 pl-10 text-sm focus:ring-2 focus:ring-primary"
            placeholder="Search by email, ID, or nickname..."
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select
          className="bg-slate-50 border-none rounded px-4 py-2.5 text-sm font-semibold focus:ring-1 focus:ring-primary"
          value={roleFilter}
          onChange={(e) => onRoleChange(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button
        className="text-sm font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
        onClick={onClear}
      >
        <span className="material-symbols-outlined text-[18px]">
          filter_alt_off
        </span>
        <span>Clear Filters</span>
      </button>
    </div>
  );
};

export default UserFilters;
