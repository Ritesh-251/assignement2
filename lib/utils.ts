import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Profile } from "@/types/profile";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }

  return age;
}

export function formatIncome(income: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(income);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Pending: "bg-amber-100 text-amber-800 border-amber-200",
    Matched: "bg-blue-100 text-blue-800 border-blue-200",
    Paused: "bg-slate-100 text-slate-700 border-slate-200"
  };

  return colors[status] ?? colors.Paused;
}

export function getDisplayPhoto(profile: Profile): string {
  const numericId = Number(profile.id.replace(/\D/g, ""));
  const portraitId = numericId % 90;
  const folder = profile.gender === "Female" ? "women" : "men";

  return `https://randomuser.me/api/portraits/${folder}/${portraitId}.jpg`;
}
