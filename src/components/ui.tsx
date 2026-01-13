
import React from 'react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'accent';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 active:scale-95';
    const variants = {
      default: 'bg-primary text-slate-50 shadow-sm hover:bg-primary/90',
      destructive: 'bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90',
      outline: 'border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-primary',
      secondary: 'bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200',
      ghost: 'hover:bg-slate-100 hover:text-primary',
      link: 'text-primary underline-offset-4 hover:underline',
      accent: 'bg-accent text-primary font-bold hover:brightness-105 shadow-sm',
    };
    const sizes = {
      default: 'h-10 px-5 py-2',
      sm: 'h-8 rounded-lg px-3 text-xs',
      lg: 'h-12 rounded-xl px-10 text-base',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

// --- Label ---
export const Label = ({ className = '', ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={`text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
);

// --- Input ---
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

// --- Textarea ---
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[80px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition-all placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

// --- Select ---
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div className="relative group">
        <select
          ref={ref}
          className={`flex h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 font-semibold text-slate-700 ${className}`}
          {...props}
        >
          {children}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-lg group-focus-within:text-accent transition-colors">
          expand_more
        </span>
      </div>
    );
  }
);

// --- Checkbox ---
export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <div className="inline-flex items-center">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            ref={ref}
            className={`peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 bg-white transition-all checked:bg-accent checked:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 ${className}`}
            {...props}
          />
          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 peer-checked:opacity-100">
            <span className="material-symbols-outlined text-sm font-black">check</span>
          </span>
        </label>
      </div>
    );
  }
);

// --- Card ---
export const Card = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm ${className}`} {...props} />
);

export const CardHeader = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
);

export const CardTitle = ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`font-bold leading-none tracking-tight text-xl ${className}`} {...props} />
);

export const CardDescription = ({ className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-sm text-slate-500 font-medium ${className}`} {...props} />
);

export const CardContent = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);

export const CardFooter = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
);

// --- Badge ---
export const Badge = ({ className = '', variant = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' }) => {
  const variants = {
    default: 'border-transparent bg-primary text-slate-50 hover:bg-primary/80',
    secondary: 'border-transparent bg-slate-100 text-slate-900',
    destructive: 'border-transparent bg-red-100 text-red-600',
    outline: 'text-slate-500 border-slate-200',
    success: 'border-transparent bg-accent/10 text-accent border-accent/20 font-black',
  };
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider transition-colors focus:outline-none ${variants[variant]} ${className}`} {...props} />
  );
};

// --- Table ---
export const Table = ({ className = '', ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="relative w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
);

export const TableHeader = ({ className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={`[&_tr]:border-b border-slate-100 ${className}`} {...props} />
);

export const TableBody = ({ className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
);

export const TableRow = ({ className = '', ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={`border-b border-slate-50 transition-colors hover:bg-slate-50/50 ${className}`} {...props} />
);

export const TableHead = ({ className = '', ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={`h-12 px-4 text-left align-middle font-bold text-slate-400 uppercase text-[10px] tracking-widest ${className}`} {...props} />
);

export const TableCell = ({ className = '', ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={`p-4 align-middle font-medium ${className}`} {...props} />
);

// --- Dialog / Modal ---
export const Dialog = ({ isOpen, onClose, children, title }: { isOpen: boolean, onClose: () => void, children: React.ReactNode, title?: string }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      <Card className="z-[101] w-full max-w-lg animate-in fade-in zoom-in duration-300 overflow-hidden border-none shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-black">{title}</CardTitle>
          <button 
            onClick={onClose}
            className="size-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-400 hover:text-primary"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </CardHeader>
        <CardContent className="pt-2">{children}</CardContent>
      </Card>
    </div>
  );
};
