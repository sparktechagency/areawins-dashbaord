import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/features/profile/profileApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const profileSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  nickname: z.string().optional(),
  profileImage: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const EditProfile: React.FC = () => {
  const { data: profileRes, isLoading } = useGetMyProfileQuery({});
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();
  const profileData = profileRes?.data;
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      nickname: "",
    },
  });

  // Update form when data is loaded
  React.useEffect(() => {
    if (profileData) {
      form.reset({
        fullName: profileData.fullName || "",
        nickname: profileData.nickname || "",
      });
      if (profileData.profileImage) {
        setPreview(profileData.profileImage);
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
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      if (data.nickname) {
        formData.append("nickname", data.nickname);
      }
      if (data.profileImage instanceof File) {
        formData.append("profileImage", data.profileImage);
      }

      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight mb-2">
          Edit Profile
        </h1>
        <p className="text-gray-500">Update your public profile information.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="size-32 rounded-full border-4 border-slate-50 overflow-hidden bg-slate-100 shadow-inner">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Camera size={40} />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profileImage"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera size={24} />
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="mt-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Profile Photo
              </p>
            </div>

            <FormInput
              control={form.control}
              name="fullName"
              label="Full Name"
              inputClassName="bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold text-gray-900"
              labelClassName="text-gray-400"
            />

            <FormInput
              control={form.control}
              name="nickname"
              label="Nickname"
              inputClassName="bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold text-gray-900"
              labelClassName="text-gray-400"
            />

            <div className="pt-8 flex gap-4 justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/profile")}
                className="px-8 py-6 rounded-xl font-black"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-primary text-secondary px-8 py-6 rounded-xl font-black shadow-xl shadow-primary/20 hover:brightness-110 transition-all"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
