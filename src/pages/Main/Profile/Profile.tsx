import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { Button } from "@/components/ui/button";
import {
  useDeleteMyProfileMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/features/profile/profileApi";
import {
  ProfileFormValues,
  profileSchema,
} from "@/validation/profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";

const Profile: React.FC = () => {
  const { data: profileRes, isLoading } = useGetMyProfileQuery({});
  const [deleteProfile, { isLoading: isDeleting }] =
    useDeleteMyProfileMutation();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();

  const profileData = profileRes?.data;
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Super Admin",
      profileImage: undefined,
    },
  });

  React.useEffect(() => {
    if (profileData) {
      form.reset({
        name: profileData.fullName,
        email: profileData.email,
        role: profileData.role === "admin" ? "Super Admin" : "Moderator",
        profileImage: undefined,
      });
      setPreview(profileData.profileImage || null);
    }
  }, [profileData, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("profileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      form.setValue("profileImage", undefined);
      setPreview(null);
    }
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await deleteProfile({}).unwrap();
        toast.success("Account deleted successfully");
        window.location.href = "/auth/login";
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete account");
      }
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.name);
      formData.append("email", data.email);
      if (data.profileImage instanceof File)
        formData.append("profileImage", data.profileImage);
      await updateProfile(formData).unwrap();
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleCancelEdit = () => {
    form.reset({
      name: profileData?.fullName,
      email: profileData?.email,
      role: profileData?.role === "admin" ? "Super Admin" : "Moderator",
      profileImage: undefined,
    });
    setPreview(profileData?.profileImage || null);
    setIsEditing(false);
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="w-full p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl  tracking-tight mb-2">My Profile</h1>
          <p className="text-gray-500">
            Manage your administrative details and account security.
          </p>
        </div>
        <Button
          onClick={isEditing ? handleCancelEdit : () => setIsEditing(true)}
          className={`px-6 py-2.5 rounded text-sm transition-all cursor-pointer ${
            isEditing
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "bg-primary text-secondary"
          }`}
        >
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProfileCard
          profileData={profileData}
          isEditing={isEditing}
          isDeleting={isDeleting}
          preview={preview}
          fileInputRef={fileInputRef}
          onImageChange={handleImageChange}
          onDelete={handleDeleteAccount}
        />
        <ProfileForm
          form={form}
          isEditing={isEditing}
          isUpdating={isUpdating}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Profile;
