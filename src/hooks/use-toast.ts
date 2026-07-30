import { useState, useCallback } from "react";

type Toast = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
    // In a real app, you'd show it with a toast component
    console.log(toast.title, toast.description);
  }, []);

  return { toast, toasts };
}
