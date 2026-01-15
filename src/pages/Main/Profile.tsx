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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";
import { RootState } from "../../../types";
import { setUser } from "../../redux/features/dashboard/dashboardSlice";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Super Admin", "Moderator", "Editor"]),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile: React.FC = () => {
  const dashboardState = useSelector(
    (state: RootState) => state.dashboard
  ) as any;
  const user = dashboardState?.user || { name: "Admin", role: "Super Admin" };
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      // @ts-ignore
      email: user.email || "alex.morgan@AreaWinsbet.com", // Mock email default
      role: user.role as "Super Admin" | "Moderator" | "Editor",
    },
  });

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
