
import React, { useState } from 'react';
import { Notification } from '../../../types';

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Withdrawal Request',
    description: 'User #u9283 requested a withdrawal of $1,200.00 via BTC.',
    type: 'info',
    category: 'financial',
    timestamp: '2 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    title: 'System Update Successful',
    description: 'The live odds engine has been updated to v2.4.1.',
    type: 'success',
    category: 'system',
    timestamp: '15 minutes ago',
    isRead: false,
  },
  {
    id: '3',
    title: 'Suspicious Betting Pattern',
    description: 'Multiple large bets detected on "Luton vs Man City" from IP 192.168.1.1.',
    type: 'warning',
    category: 'bet',
    timestamp: '1 hour ago',
    isRead: true,
  },
  {
    id: '4',
    title: 'User Blocked',
    description: 'User "Sarah Jenkins" has been automatically blocked due to 5 failed login attempts.',
    type: 'error',
    category: 'user',
    timestamp: '3 hours ago',
    isRead: true,
  },
  {
    id: '5',
    title: 'Promo Campaign Ended',
    description: 'The "Welcome Bonus 100%" campaign has reached its expiry date.',
    type: 'info',
    category: 'system',
    timestamp: 'Yesterday',
    isRead: true,
  },
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'system' | 'financial'>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'system') return n.category === 'system';
    if (filter === 'financial') return n.category === 'financial';
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <span className="material-symbols-outlined text-accent">check_circle</span>;
      case 'warning': return <span className="material-symbols-outlined text-yellow-500">warning</span>;
      case 'error': return <span className="material-symbols-outlined text-red-500">error</span>;
      default: return <span className="material-symbols-outlined text-blue-500">info</span>;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Notifications</h1>
          <p className="text-slate-500 font-medium">Stay updated with system alerts, user activities, and financial events.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" onClick={markAllAsRead} className="flex-1 md:flex-none">
            Mark all as read
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setNotifications([])} className="flex-1 md:flex-none text-red-500 hover:text-red-600">
            Clear all
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Button 
          variant={filter === 'all' ? 'default' : 'ghost'} 
          size="sm" 
          onClick={() => setFilter('all')}
          className="rounded-full"
        >
          All
        </Button>
        <Button 
          variant={filter === 'unread' ? 'default' : 'ghost'} 
          size="sm" 
          onClick={() => setFilter('unread')}
          className="rounded-full"
        >
          Unread
          {notifications.filter(n => !n.isRead).length > 0 && (
            <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {notifications.filter(n => !n.isRead).length}
            </span>
          )}
        </Button>
        <Button 
          variant={filter === 'financial' ? 'default' : 'ghost'} 
          size="sm" 
          onClick={() => setFilter('financial')}
          className="rounded-full"
        >
          Financials
        </Button>
        <Button 
          variant={filter === 'system' ? 'default' : 'ghost'} 
          size="sm" 
          onClick={() => setFilter('system')}
          className="rounded-full"
        >
          System
        </Button>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <Card 
              key={n.id} 
              className={`transition-all hover:shadow-md ${!n.isRead ? 'border-l-4 border-l-accent bg-accent/5' : 'bg-white'}`}
            >
              <CardContent className="p-4 md:p-6 flex gap-4">
                <div className="shrink-0 mt-1">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className={`font-bold text-sm md:text-base ${!n.isRead ? 'text-primary' : 'text-slate-600'}`}>
                      {n.title}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">
                      {n.timestamp}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-4">
                    {n.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[9px] uppercase tracking-tighter py-0">
                      {n.category}
                    </Badge>
                    <div className="flex gap-2">
                      {!n.isRead && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-[10px] font-bold uppercase tracking-widest text-accent"
                          onClick={() => markAsRead(n.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-slate-300 hover:text-red-500"
                        onClick={() => deleteNotification(n.id)}
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl">
            <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 block">notifications_off</span>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
