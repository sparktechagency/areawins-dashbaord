import { ImageUpload } from "@/components/common/ImageUpload";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormImageUploadProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  required?: boolean;
}

export const FormImageUpload = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  className,
  labelClassName,
  required,
}: FormImageUploadProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col gap-1.5", className)}>
          {label && (
            <FormLabel className={cn("text-sm text-gray-700", labelClassName)}>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage className="text-xs font-medium text-red-500 mt-1" />
        </FormItem>
      )}
    />
  );
};

export default FormImageUpload;
