"use client";

import { Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface MilestoneETAProps {
  eta: {
    min: number;
    max?: number;
  };
}

export function MilestoneETA({ eta }: MilestoneETAProps) {
  const isRange = eta.max && eta.min !== eta.max;
  const etaText = isRange ? `${eta.min}-${eta.max}` : eta.min;

  return (
    <div className="absolute -top-3 -right-2 z-10">
      <HoverCard>
        <HoverCardTrigger>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-flex items-center gap-2"
          >
            <motion.div
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2.5 rounded-xl shadow-lg border border-border/50 backdrop-blur-sm
                        flex items-center gap-2 transition-colors duration-200"
              whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            >
              <Clock className="w-5 h-5" />
              <span className="font-semibold text-base">
                {etaText} {isRange ? "Weeks" : "Week"}
              </span>
            </motion.div>
          </motion.div>
        </HoverCardTrigger>
        <HoverCardContent
          className="w-80 shadow-xl border-border/50 backdrop-blur-sm"
          sideOffset={5}
        >
          <div className="flex gap-3 items-start">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium">
                Estimated Time:{" "}
                <span className="text-primary">{etaText} weeks</span>
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isRange
                  ? "This milestone has a flexible timeline that may be adjusted based on project complexity and specific requirements."
                  : "This milestone has a fixed timeline based on standard project requirements and deliverables."}
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
