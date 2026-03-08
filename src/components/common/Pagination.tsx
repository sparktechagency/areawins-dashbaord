import { Button } from "@/components/ui/button";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          className={`w-9 h-9 rounded-lg font-bold transition-all duration-300 ${
            currentPage === i
              ? "bg-primary text-secondary shadow-md hover:bg-primary/90"
              : "text-slate-500 hover:text-primary hover:border-primary"
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>,
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3 rounded-lg flex items-center gap-1 text-slate-500 hover:text-primary hover:border-primary disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span className="material-symbols-outlined text-lg">chevron_left</span>
        <span className="hidden sm:inline">Prev</span>
      </Button>

      <div className="flex items-center gap-1">{renderPageNumbers()}</div>

      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3 rounded-lg flex items-center gap-1 text-slate-500 hover:text-primary hover:border-primary disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <span className="material-symbols-outlined text-lg">chevron_right</span>
      </Button>
    </div>
  );
};

export default Pagination;
