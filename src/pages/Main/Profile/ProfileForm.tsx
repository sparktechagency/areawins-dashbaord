import { FormInput, FormSelect } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ProfileFormProps {
  form: UseFormReturn<any>;
  isEditing: boolean;
  isUpdating: boolean;
  onSubmit: (data: any) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  form,
  isEditing,
  isUpdating,
  onSubmit,
}) => {
  return (
    <div className="md:col-span-2">
      <div className="bg-white border border-gray-200 rounded p-8 h-fit">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">person</span>
          Personal Information
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
  );
};

export default ProfileForm;
