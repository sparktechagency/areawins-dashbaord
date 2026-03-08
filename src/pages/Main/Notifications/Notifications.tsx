import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Notification } from "../../../../types";
import NotificationItem from "./NotificationItem";

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Withdrawal Request",
    description: "User #u9283 requested a withdrawal of $1,200.00 via BTC.",
    type: "info",
    category: "financial",
    timestamp: "2 minutes ago",
    isRead: false,
  },
  {
    id: "2",
    title: "System Update Successful",
    description: "The live odds engine has been updated to v2.4.1.",
    type: "success",
    category: "system",
    timestamp: "15 minutes ago",
    isRead: false,
  },
  {
    id: "3",
    title: "Suspicious Betting Pattern",
    description:
      'Multiple large bets detected on "Luton vs Man City" from IP 192.168.1.1.',
    type: "warning",
    category: "bet",
    timestamp: "1 hour ago",
    isRead: true,
  },
  {
    id: "4",
    title: "User Blocked",
    description:
      'User "Sarah Jenkins" has been automatically blocked due to 5 failed login attempts.',
    type: "error",
    category: "user",
    timestamp: "3 hours ago",
    isRead: true,
  },
  {
    id: "5",
    title: "Promo Campaign Ended",
    description:
      'The "Welcome Bonus 100%" campaign has reached its expiry date.',
    type: "info",
    category: "system",
    timestamp: "Yesterday",
    isRead: true,
  },
];

type FilterType = "all" | "unread" | "system" | "financial";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "system") return n.category === "system";
    if (filter === "financial") return n.category === "financial";
    return true;
  });

  const markAsRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

  const deleteNotification = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const FILTERS: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "financial", label: "Financials" },
    { key: "system", label: "System" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl  tracking-tight mb-2">
            Notifications
          </h1>
          <p className="text-slate-500 font-medium">
            Stay updated with system alerts, user activities, and financial
            events.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="flex-1 md:flex-none"
          >
            Mark all as read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setNotifications([])}
            className="flex-1 md:flex-none text-red-500 hover:text-red-600"
          >
            Clear all
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {FILTERS.map(({ key, label }) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter(key)}
            className="rounded-full"
          >
            {label}
            {key === "unread" && unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl">
            <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 block">
              notifications_off
            </span>
            <p className="text-slate-400 font-bold tracking-widest text-xs">
              No notifications found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
