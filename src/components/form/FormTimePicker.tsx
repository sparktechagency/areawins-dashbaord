import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormTimePickerProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label?: string;
  control: Control<TFieldValues>;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export const FormTimePicker = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  disabled,
  className,
  inputClassName,
  labelClassName,
}: FormTimePickerProps<TFieldValues>) => {
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
          <FormControl>
            <Input
              type="time"
              disabled={disabled}
              className={cn(
                "bg-white/5 border-gray-400 placeholder:text-white/20 focus-visible:ring-primary/50",
                inputClassName,
              )}
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
