"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { MatchCard } from "@/components/MatchCard";
import { MatchModal } from "@/components/MatchModal";
import { NotesPanel } from "@/components/NotesPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import profilesData from "@/data/profiles.json";
import { getMatches } from "@/lib/matchingEngine";
import { calculateAge, formatIncome, getDisplayPhoto, getStatusColor } from "@/lib/utils";
import type { Profile, ScoredMatch, StatusTag } from "@/types/profile";

type Tab = "profile" | "matches" | "notes";

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-lg border border-rose/10 bg-white/70 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/45">{label}</p>
      <div className="mt-1 text-sm font-medium text-charcoal">{value}</div>
    </div>
  );
}

function Section({
  title,
  children,
  full = false
}: {
  title: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <Card className={full ? "lg:col-span-2" : ""}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">{children}</CardContent>
    </Card>
  );
}

export default function DetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>("profile");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [customer, setCustomer] = useState<Profile | null>(null);
  const [toast, setToast] = useState("");
  const [confirmMatch, setConfirmMatch] = useState<ScoredMatch | null>(null);
  const [modalMatch, setModalMatch] = useState<ScoredMatch | null>(null);
  const [intro, setIntro] = useState("");
  const [introLoading, setIntroLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
    setProfiles(merged);
    setCustomer(merged.find((profile) => profile.id === params.id) ?? null);
  }, [params.id, router]);

  const matches = useMemo(() => (customer ? getMatches(customer, profiles) : []), [customer, profiles]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function updateStatus(statusTag: StatusTag) {
    if (!customer) return;
    const next = { ...customer, statusTag };
    const statusMap = JSON.parse(localStorage.getItem("tdc-status-map") ?? "{}") as Record<string, StatusTag>;
    statusMap[customer.id] = statusTag;
    localStorage.setItem("tdc-status-map", JSON.stringify(statusMap));
    setCustomer(next);
    setProfiles((items) => items.map((item) => (item.id === next.id ? next : item)));
    showToast("Status updated.");
  }

  async function generateIntro(profile: Profile, match: ScoredMatch) {
    setModalMatch(match);
    setModalOpen(true);
    setIntroLoading(true);
    setIntro("");

    const response = await fetch("/api/generate-intro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: { ...profile, age: calculateAge(profile.dateOfBirth) },
        match
      })
    });
    const data = (await response.json()) as { intro: string };
    setIntro(data.intro);
    setIntroLoading(false);
  }

  function sendMatch(match: ScoredMatch | null) {
    if (!match) return;
    setConfirmMatch(null);
    setModalOpen(false);
    showToast(`Match sent to ${match.firstName}!`);
  }

  if (!customer) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 text-center text-charcoal/60">Loading customer profile...</CardContent>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <motion.main
        className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button variant="ghost" onClick={() => router.push("/dashboard")}>
          <ArrowLeft size={17} />
          Back to dashboard
        </Button>

        <section className="flex flex-col gap-5 rounded-lg border border-rose/10 bg-white/82 p-5 shadow-premium md:flex-row md:items-center">
          <Image
            src={getDisplayPhoto(customer)}
            alt={`${customer.firstName} ${customer.lastName}`}
            width={112}
            height={112}
            className="h-28 w-28 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-burgundy">
                  {customer.firstName} {customer.lastName}
                </h1>
                <p className="mt-2 text-charcoal/65">
                  {calculateAge(customer.dateOfBirth)} • {customer.city} • {customer.designation}
                </p>
              </div>
              <Badge className={getStatusColor(customer.statusTag)}>{customer.statusTag}</Badge>
            </div>
            <div className="mt-4 max-w-xs">
              <Select value={customer.statusTag} onChange={(event) => updateStatus(event.target.value as StatusTag)}>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Matched">Matched</option>
                <option value="Paused">Paused</option>
              </Select>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-2 rounded-lg border border-rose/10 bg-white/70 p-2">
          {(["profile", "matches", "notes"] as Tab[]).map((item) => (
            <Button key={item} variant={tab === item ? "primary" : "ghost"} onClick={() => setTab(item)}>
              {item === "profile" ? "Profile" : item === "matches" ? "Matches" : "Notes"}
            </Button>
          ))}
        </div>

        {tab === "profile" ? (
          <section className="grid gap-5 lg:grid-cols-2">
            <Section title="Personal Info">
              <Field label="Name" value={`${customer.firstName} ${customer.lastName}`} />
              <Field label="Gender" value={customer.gender} />
              <Field label="Date of Birth" value={customer.dateOfBirth} />
              <Field label="Age" value={calculateAge(customer.dateOfBirth)} />
              <Field label="Religion" value={customer.religion} />
              <Field label="Caste" value={customer.caste} />
              <Field label="Mother Tongue" value={customer.motherTongue} />
              <Field label="Manglik" value={customer.manglik} />
            </Section>
            <Section title="Contact">
              <Field label="Email" value={customer.email} />
              <Field label="Phone" value={customer.phone} />
            </Section>
            <Section title="Location">
              <Field label="Country" value={customer.country} />
              <Field label="City" value={customer.city} />
              <Field label="Open to Relocate" value={customer.openToRelocate} />
            </Section>
            <Section title="Physical">
              <Field label="Height" value={`${customer.height} cm`} />
              <Field label="Diet" value={customer.diet} />
              <Field label="Smoking" value={customer.smokingHabits} />
              <Field label="Drinking" value={customer.drinkingHabits} />
            </Section>
            <Section title="Education & Career">
              <Field label="College" value={customer.undergraduateCollege} />
              <Field label="Degree" value={customer.degree} />
              <Field label="Company" value={customer.currentCompany} />
              <Field label="Designation" value={customer.designation} />
              <Field label="Income" value={formatIncome(customer.income)} />
            </Section>
            <Section title="Family">
              <Field label="Family Type" value={customer.familyType} />
              <Field label="Family Values" value={customer.familyValues} />
              <Field label="Father" value={customer.fatherOccupation} />
              <Field label="Mother" value={customer.motherOccupation} />
              <Field label="Family Income" value={formatIncome(customer.annualFamilyIncome)} />
              <Field label="Siblings" value={customer.siblings} />
            </Section>
            <Section title="Preferences">
              <Field label="Want Kids" value={customer.wantKids} />
              <Field label="Open to Pets" value={customer.openToPets} />
              <Field label="Languages" value={customer.languagesKnown.join(", ")} />
              <Field label="Hobbies" value={customer.hobbies.join(", ")} />
            </Section>
            <Section title="About Me" full>
              <div className="sm:col-span-2">
                <p className="rounded-lg border border-rose/10 bg-white/70 p-4 text-sm leading-7 text-charcoal/75">
                  {customer.aboutMe}
                </p>
              </div>
            </Section>
          </section>
        ) : null}

        {tab === "matches" ? (
          <section className="space-y-4">
            {matches.length ? (
              matches.map((match) => (
                <MatchCard
                  key={match.id}
                  customer={customer}
                  match={match}
                  onGenerateIntro={generateIntro}
                  onSend={setConfirmMatch}
                />
              ))
            ) : (
              <Card>
                <CardContent className="p-10 text-center text-charcoal/60">
                  No matches above the compatibility threshold yet.
                </CardContent>
              </Card>
            )}
          </section>
        ) : null}

        {tab === "notes" ? <NotesPanel customerId={customer.id} /> : null}
      </motion.main>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-800 shadow-premium">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      ) : null}

      <Dialog open={Boolean(confirmMatch)} title="Send this match?" onClose={() => setConfirmMatch(null)}>
        <p className="text-sm leading-6 text-charcoal/70">
          Confirm sending this match recommendation to {confirmMatch?.firstName} {confirmMatch?.lastName}.
        </p>
        <div className="mt-5 flex gap-3">
          <Button onClick={() => sendMatch(confirmMatch)}>Send Match</Button>
          <Button variant="outline" onClick={() => setConfirmMatch(null)}>
            Cancel
          </Button>
        </div>
      </Dialog>

      <MatchModal
        open={modalOpen}
        loading={introLoading}
        intro={intro}
        match={modalMatch}
        onClose={() => setModalOpen(false)}
        onSend={() => sendMatch(modalMatch)}
      />
    </>
  );
}
