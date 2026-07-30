"use client";

import { Sidebar } from "./sidebar";
import { X } from "lucide-react";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-64 bg-background border-r">
        <div className="flex justify-end p-2">
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
