import { FormInput, FormImageUpload } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  useGetSingleSportCategoryQuery,
  useUpdateSportCategoryMutation,
} from "@/redux/features/sportCategory/sportCategoryApi";
import {
  SportCategoriesFormValues,
  sportCategoriesSchema,
} from "@/validation/sportCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditSportCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: sportRes, isLoading: isFetching } =
    useGetSingleSportCategoryQuery(id);
  const [updateSportCategory, { isLoading: isUpdating }] =
    useUpdateSportCategoryMutation();

  const form = useForm<SportCategoriesFormValues>({
    resolver: zodResolver(sportCategoriesSchema) as any,
    defaultValues: { name: "", icon: "" },
  });

  useEffect(() => {
    if (sportRes?.data) {
      form.reset({
        name: sportRes.data.name,
        icon: sportRes.data.icon,
      });
    }
  }, [sportRes, form]);

  const onSubmit = async (data: SportCategoriesFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.icon instanceof File) {
      formData.append("icon", data.icon);
    }

    try {
      await updateSportCategory({ id, data: formData }).unwrap();
      toast.success("Sport updated successfully");
      navigate("/categories");
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  if (isFetching)
    return <div className="p-8 text-center">Loading sport details...</div>;

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Edit Sport
          </h1>
          <p className="text-slate-500 font-medium">
            Update the details of the sport category.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        >
          Go Back
        </Button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              control={form.control}
              name="name"
              label="Sport Name"
              placeholder="Football"
              error={form.formState.errors.name?.message}
              required
            />

            <FormImageUpload
              control={form.control}
              name="icon"
              label="Sport Icon"
              placeholder="Upload Sport Icon"
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 cursor-pointer"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Update Sport"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditSportCategory;
