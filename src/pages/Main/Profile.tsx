import { FormInput, FormSelect } from "@/components/form";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
import dayjs from "dayjs";
import { Camera } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";

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

  // Update form when data is loaded
  React.useEffect(() => {
    if (profileData) {
      form.reset({
        name: profileData.fullName,
        email: profileData.email,
        role: profileData.role === "admin" ? "Super Admin" : "Moderator",
        profileImage: undefined,
      });
      if (profileData.profileImage) {
        setPreview(profileData.profileImage);
      } else {
        setPreview(null);
      }
    }
  }, [profileData, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("profileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
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
        // Logic to logout and redirect
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

      if (data.profileImage instanceof File) {
        formData.append("profileImage", data.profileImage);
      }

      await updateProfile(formData).unwrap();
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            My Profile
          </h1>
          <p className="text-gray-500">
            Manage your administrative details and account security.
          </p>
        </div>
        <Button
          onClick={() => {
            if (isEditing) {
              form.reset({
                name: profileData?.fullName,
                email: profileData?.email,
                role:
                  profileData?.role === "admin" ? "Super Admin" : "Moderator",
                profileImage: undefined,
              });
              if (profileData?.profileImage) {
                setPreview(profileData.profileImage);
              } else {
                setPreview(null);
              }
            }
            setIsEditing(!isEditing);
          }}
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
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col items-center text-center">
            <div
              className={`relative group ${isEditing ? "cursor-pointer" : ""}`}
              onClick={() => isEditing && fileInputRef.current?.click()}
            >
              <img
                className={`size-32 rounded-full border-4 border-slate-50 shadow-inner mb-6 transition-all object-cover ${
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
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <h2 className="text-2xl font-black text-primary">
              {profileData?.fullName || "Loading..."}
            </h2>
            <p className="text-primary font-black uppercase text-[10px] tracking-widest  bg-white border border-primary px-3 py-1 rounded-full mt-2">
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

          <div className="bg-red-50 border border-red-100 rounded-lg p-6 mt-6">
            <h4 className="text-red-600 font-black text-xs uppercase tracking-widest mb-4">
              Danger Zone
            </h4>
            <p className="text-red-900/60 text-[10px] font-bold mb-4">
              Deleting your account is permanent and cannot be undone.
            </p>
            <Button
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="w-full bg-white text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-all text-xs font-black shadow-none h-10 cursor-pointer disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete My Account"}
            </Button>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-8 h-fit">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                person
              </span>
              Personal Information
            </h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    control={form.control}
                    name="name"
                    label="Full Name"
                    disabled={!isEditing}
                    labelClassName="text-gray-400"
                  />
                  <FormInput
                    control={form.control}
                    name="email"
                    label="Email Address"
                    disabled={!isEditing}
                    labelClassName="text-gray-400"
                    inputClassName="disabled:opacity-60 cursor-not-allowed"
                  />
                </div>

                <FormSelect
                  control={form.control}
                  name="role"
                  label="Administrative Role"
                  disabled={true}
                  labelClassName="text-gray-400"
                  triggerClassName="disabled:opacity-60"
                  options={[
                    { label: "Super Admin", value: "Super Admin" },
                    { label: "Moderator", value: "Moderator" },
                    { label: "Editor", value: "Editor" },
                  ]}
                />

                {isEditing && (
                  <div className="pt-8 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-primary px-8 py-6 rounded cursor-pointer text-white"
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Updating..." : "Update Profile Data"}
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
