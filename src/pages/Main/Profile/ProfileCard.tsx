import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { Camera } from "lucide-react";
import React from "react";

interface ProfileCardProps {
  profileData: any;
  isEditing: boolean;
  isDeleting: boolean;
  preview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileData,
  isEditing,
  isDeleting,
  preview,
  fileInputRef,
  onImageChange,
  onDelete,
}) => {
  return (
    <div className="md:col-span-1 space-y-6">
      {/* Avatar + Info */}
      <div className="bg-white border border-gray-200 rounded p-8 flex flex-col items-center text-center">
        <div
          className={`relative group ${isEditing ? "cursor-pointer" : ""}`}
          onClick={() => isEditing && fileInputRef.current?.click()}
        >
          <img
            className={`size-32 rounded-full border-4 border-slate-50  mb-6 transition-all object-cover ${
              isEditing ? "group-hover:brightness-75" : ""
            }`}
            src={
              preview ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData?.fullName || "Admin"}`
            }
            alt="Avatar"
          />
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/40 p-2 rounded-full text-white">
                <Camera size={24} />
              </div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <h2 className="text-2xl  text-primary">
          {profileData?.fullName || "Loading..."}
        </h2>
        <p className="text-primary  text-[10px] tracking-widest bg-white border border-primary px-3 py-1 rounded-full mt-2">
          {profileData?.role}
        </p>

        <div className="w-full mt-8 pt-4 border-t border-gray-50 space-y-4">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-gray-400">Customer ID</span>
            <span className="text-primary">{profileData?.customerId}</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-gray-400">Account Status</span>
            <span className="text-green-500">Verified</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-gray-400">Member Since</span>
            <span className="text-primary">
              {profileData?.createdAt
                ? dayjs(profileData?.createdAt).format("DD MMM YYYY")
                : "..."}
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-100 rounded p-6 mt-6">
        <h4 className="text-red-600  text-xs tracking-widest mb-4">
          Danger Zone
        </h4>
        <p className="text-red-900/60 text-[10px] font-bold mb-4">
          Deleting your account is permanent and cannot be undone.
        </p>
        <Button
          onClick={onDelete}
          disabled={isDeleting}
          className="w-full bg-white text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-all text-xs  shadow-none h-10 cursor-pointer disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete My Account"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
