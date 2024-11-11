import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipData {
  action: string;
  tools: string;
  deliverable: string;
  progressTracking: string;
}

interface TooltipCardProps {
  children: React.ReactNode;
  tooltipData?: TooltipData;
}

export function TooltipCard({ children, tooltipData }: TooltipCardProps) {
  if (!tooltipData) return <>{children}</>;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="w-96 p-4 space-y-2">
          <div>
            <span className="font-bold">Action:</span> {tooltipData.action}
          </div>
          <div>
            <span className="font-bold">Tools:</span> {tooltipData.tools}
          </div>
          <div>
            <span className="font-bold">Deliverable:</span>{" "}
            {tooltipData.deliverable}
          </div>
          <div>
            <span className="font-bold">Progress Tracking:</span>{" "}
            {tooltipData.progressTracking}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 