import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { BetTypeFormValues, betTypeSchema } from "@/validation/betType";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface BetTypeFormProps {
  initialData?: any;
  sports: any[];
  isLoading?: boolean;
  onSubmit: (data: BetTypeFormValues) => void;
  title?: string;
  initialSportId?: string;
}

const BetTypeForm: React.FC<BetTypeFormProps> = ({
  initialData,
  sports,
  isLoading,
  onSubmit,
  title,
  initialSportId,
}) => {
  const navigate = useNavigate();
  const form = useForm<BetTypeFormValues>({
    resolver: zodResolver(betTypeSchema) as any,
    defaultValues: {
      sport:
        initialData?.sport?._id || initialData?.sport || initialSportId || "",
      name: initialData?.name || "",
      outcomes: initialData?.outcomes || [],
      isDefault: initialData?.isDefault || false,
      displayOrder: initialData?.displayOrder || 0,
      isActive: initialData?.isActive ?? true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "outcomes",
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        sport:
          typeof initialData.sport === "object"
            ? initialData.sport?._id || initialData.sport?.id
            : initialData.sport,
        name: initialData.name,
        outcomes: initialData.outcomes,
        isDefault: initialData.isDefault,
        displayOrder: initialData.displayOrder,
        isActive: initialData.isActive,
      });
    }
  }, [initialData, form]);

  return (
    <div className="max-w-4xl mx-auto">
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="p-6 bg-white rounded-xl border border-slate-100  space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="sport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sport</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!!initialSportId}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select Sport" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sports.map((s: any) => (
                          <SelectItem key={s._id} value={s._id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Match Winner"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Outcomes Section */}
            <div className="space-y-4 border rounded p-4 bg-slate-50/50">
              <div className="flex justify-between items-center">
                <FormLabel>Outcomes</FormLabel>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    append({
                      label: "",
                    })
                  }
                >
                  + Add Outcome
                </Button>
              </div>
              {form.formState.errors.outcomes && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.outcomes.message ||
                    form.formState.errors.outcomes.root?.message}
                </p>
              )}

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-2 items-start bg-white p-3 rounded border border-slate-100 mb-2 "
                >
                  <FormField
                    control={form.control}
                    name={`outcomes.${index}.label`}
                    render={({ field }) => (
                      <FormItem className="flex-1 space-y-1">
                        <FormLabel className="text-xs text-slate-400">
                          Label
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-10 text-sm font-bold"
                            placeholder="Outcome Label (e.g. Home Win)"
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 mt-6 text-destructive hover:bg-destructive/10"
                    onClick={() => remove(index)}
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Default Bet Type?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 h-12" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Bet Type"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BetTypeForm;
