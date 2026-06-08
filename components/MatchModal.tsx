"use client";

import { Clipboard, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import type { ScoredMatch } from "@/types/profile";

export function MatchModal({
  open,
  loading,
  intro,
  match,
  onClose,
  onSend
}: {
  open: boolean;
  loading: boolean;
  intro: string;
  match: ScoredMatch | null;
  onClose: () => void;
  onSend: () => void;
}) {
  return (
    <Dialog open={open} title={match ? `Intro for ${match.firstName}` : "Generated Intro"} onClose={onClose}>
      {loading ? (
        <div className="flex min-h-48 flex-col items-center justify-center gap-4 text-charcoal/70">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold/30 border-t-burgundy" />
          <p className="text-sm font-medium">Writing a warm, personalized introduction...</p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="whitespace-pre-wrap rounded-lg border border-rose/10 bg-white p-4 text-sm leading-7 text-charcoal">
            {intro}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(intro)}>
              <Clipboard size={16} />
              Copy to Clipboard
            </Button>
            <Button onClick={onSend}>
              <Send size={16} />
              Send Match
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
