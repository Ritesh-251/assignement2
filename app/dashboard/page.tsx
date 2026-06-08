"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { FilterBar, type Filters } from "@/components/FilterBar";
import { ProfileCard } from "@/components/ProfileCard";
import { StatsBar } from "@/components/StatsBar";
import profilesData from "@/data/profiles.json";
import type { Profile, StatusTag } from "@/types/profile";

const initialFilters: Filters = {
  query: "",
  gender: "All",
  statusTag: "All",
  city: "All",
  religion: "All"
};

export default function DashboardPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      router.replace("/login");
      return;
    }

    const statusMap = JSON.parse(localStorage.getItem("tdc-status-map") ?? "{}") as Record<string, StatusTag>;
    const merged = (profilesData as Profile[]).map((profile) => ({
      ...profile,
      statusTag: statusMap[profile.id] ?? profile.statusTag
    }));

    const timer = window.setTimeout(() => {
      setProfiles(merged);
      setLoading(false);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [router]);

  const cities = useMemo(() => Array.from(new Set(profiles.map((profile) => profile.city))).sort(), [profiles]);
  const religions = useMemo(() => Array.from(new Set(profiles.map((profile) => profile.religion))).sort(), [profiles]);

  const filteredProfiles = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return profiles.filter((profile) => {
      const name = `${profile.firstName} ${profile.lastName}`.toLowerCase();
      return (
        (!query || name.includes(query) || profile.city.toLowerCase().includes(query)) &&
        (filters.gender === "All" || profile.gender === filters.gender) &&
        (filters.statusTag === "All" || profile.statusTag === filters.statusTag) &&
        (filters.city === "All" || profile.city === filters.city) &&
        (filters.religion === "All" || profile.religion === filters.religion)
      );
    });
  }, [filters, profiles]);

  return (
    <>
      <Header />
      <motion.main
        className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {loading ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-28 animate-pulse rounded-lg bg-white/70" />
              ))}
            </div>
            <div className="h-20 animate-pulse rounded-lg bg-white/70" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="h-28 animate-pulse rounded-lg bg-white/70" />
              ))}
            </div>
          </>
        ) : (
          <>
            <StatsBar profiles={profiles} />
            <FilterBar filters={filters} cities={cities} religions={religions} onChange={setFilters} />
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onClick={() => router.push(`/dashboard/${profile.id}`)}
                />
              ))}
            </section>
            {!filteredProfiles.length ? (
              <div className="rounded-lg border border-rose/10 bg-white/80 p-10 text-center text-charcoal/60">
                No clients match these filters.
              </div>
            ) : null}
          </>
        )}
      </motion.main>
    </>
  );
}
