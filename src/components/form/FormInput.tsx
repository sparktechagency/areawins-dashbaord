import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: string;
  control: Control<TFieldValues>;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  showPasswordToggle?: boolean;
}

export const FormInput = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  control,
  disabled,
  className,
  inputClassName,
  labelClassName,
  showPasswordToggle,
}: FormInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

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
            <div className="relative">
              <Input
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "bg-white/5 border-gray-400 placeholder:text-white/20 focus-visible:ring-primary/50",
                  showPasswordToggle && "pr-10",
                  inputClassName,
                )}
                {...field}
                value={field.value ?? ""}
              />
              {showPasswordToggle && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
