"use client";

import Image from "next/image";
import { Mail, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateAge, getDisplayPhoto } from "@/lib/utils";
import type { Profile, ScoredMatch } from "@/types/profile";

function scoreLabel(score: number) {
  if (score >= 80) return { text: "High Potential", className: "bg-emerald-100 text-emerald-800 border-emerald-200" };
  if (score >= 60) return { text: "Good Match", className: "bg-amber-100 text-amber-800 border-amber-200" };
  return { text: "Possible Match", className: "bg-orange-100 text-orange-800 border-orange-200" };
}

export function MatchCard({
  customer,
  match,
  onGenerateIntro,
  onSend
}: {
  customer: Profile;
  match: ScoredMatch;
  onGenerateIntro: (customer: Profile, match: ScoredMatch) => void;
  onSend: (match: ScoredMatch) => void;
}) {
  const label = scoreLabel(match.score);

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start">
          <Image
            src={getDisplayPhoto(match)}
            alt={`${match.firstName} ${match.lastName}`}
            width={88}
            height={88}
            className="h-[88px] w-[88px] rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-charcoal">
                  {match.firstName} {match.lastName}
                </h3>
                <p className="mt-1 text-sm text-charcoal/65">
                  {calculateAge(match.dateOfBirth)} • {match.city} • {match.designation}
                </p>
              </div>
              <Badge className={label.className}>{label.text}</Badge>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Progress value={match.score} />
              <span className="w-14 text-right text-sm font-semibold text-burgundy">{match.score}/100</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {match.matchedCriteria.map((criterion) => (
                <Badge key={criterion} className="border-gold/30 bg-gold/10 text-charcoal">
                  ✓ {criterion}
                </Badge>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => onGenerateIntro(customer, match)}>
                <Mail size={16} />
                Generate Intro
              </Button>
              <Button variant="secondary" onClick={() => onSend(match)}>
                <Send size={16} />
                Send Match
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
