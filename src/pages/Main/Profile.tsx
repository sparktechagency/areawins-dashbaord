import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types";
import { setUser } from "../../redux/features/dashboard/dashboardSlice";

const Profile: React.FC = () => {
  const dashboardState = useSelector((state: RootState) => state.dashboard) || {};
  const { user = { name: "Admin", role: "Super Admin" } } = dashboardState;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setUser(tempUser));
    setIsEditing(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            My Profile
          </h1>
          <p className="text-gray-500">
            Manage your administrative details and account security.
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-2.5 rounded-lg text-sm font-black transition-all ${
            isEditing
              ? "bg-red-50 text-red-500"
              : "bg-primary text-accent shadow-lg shadow-primary/20"
          }`}
        >
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
            <div className="relative group">
              <img
                className="size-32 rounded-full border-4 border-slate-50 shadow-inner mb-6 group-hover:brightness-75 transition-all cursor-pointer"
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                alt="Avatar"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="material-symbols-outlined text-white text-3xl">
                  photo_camera
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-black text-primary">{user?.name}</h2>
            <p className="text-accent font-black uppercase text-[10px] tracking-widest mt-1 bg-secondary/10 px-3 py-1 rounded-full">
              {user?.role}
            </p>

            <div className="w-full mt-8 pt-8 border-t border-gray-50 space-y-4">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400">Account Status</span>
                <span className="text-green-500">Verified</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400">Member Since</span>
                <span className="text-primary">Oct 2023</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <form
            onSubmit={handleUpdate}
            className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm h-full"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                person
              </span>
              Personal Information
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Full Name
                  </label>
                  <input
                    disabled={!isEditing}
                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold disabled:opacity-60"
                    value={tempUser?.name || ""}
                    onChange={(e) =>
                      setTempUser({ ...tempUser!, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Email Address
                  </label>
                  <input
                    disabled={!isEditing}
                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold disabled:opacity-60"
                    value="alex.morgan@easybet.com"
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                  Administrative Role
                </label>
                <select
                  disabled={!isEditing}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold disabled:opacity-60"
                  value={tempUser?.role || ""}
                  onChange={(e) =>
                    setTempUser({ ...tempUser!, role: e.target.value })
                  }
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>

              {isEditing && (
                <div className="pt-8 flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-accent px-8 py-3 rounded-xl font-black shadow-xl shadow-primary/20 hover:brightness-110 transition-all"
                  >
                    Update Profile Data
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
