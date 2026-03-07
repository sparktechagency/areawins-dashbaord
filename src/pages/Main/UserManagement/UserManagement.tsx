import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import React, { useState } from "react";
import UserFilters from "./UserFilters";
import UserTable from "./UserTable";

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
      {/* Header */}
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

      <UserFilters
        search={search}
        roleFilter={roleFilter}
        onSearchChange={setSearch}
        onRoleChange={setRoleFilter}
        onClear={() => {
          setSearch("");
          setRoleFilter("");
          setStatusFilter("");
        }}
      />

      <UserTable users={users} isLoading={isLoading} />
    </div>
  );
};

export default UserManagement;
