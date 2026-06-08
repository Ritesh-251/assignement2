"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { calculateAge, getDisplayPhoto, getStatusColor } from "@/lib/utils";
import type { Profile } from "@/types/profile";

export function ProfileCard({ profile, onClick }: { profile: Profile; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="text-left"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
    >
      <Card className="h-full overflow-hidden transition hover:border-gold/40">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Image
              src={getDisplayPhoto(profile)}
              alt={`${profile.firstName} ${profile.lastName}`}
              width={70}
              height={70}
              className="h-[70px] w-[70px] rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="truncate text-base font-semibold text-charcoal">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="mt-1 text-sm text-charcoal/60">
                    {calculateAge(profile.dateOfBirth)} • {profile.city}
                  </p>
                </div>
                <Badge className={getStatusColor(profile.statusTag)}>{profile.statusTag}</Badge>
              </div>
              <p className="mt-3 text-sm text-charcoal/70">{profile.maritalStatus}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.button>
  );
}
