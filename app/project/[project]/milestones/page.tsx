"use client";

import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MilestoneOverview,
  type Deliverable,
} from "@/components/milestone/MilestoneOverview";
import milestoneData from "@/app/data/one-medical-milestones.json";

// Create an icon mapping function
const getIconComponent = (iconName: string) => {
  // @ts-ignore - LucideIcons contains all icons
  const Icon = LucideIcons[iconName];
  return Icon || LucideIcons.FileText; // Default to FileText if icon not found
};

export default function OneMedicalMilestone() {
  // Map the JSON data to include isLoading property and convert icon strings to components
  const milestones = milestoneData.milestones.map((milestone) => ({
    id: milestone.id,
    isLoading: false,
    data: {
      ...milestone,
      deliverables: milestone.deliverables.map((deliverable) => ({
        ...deliverable,
        icon: getIconComponent(deliverable.icon),
        status: deliverable.status as "pending" | "complete" | "blocker",
      })),
    },
  }));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <ScrollArea className="h-[calc(100vh-2rem)] px-4">
      <div className="container mx-auto py-8 space-y-6">
        <header className="text-center mb-12 space-y-2">
          <h1 className="text-3xl font-bold text-primary">
            One Medical Project Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Project Milestones Overview
          </p>
        </header>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {milestones.map((milestone) => (
            <motion.div key={milestone.id} variants={item} className="w-full">
              <MilestoneOverview
                title={milestone.data.title}
                subHeading={milestone.data.subHeading}
                progress={milestone.data.progress}
                deliverables={milestone.data.deliverables}
                basePath={`/project/one-medical/milestone${milestone.id}`}
                isLoading={milestone.isLoading}
                skeletonCount={6}
                milestoneNumber={milestone.id}
                eta={milestone.data.eta}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollArea>
  );
}
