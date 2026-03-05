import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteMyProfileMutation,
  useGetMyProfileQuery,
} from "@/redux/features/profile/profileApi";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import Swal from "sweetalert2";
import * as z from "zod";
import { setUser } from "../../redux/features/dashboard/dashboardSlice";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Super Admin", "Moderator", "Editor"]),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile: React.FC = () => {
  const { data: profileRes, isLoading } = useGetMyProfileQuery({});
  const [deleteProfile] = useDeleteMyProfileMutation();
  const profileData = profileRes?.data;

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Super Admin",
    },
  });

  // Update form when data is loaded
  React.useEffect(() => {
    if (profileData) {
      form.reset({
        name: profileData.fullName,
        email: profileData.email,
        role: profileData.role === "admin" ? "Super Admin" : "Moderator",
      });
    }
  }, [profileData, form]);

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

  const onSubmit = (data: ProfileFormValues) => {
    dispatch(setUser({ ...user, name: data.name, role: data.role }));
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

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
              form.reset(); // Cancel
            }
            setIsEditing(!isEditing);
          }}
          className={`px-6 py-2.5 rounded-lg text-sm font-black transition-all ${
            isEditing
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "bg-primary text-secondary shadow-lg shadow-primary/20 hover:brightness-110"
          }`}
        >
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </Button>
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
            <h2 className="text-2xl font-black text-primary">
              {profileData?.fullName || "Loading..."}
            </h2>
            <p className="text-accent font-black uppercase text-[10px] tracking-widest mt-1 bg-secondary/10 px-3 py-1 rounded-full">
              {profileData?.role}
            </p>

            <div className="w-full mt-8 pt-8 border-t border-gray-50 space-y-4">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400">Customer ID</span>
                <span className="text-primary">{profileData?.customerId}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400">Referral Code</span>
                <span className="text-primary">
                  {profileData?.referralCode}
                </span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400">Account Status</span>
                <span className="text-green-500">Verified</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400">Member Since</span>
                <span className="text-primary">
                  {profileData?.createdAt
                    ? dayjs(profileData?.createdAt).format("MMM YYYY")
                    : "..."}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-3xl p-6 mt-6">
            <h4 className="text-red-600 font-black text-xs uppercase tracking-widest mb-4">
              Danger Zone
            </h4>
            <p className="text-red-900/60 text-[10px] font-bold mb-4">
              Deleting your account is permanent and cannot be undone.
            </p>
            <Button
              onClick={handleDeleteAccount}
              className="w-full bg-white text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-all text-xs font-black shadow-none h-10"
            >
              Delete My Account
            </Button>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm h-full">
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
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black text-gray-400 uppercase tracking-widest">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={!isEditing}
                            className="bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold disabled:opacity-60"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black text-gray-400 uppercase tracking-widest">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={!isEditing}
                            readOnly
                            className="bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold disabled:opacity-60 cursor-not-allowed"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        Administrative Role
                      </FormLabel>
                      <Select
                        disabled={!isEditing}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold disabled:opacity-60">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Super Admin">
                            Super Admin
                          </SelectItem>
                          <SelectItem value="Moderator">Moderator</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isEditing && (
                  <div className="pt-8 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-primary text-secondary px-8 py-6 rounded-xl font-black shadow-xl shadow-primary/20 hover:brightness-110 transition-all"
                    >
                      Update Profile Data
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
