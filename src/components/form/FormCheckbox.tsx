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
        <FormItem>
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
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
