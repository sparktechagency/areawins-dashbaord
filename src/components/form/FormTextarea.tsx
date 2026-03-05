import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormTextareaProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  control: Control<TFieldValues>;
  disabled?: boolean;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
}

export const FormTextarea = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  disabled,
  className,
  textareaClassName,
  labelClassName,
}: FormTextareaProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          {label && (
            <FormLabel
              className={cn(
                "text-xs font-black uppercase tracking-widest ml-1",
                labelClassName,
              )}
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "bg-white/5 border-gray-400 placeholder:text-white/20 focus-visible:ring-primary/50 min-h-[100px]",
                textareaClassName,
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
