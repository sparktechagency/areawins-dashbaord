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

  return (
    <div className={`w-full ${className}`}>
      <label
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded cursor-pointer 
          transition-colors duration-200 ease-in-out
          ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-slate-200 hover:bg-slate-50"
          }
        `}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {value ? (
            typeof value === "string" ? (
              <img src={value} alt="Preview" className="h-24 object-contain" />
            ) : value instanceof File ? (
              <img
                src={URL.createObjectURL(value)}
                alt="Preview"
                className="h-24 object-contain"
              />
            ) : (
              <div className="text-2xl">Invalid Image</div>
            )
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
      {value && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onChange("");
          }}
          className="text-xs text-red-500 mt-2 hover:underline text-center w-full block"
        >
          Remove Image
        </button>
      )}
    </div>
  );
};
