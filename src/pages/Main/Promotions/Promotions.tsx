import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const promotionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["New User", "Retention", "Special", "Seasonal"]),
  status: z.enum(["Active", "Scheduled", "Paused", "Expired"]),
  reach: z.string().min(1, "Reach description is required"),
  color: z.enum([
    "bg-green-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-purple-500",
    "bg-red-500",
  ]),
  description: z.string().min(1, "Description is required"),
});

type PromotionFormValues = z.infer<typeof promotionSchema>;

interface Promotion extends PromotionFormValues {
  id: string;
}

const INITIAL_PROMOS: Promotion[] = [
  {
    id: "1",
    title: "Welcome Bonus 100%",
    type: "New User",
    reach: "1.2k users",
    status: "Active",
    color: "bg-green-500",
    description: "Automated delivery triggered by account registration.",
  },
  {
    id: "2",
    title: "Weekend Cashback",
    type: "Retention",
    reach: "540 users",
    status: "Scheduled",
    color: "bg-blue-500",
    description: "Refund 10% on losses during weekend.",
  },
  {
    id: "3",
    title: "VIP High Roller",
    type: "Special",
    reach: "12 users",
    status: "Paused",
    color: "bg-orange-500",
    description: "Exclusive access to high stakes tables.",
  },
];

const Promotions: React.FC = () => {
  const [promos, setPromos] = useState<Promotion[]>(INITIAL_PROMOS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionSchema) as any,
    defaultValues: {
      title: "",
      type: "New User",
      status: "Active",
      reach: "",
      color: "bg-blue-500",
      description: "",
    },
  });

  const onSubmit = (data: PromotionFormValues) => {
    if (editingId) {
      setPromos((prev) =>
        prev.map((p) => (p.id === editingId ? { ...data, id: editingId } : p)),
      );
      toast.success("Campaign updated successfully");
    } else {
      setPromos([...promos, { ...data, id: Date.now().toString() }]);
      toast.success("New campaign created");
    }
    setIsModalOpen(false);
  };

  const handleCreate = () => {
    setEditingId(null);
    form.reset({
      title: "",
      type: "New User",
      status: "Active",
      reach: "",
      color: "bg-blue-500",
      description: "New campaign description...",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (p: Promotion) => {
    setEditingId(p.id);
    form.reset(p);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPromos((prev) => prev.filter((p) => p.id !== id));
    toast.success("Campaign deleted");
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
            Promotions &amp; Campaigns
          </h1>
          <p className="text-gray-500">
            Create incentives to drive user engagement and volume.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-secondary text-primary font-black shadow-lg shadow-green-500/10 hover:brightness-110"
        >
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all"
          >
            <div className={`h-2 ${promo.color}`} />
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-gray-400 tracking-wider bg-gray-50 px-2 py-1 rounded">
                  {promo.type}
                </span>
                <span
                  className={`text-[10px] font-bold ${
                    promo.status === "Active"
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {promo.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">
                {promo.title}
              </h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">
                {promo.description}
              </p>
              <div className="flex items-center gap-3 pt-6 border-t border-gray-50 mt-auto">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-400 mb-1">
                    Impact Reach
                  </p>
                  <p className="font-black text-slate-800">{promo.reach}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded bg-slate-50 text-slate-400 hover:bg-primary hover:text-white"
                    onClick={() => handleEdit(promo)}
                  >
                    <span className="material-symbols-outlined text-lg">
                      edit
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    onClick={() => handleDelete(promo.id)}
                  >
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Campaign" : "New Campaign"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Super Bowl Special" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="New User">New User</SelectItem>
                          <SelectItem value="Retention">Retention</SelectItem>
                          <SelectItem value="Special">Special</SelectItem>
                          <SelectItem value="Seasonal">Seasonal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Scheduled">Scheduled</SelectItem>
                          <SelectItem value="Paused">Paused</SelectItem>
                          <SelectItem value="Expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Details regarding the promotion..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="reach"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reach</FormLabel>
                      <FormControl>
                        <Input placeholder="500 users" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Tag</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            {
                              label: "Green",
                              value: "bg-green-500",
                              cls: "bg-green-500",
                            },
                            {
                              label: "Blue",
                              value: "bg-blue-500",
                              cls: "bg-blue-500",
                            },
                            {
                              label: "Orange",
                              value: "bg-orange-500",
                              cls: "bg-orange-500",
                            },
                            {
                              label: "Purple",
                              value: "bg-purple-500",
                              cls: "bg-purple-500",
                            },
                            {
                              label: "Red",
                              value: "bg-red-500",
                              cls: "bg-red-500",
                            },
                          ].map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`size-3 rounded-full ${c.cls}`}
                                />
                                {c.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Save Campaign
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Promotions;
