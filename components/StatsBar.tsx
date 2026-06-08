import { Card, CardContent } from "@/components/ui/card";
import type { Profile } from "@/types/profile";

export function StatsBar({ profiles }: { profiles: Profile[] }) {
  const stats = [
    { label: "Total Clients", value: profiles.length },
    { label: "Active", value: profiles.filter((profile) => profile.statusTag === "Active").length },
    { label: "Matched", value: profiles.filter((profile) => profile.statusTag === "Matched").length },
    { label: "Pending", value: profiles.filter((profile) => profile.statusTag === "Pending").length }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="overflow-hidden">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-charcoal/60">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-burgundy">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
