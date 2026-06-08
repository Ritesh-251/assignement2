"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-rose/10 bg-cream/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">TDC Matchmaking</p>
          <h1 className="text-xl font-semibold text-burgundy sm:text-2xl">Matchmaker Dashboard</h1>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </header>
  );
}
