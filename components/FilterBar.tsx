"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export interface Filters {
  query: string;
  gender: string;
  statusTag: string;
  city: string;
  religion: string;
}

export function FilterBar({
  filters,
  cities,
  religions,
  onChange
}: {
  filters: Filters;
  cities: string[];
  religions: string[];
  onChange: (filters: Filters) => void;
}) {
  const update = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });

  return (
    <section className="rounded-lg border border-rose/10 bg-white/82 p-4 shadow-premium">
      <div className="grid gap-3 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr]">
        <label className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" size={18} />
          <Input
            value={filters.query}
            onChange={(event) => update("query", event.target.value)}
            placeholder="Search by name or city"
            className="pl-10"
          />
        </label>
        <Select value={filters.gender} onChange={(event) => update("gender", event.target.value)}>
          <option value="All">All genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>
        <Select value={filters.statusTag} onChange={(event) => update("statusTag", event.target.value)}>
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Matched">Matched</option>
          <option value="Paused">Paused</option>
        </Select>
        <Select value={filters.city} onChange={(event) => update("city", event.target.value)}>
          <option value="All">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
        <Select value={filters.religion} onChange={(event) => update("religion", event.target.value)}>
          <option value="All">All religions</option>
          {religions.map((religion) => (
            <option key={religion} value={religion}>
              {religion}
            </option>
          ))}
        </Select>
      </div>
    </section>
  );
}
