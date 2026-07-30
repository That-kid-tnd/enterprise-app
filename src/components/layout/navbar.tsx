"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { data: session } = useSession();

  return (
    <nav className="border-b px-4 py-3 flex items-center justify-between bg-background">
      <div className="flex items-center gap-2">
        <button onClick={onMenuClick} className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <span className="font-semibold text-lg">Enterprise</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm hidden sm:inline">{session?.user?.name}</span>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </nav>
  );
}
