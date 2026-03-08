import { X } from "lucide-react";
import React, { useState } from "react";
interface ImageUploadProps {
  value?: any;
  onChange: (value: any) => void;
  className?: string;
  placeholder?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "Click or drag image to upload",
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      onChange(file as any);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className={`w-full ${className}`}>
      <label
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          relative flex flex-col items-center justify-center w-full h-32 rounded-md cursor-pointer 
          transition-all duration-200 ease-in-out
          ${
            value
              ? "border-0 bg-gray-50/10"
              : isDragging
                ? "border-2 border-dashed border-primary bg-primary/5"
                : "border-2 border-dashed border-slate-200 hover:bg-slate-50 bg-gray-50/30"
          }
        `}
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-2">
          {value ? (
            <div className="relative group w-full h-full flex justify-start items-center">
              <div className="relative w-fit h-fit">
                {/* Image Preview */}
                {typeof value === "string" ? (
                  <img
                    src={value}
                    alt="Preview"
                    className="max-h-28 max-w-full object-contain rounded border border-gray-100"
                  />
                ) : value instanceof File ? (
                  <img
                    src={URL.createObjectURL(value)}
                    alt="Preview"
                    className="max-h-28 max-w-full object-contain rounded border border-gray-100"
                  />
                ) : (
                  <div className="text-sm font-medium text-red-500">
                    Invalid Image
                  </div>
                )}

                {/* Delete Button - Positioned relative to the image */}
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute -top-2 -right-2 p-1 bg-rose-500 text-white rounded-full  hover:bg-rose-600 transition-colors transform hover:scale-110 z-10"
                  title="Remove image"
                >
                  <X className="size-3" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <svg
                aria-hidden="true"
                className="w-8 h-8 mb-3 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-slate-500 text-center px-2">
                <span className="font-semibold">{placeholder}</span>
              </p>
              <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF</p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onFileSelect}
        />
      </label>
    </div>
  );
};
