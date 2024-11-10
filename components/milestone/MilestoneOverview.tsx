"use client";

import { useRouter } from "next/navigation";
import { CheckCircle, AlertCircle, Circle, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DeliverableSkeleton } from "./DeliverableSkeleton";
import { MilestoneETA } from "./MilestoneETA";

export interface Deliverable {
  title?: string;
  status: "complete" | "blocker" | "pending" | "in_progress";
  icon: LucideIcon;
  slug: string;
  description?: string;
}

export interface MilestoneOverviewProps {
  title: string;
  progress: number;
  deliverables: Deliverable[];
  basePath?: string;
  isLoading?: boolean;
  skeletonCount?: number;
  milestoneNumber: number;
  eta: {
    min: number;
    max?: number;
  };
}

export function MilestoneOverview({
  title,
  progress,
  deliverables,
  basePath = "",
  isLoading = false,
  skeletonCount = 6,
  milestoneNumber,
  eta,
}: MilestoneOverviewProps) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-success";
      case "blocker":
        return "text-muted-foreground";
      case "in_progress":
        return "text-primary";
      case "pending":
        return "text-muted-foreground";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-5 w-5" />;
      case "blocker":
        return <AlertCircle className="h-5 w-5" />;
      case "in_progress":
        return <Circle className="h-5 w-5 animate-pulse" />;
      case "pending":
        return <Circle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "in_progress":
        return "In Progress";
      case "complete":
        return "Complete";
      case "blocker":
        return "Blocker";
      case "pending":
        return "Pending";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const handleDeliverableClick = (slug: string) => {
    router.push(`${basePath}/${slug}`);
  };

  const renderDeliverable = (deliverable: Deliverable, index: number) => {
    if (!deliverable.title && !deliverable.description) {
      return <DeliverableSkeleton key={index} />;
    }

    const IconComponent = deliverable.icon;

    return (
      <Button
        key={index}
        variant="outline"
        className={`w-full min-h-[120px] p-4 flex flex-col justify-between
          ${
            deliverable.status === "complete"
              ? "bg-success-muted border-success/20"
              : deliverable.status === "pending"
              ? "bg-muted border-border"
              : deliverable.status === "in_progress"
              ? "bg-primary/5 border-primary/20"
              : "bg-card border-border"
          }
          ${
            deliverable.status === "blocker"
              ? "bg-muted border-muted-foreground/20"
              : ""
          }
          transition-all duration-200
          shadow-sm hover:shadow-md
          relative
          group
          hover:bg-muted/50
        `}
        onClick={() => handleDeliverableClick(deliverable.slug)}
      >
        <div className="flex items-start text-left space-x-4 w-full">
          <IconComponent
            className={`h-10 w-10 flex-shrink-0 ${
              deliverable.status === "complete"
                ? "text-success"
                : deliverable.status === "blocker"
                ? "text-danger"
                : "text-primary"
            }`}
          />
          <div className="flex flex-col flex-grow pr-8">
            {deliverable.title ? (
              <span
                className={`font-semibold text-lg leading-tight ${
                  deliverable.status === "complete"
                    ? "text-success-foreground"
                    : deliverable.status === "blocker"
                    ? "text-danger-foreground"
                    : "text-card-foreground"
                }`}
              >
                {deliverable.title}
              </span>
            ) : (
              <div className="h-6 w-3/4 bg-muted rounded animate-pulse mb-2" />
            )}

            {deliverable.description ? (
              <span className="text-sm text-muted-foreground mt-1 break-words whitespace-normal">
                {deliverable.description}
              </span>
            ) : (
              <div className="space-y-2 mt-1">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center space-x-1.5
              ${
                deliverable.status === "complete"
                  ? "bg-success-muted text-success-foreground"
                  : deliverable.status === "blocker"
                  ? "bg-danger-muted text-danger-foreground"
                  : deliverable.status === "in_progress"
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }
            `}
          >
            <span>{getStatusDisplay(deliverable.status)}</span>
            <span className="flex items-center">
              {getStatusIcon(deliverable.status)}
            </span>
          </span>
        </div>

        <div
          className={`absolute inset-0 rounded-lg transition-all duration-200`}
        />
      </Button>
    );
  };

  if (isLoading) {
    return (
      <Card className="w-full relative overflow-hidden">
        <div className="absolute -left-8 top-0 w-32 h-32 opacity-5">
          <div className="w-full h-full flex items-center justify-center text-[80px] font-bold rotate-[-12deg]">
            {milestoneNumber}
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center gap-6">
            {/* Milestone number skeleton */}
            <div className="w-16 h-16 rounded-full bg-muted animate-pulse flex-shrink-0" />

            <div className="flex-grow">
              <CardTitle className="text-2xl flex justify-between items-center">
                <div className="h-8 w-1/3 bg-muted rounded animate-pulse" />
                <div className="h-6 w-24 bg-muted rounded animate-pulse" />
              </CardTitle>
              <div className="mt-2 h-4 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-7 w-32 bg-muted rounded animate-pulse mb-4" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <DeliverableSkeleton key={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full relative overflow-visible">
      <CardHeader>
        <div className="flex items-center justify-between relative pt-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl">
              Milestone {milestoneNumber}: {title}
            </CardTitle>
            <div className="flex items-center gap-4">
              <Progress value={progress} className="w-[60%]" />
              <span className="text-sm text-muted-foreground">
                {progress}% complete
              </span>
            </div>
          </div>
          <MilestoneETA eta={eta} />
        </div>
      </CardHeader>

      <CardContent>
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">
          Deliverables
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((deliverable, index) =>
            renderDeliverable(deliverable, index)
          )}
        </div>
      </CardContent>
    </Card>
  );
}
