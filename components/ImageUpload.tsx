"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  value?: string;
}

export default function ImageUpload({ onUpload, value }: ImageUploadProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-4">
      {value && (
        <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-300">
          <img
            className="h-full w-full object-cover"
            alt="Upload"
            src={value}
          />
          <button
            onClick={() => onUpload("")}
            type="button"
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

    
      <CldUploadWidget
        uploadPreset="dashboard_preset" 
        onSuccess={(result: any) => {
          onUpload(result.info.secure_url);
        }}
      >
        {({ open }) => {
          return (
            <button
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg transition border border-dashed border-gray-400"
            >
              <ImagePlus className="h-5 w-5" />
              <span>Upload Image</span>
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
