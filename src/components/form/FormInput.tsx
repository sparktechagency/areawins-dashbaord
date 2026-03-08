import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<TFieldValues extends FieldValues> extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name"
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  icon?: LucideIcon;
  required?: boolean;
  showPasswordToggle?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const FormInput = <TFieldValues extends FieldValues>(
  props: FormInputProps<TFieldValues>,
) => {
  const {
    name,
    control,
    label,
    icon: Icon,
    required,
    showPasswordToggle,
    containerClassName,
    labelClassName,
    inputClassName,
    type = "text",
    placeholder,
    disabled,
    ...rest
  } = props;
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
            <div className="relative">
              {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              )}
              <Input
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary transition-all font-medium",
                  Icon && "pl-10",
                  showPasswordToggle && "pr-10",
                  fieldState.error
                    ? "border-red-500 bg-red-50/10"
                    : "bg-gray-50/30",
                  inputClassName,
                )}
                {...field}
                {...rest}
                value={field.value ?? ""}
              />
              {showPasswordToggle && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-xs font-medium text-red-500 mt-1" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
