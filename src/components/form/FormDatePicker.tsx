import DatePicker from "@/components/ui/date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CalendarIcon, LucideIcon } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormDatePickerProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  icon?: LucideIcon;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
}

export const FormDatePicker = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  icon: Icon = CalendarIcon,
  required,
  className,
  labelClassName,
  placeholder,
}: FormDatePickerProps<TFieldValues>) => {
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
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <DatePicker
                className={cn(
                  "h-12 text-base border-gray-200 rounded-md focus:border-primary transition-all font-medium",
                  "pl-10",
                  fieldState.error
                    ? "border-rose-500 bg-red-50/10"
                    : "bg-gray-50/30",
                )}
                placeholder={placeholder}
                value={field.value}
                onChange={(date) => {
                  const dateString = date.toISOString().split("T")[0];
                  field.onChange(dateString);
                }}
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs font-medium text-red-500 mt-1" />
        </FormItem>
      )}
    />
  );
};

export default FormDatePicker;
