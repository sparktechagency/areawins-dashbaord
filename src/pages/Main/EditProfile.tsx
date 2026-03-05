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
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/features/profile/profileApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const profileSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  nickname: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const EditProfile: React.FC = () => {
  const { data: profileRes, isLoading } = useGetMyProfileQuery({});
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();
  const profileData = profileRes?.data;
  const navigate = useNavigate();

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
    }
  }, [profileData, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile(data).unwrap();
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
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Nickname
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-1 ring-primary font-bold"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
