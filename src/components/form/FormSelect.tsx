import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormSelectProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon;
  labelClassName?: string;
  triggerClassName?: string;
}

export const FormSelect = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  options,
  required,
  disabled,
  className,
  icon: Icon,
  labelClassName,
  triggerClassName,
}: FormSelectProps<TFieldValues>) => {
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
          <div className="relative">
            {Icon && (
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            )}
            <Select
              disabled={disabled}
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger
                  className={cn(
                    "h-12 w-full text-base border-gray-200 rounded-md focus:border-primary transition-all font-medium",
                    Icon && "pl-10",
                    fieldState.error
                      ? "border-rose-500 bg-red-50/10"
                      : "bg-gray-50/30",
                    triggerClassName,
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormMessage className="text-xs font-medium text-red-500 mt-1" />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
