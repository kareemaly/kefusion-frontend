import { notFound } from "next/navigation";
import milestoneData from "@/app/data/one-medical-milestones.json";

export default async function DeliverablePage({
  params: paramsPromise,
}: {
  params: Promise<{ project: string; deliverable: string }>;
}) {
  const params = await paramsPromise;
  // Check if the project is valid
  if (params.project !== "one-medical") {
    notFound();
  }

  // Check if the deliverable exists in any milestone
  const deliverableExists = milestoneData.milestones.some((milestone) =>
    milestone.deliverables.some((d) => d.slug === params.deliverable)
  );

  if (!deliverableExists) {
    notFound();
  }

  // If we have a specific page for this deliverable, it will be rendered instead
  // Otherwise, this will fall through to the not-found page
  notFound();
}
