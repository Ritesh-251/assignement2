"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const VALID_EMAIL = "matchmaker@tdc.com";
const VALID_PASSWORD = "password123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.replace("/dashboard");
    }
  }, [router]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
      return;
    }
    setError("Those credentials do not match a TDC matchmaker account.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Card className="border-gold/25 bg-white/88">
          <CardContent className="p-7">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-burgundy text-white">
                <HeartHandshake size={28} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">TDC Matchmaking</p>
              <h1 className="mt-2 text-3xl font-semibold text-burgundy">Matchmaker Login</h1>
              <p className="mt-2 text-sm text-charcoal/60">A private workspace for thoughtful introductions.</p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">Email</label>
                <Input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-charcoal">Password</label>
                <Input value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
              </div>
              {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
              <Button className="w-full" type="submit">
                Enter Dashboard
              </Button>
            </form>

            <div className="mt-6 rounded-lg border border-rose/10 bg-cream/70 p-3 text-xs leading-6 text-charcoal/60">
              <p>Demo email: matchmaker@tdc.com</p>
              <p>Demo password: password123</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
