import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormTextareaProps<TFieldValues extends FieldValues> extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name"
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

export const FormTextarea = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  required,
  className,
  containerClassName,
  labelClassName,
  placeholder,
  disabled,
  ...props
}: FormTextareaProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex flex-col gap-1.5", containerClassName)}>
          {label && (
            <FormLabel
              className={cn(
                "text-sm font-semibold text-gray-700",
                labelClassName,
              )}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "min-h-[100px] text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary transition-all font-medium",
                fieldState.error
                  ? "border-red-500 bg-red-50/10"
                  : "bg-gray-50/30",
                className,
              )}
              {...field}
              {...props}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage className="text-xs font-medium text-red-500 mt-1" />
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;
