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
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormSelectProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  control: Control<TFieldValues>;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  labelClassName?: string;
}

export const FormSelect = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  control,
  disabled,
  className,
  triggerClassName,
  labelClassName,
}: FormSelectProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          {label && (
            <FormLabel
              className={cn(
                "text-xs font-black  tracking-widest ml-1",
                labelClassName,
              )}
            >
              {label}
            </FormLabel>
          )}
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "bg-white/5 border-gray-400 placeholder:text-white/20 focus-visible:ring-primary/50",
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
