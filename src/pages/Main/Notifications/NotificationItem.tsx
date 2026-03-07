import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Notification } from "../../../../types";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return (
        <span className="material-symbols-outlined text-accent">
          check_circle
        </span>
      );
    case "warning":
      return (
        <span className="material-symbols-outlined text-yellow-500">
          warning
        </span>
      );
    case "error":
      return (
        <span className="material-symbols-outlined text-red-500">error</span>
      );
    default:
      return (
        <span className="material-symbols-outlined text-blue-500">info</span>
      );
  }
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification: n,
  onMarkAsRead,
  onDelete,
}) => {
  return (
    <Card
      className={`transition-all hover:shadow-md ${
        !n.isRead ? "border-l-4 border-l-accent bg-secondary/5" : "bg-white"
      }`}
    >
      <CardContent className="p-4 md:p-6 flex gap-4">
        <div className="shrink-0 mt-1">{getIcon(n.type)}</div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
            <h3
              className={`font-bold text-sm md:text-base ${
                !n.isRead ? "text-primary" : "text-slate-600"
              }`}
            >
              {n.title}
            </h3>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest shrink-0">
              {n.timestamp}
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-4">
            {n.description}
          </p>
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="text-[9px] tracking-tighter py-0"
            >
              {n.category}
            </Badge>
            <div className="flex gap-2">
              {!n.isRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-[10px] font-bold tracking-widest text-accent"
                  onClick={() => onMarkAsRead(n.id)}
                >
                  Mark as read
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-300 hover:text-red-500"
                onClick={() => onDelete(n.id)}
              >
                <span className="material-symbols-outlined text-lg">
                  delete
                </span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationItem;
