"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function NotesPanel({ customerId }: { customerId: string }) {
  const storageKey = `tdc-notes-${customerId}`;
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");

  useEffect(() => {
    const existing = localStorage.getItem(storageKey) ?? "";
    setNote(existing);
    setSavedNote(existing);
  }, [storageKey]);

  function saveNote() {
    localStorage.setItem(storageKey, note);
    setSavedNote(note);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>Matchmaker Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Add context, preferences, family conversations, or follow-up items..."
          />
          <Button className="mt-4" onClick={saveNote}>
            Save Note
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Saved Notes</CardTitle>
        </CardHeader>
        <CardContent>
          {savedNote ? (
            <p className="whitespace-pre-wrap text-sm leading-7 text-charcoal/75">{savedNote}</p>
          ) : (
            <p className="text-sm text-charcoal/55">No notes saved for this customer yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
