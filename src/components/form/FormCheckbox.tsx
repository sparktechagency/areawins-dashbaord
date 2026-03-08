import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
}

export const FormCheckbox = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  className,
  labelClassName,
  disabled,
}: FormCheckboxProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center space-x-3 space-y-0 p-3 h-12 border border-gray-200 rounded-md bg-gray-50/30",
            className,
          )}
        >
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel
              className={cn(
                "text-sm text-gray-700 cursor-pointer",
                labelClassName,
              )}
            >
              {label}
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
