"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Users,
  Settings,
  FileText,
  Instagram,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MilestoneOverview,
  type Deliverable,
} from "@/components/milestone/MilestoneOverview";

export default function OneMedicalMilestone() {
  const milestone1 = {
    title: "One Medical Milestone",
    progress: 25,
    deliverables: [
      {
        title: "Business Market Research",
        status: "complete" as const,
        icon: Search,
        slug: "market-research",
        description: "Comprehensive analysis of the medical business market",
      },
      {
        title: "Competition Analysis",
        status: "complete" as const,
        icon: Users,
        slug: "competition-analysis",
        description: "Analysis of competitors in the medical space",
      },
      {
        title: "Setup Access & Agreement",
        status: "blocker" as const,
        icon: Settings,
        slug: "setup-access",
        description: "Setting up necessary access and agreements",
      },
      {
        title: "One Medical Admin Access",
        status: "pending" as const,
        icon: Settings,
        slug: "admin-access",
        description: "Administrative access setup for One Medical",
      },
      {
        title: "Optimize Content for SEO",
        status: "pending" as const,
        icon: FileText,
        slug: "seo-optimization",
        description: "SEO optimization for better visibility",
      },
      {
        title: "Setup Google Business Profile",
        status: "pending" as const,
        icon: Search,
        slug: "google-business",
        description: "Google Business Profile setup and optimization",
      },
      {
        title: "Social Media Posts",
        status: "pending" as const,
        icon: Instagram,
        slug: "social-media",
        description: "Social media strategy and content planning",
      },
      {
        title: "Google Event Integration",
        status: "pending" as const,
        icon: Calendar,
        slug: "google-events",
        description: "Integration with Google Events platform",
      },
      {
        title: "Meta Event Integration",
        status: "pending" as const,
        icon: Calendar,
        slug: "meta-events",
        description: "Integration with Meta Events platform",
      },
      {
        title: "Report Generation",
        status: "pending" as const,
        icon: FileText,
        slug: "reports",
        description: "Automated report generation system",
      },
      {
        title: "Implementation Plan",
        status: "pending" as const,
        icon: FileText,
        slug: "implementation",
        description: "Detailed implementation strategy and timeline",
      },
    ],
  };

  const milestone2 = {
    title: "Test Campaigns and Evaluation Milestone",
    deliverables: [
      {
        title: "Meta Ads Campaign",
        status: "pending" as const,
        icon: FileText,
        slug: "meta-ads",
        description: "Setup and launch test campaigns on Meta Ads platform",
      },
      {
        title: "Google Ads Campaign",
        status: "pending" as const,
        icon: Search,
        slug: "google-ads",
        description: "Setup and launch test campaigns on Google Ads platform",
      },
      // Rest of the deliverables will be undefined to show skeleton
      ...Array.from({ length: 4 }, (_, i) => ({
        title: undefined,
        status: "pending" as const,
        icon: FileText,
        slug: `deliverable-${i + 3}`,
        description: undefined,
      })),
    ],
  };

  // Create an array of 6 milestones (2 real + 4 loading)
  const milestones = [
    {
      id: 1,
      isLoading: false,
      data: milestone1,
    },
    {
      id: 2,
      isLoading: false,
      data: milestone2,
    },
    ...Array.from({ length: 8 }, (_, i) => ({
      id: i + 3,
      isLoading: true,
      data: {
        title: `Milestone ${i + 3}`,
        progress: 0,
        deliverables: Array.from({ length: 6 }, (_, j) => ({
          title: `Deliverable ${j + 1}`,
          status: "pending" as const,
          icon: FileText,
          slug: `deliverable-${j + 1}`,
          description: "Loading...",
        })),
      },
    })),
  ];

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
                progress={
                  /* @ts-ignore */
                  milestone.id === 2 ? undefined : milestone.data.progress
                }
                deliverables={
                  milestone.id === 2
                    ? milestone.data.deliverables.map((d, i) => ({
                        ...d,
                        title: i < 2 ? d.title : undefined,
                        description: i < 2 ? d.description : undefined,
                      }))
                    : milestone.data.deliverables
                }
                basePath={`/milestone${milestone.id}`}
                isLoading={milestone.isLoading}
                skeletonCount={6}
                milestoneNumber={milestone.id}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollArea>
  );
}
