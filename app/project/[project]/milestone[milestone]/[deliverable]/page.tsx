import { notFound } from "next/navigation";
import milestoneData from "@/app/data/one-medical-milestones.json";

export default async function DeliverablePage({
  params: paramsPromise,
}: {
  params: Promise<{ project: string; milestone: string; deliverable: string }>;
}) {
  const params = await paramsPromise;

  // Check if the project is valid
  if (params.project !== "one-medical") {
    notFound();
  }

  const milestoneNumber = parseInt(params.milestone);
  if (isNaN(milestoneNumber)) {
    notFound();
  }

  // Find the specific milestone
  const milestone = milestoneData.milestones.find(
    (m) => m.id === milestoneNumber
  );
  if (!milestone) {
    notFound();
  }

  // Check if the deliverable exists in the milestone
  const deliverableExists = milestone.deliverables.some(
    (d) => d.slug === params.deliverable
  );

  if (!deliverableExists) {
    notFound();
  }

  // If we have a specific page for this deliverable, it will be rendered instead
  // Otherwise, this will fall through to the not-found page
  notFound();
}
