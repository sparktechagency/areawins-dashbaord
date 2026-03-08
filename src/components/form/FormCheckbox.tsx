import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormCheckboxProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  required?: boolean;
}

export const FormCheckbox = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  className,
  labelClassName,
  disabled,
  required,
}: FormCheckboxProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex flex-col gap-1.5", className)}>
          {label && (
            <FormLabel className={cn("text-sm text-gray-700", labelClassName)}>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div
              className={cn(
                "flex items-center space-x-3 h-12 px-3 border border-gray-200 rounded-md transition-all",
                fieldState.error
                  ? "border-rose-500 bg-red-50/10"
                  : "bg-gray-50/30",
              )}
            >
              <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
              <label
                htmlFor={name}
                className="text-sm text-gray-500 cursor-pointer select-none"
              >
                {label}
              </label>
            </div>
          </FormControl>
          <FormMessage className="text-xs font-medium text-red-500 mt-1" />
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
