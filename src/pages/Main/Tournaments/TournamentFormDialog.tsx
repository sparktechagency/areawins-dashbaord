import FormCheckbox from "@/components/form/FormCheckbox";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormImageUpload from "@/components/form/FormImageUpload";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormTextarea from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { CalendarIcon, Globe, Trophy, Type } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface TournamentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingId: string | null;
  form: UseFormReturn<any>;
  sports: any[];
  onSubmit: (data: any) => void;
  isSaving: boolean;
}

const TournamentFormDialog: React.FC<TournamentFormDialogProps> = ({
  open,
  onOpenChange,
  editingId,
  form,
  sports,
  onSubmit,
  isSaving,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Tournament" : "New Tournament"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                control={form.control}
                name="sport"
                label="Sport Category"
                placeholder="Select Sport"
                options={sports.map((s: any) => ({
                  label: s.name,
                  value: s._id,
                }))}
                icon={Trophy}
                required
              />

              <FormSelect
                control={form.control}
                name="type"
                label="Tournament Type"
                placeholder="Select Type"
                options={[
                  { label: "League", value: "league" },
                  { label: "Tournament", value: "tournament" },
                  { label: "Cup", value: "cup" },
                  { label: "International", value: "international" },
                  { label: "Grand Slam", value: "grand_slam" },
                  { label: "Other", value: "other" },
                ]}
                icon={Type}
                required
              />

              <FormInput
                control={form.control}
                name="name"
                label="Tournament Name"
                placeholder="Premier League 2024"
                icon={Trophy}
                required
              />

              <FormInput
                control={form.control}
                name="year"
                label="Year"
                placeholder="2026"
                icon={CalendarIcon}
              />

              <FormInput
                control={form.control}
                name="country"
                label="Country"
                placeholder="Enter Country (e.g. Albania, UK)"
                icon={Globe}
              />

              <FormDatePicker
                control={form.control}
                name="startDate"
                label="Start Date"
                placeholder="Select Start Date"
              />

              <FormDatePicker
                control={form.control}
                name="endDate"
                label="End Date"
                placeholder="Select End Date"
              />

              <FormCheckbox
                control={form.control}
                name="isFeatured"
                label="Featured Tournament?"
              />
            </div>

            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
              placeholder="Brief description of the tournament..."
            />

            <FormImageUpload
              control={form.control}
              name="logo"
              label="Tournament Logo"
              placeholder="Upload Tournament Logo"
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 h-12" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Tournament"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TournamentFormDialog;
