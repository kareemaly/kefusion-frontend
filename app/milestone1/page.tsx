"use client";

import { Presentation } from "@/components/layout/Presentation";
import { Card } from "@/components/ui/card";

const milestoneSlides = [
  {
    title: "One Medical Dashboard",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">One Medical Dashboard</h3>
        <p className="text-gray-600">Dashboard implementation and setup</p>
      </Card>
    ),
  },
  {
    title: "Business Market Research",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Business Market Research</h3>
        <p className="text-gray-600">Dashboard for market research analysis</p>
      </Card>
    ),
  },
  {
    title: "Competition Analysis",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Competition Analysis</h3>
        <p className="text-gray-600">Dashboard for competitor analysis</p>
      </Card>
    ),
  },
  {
    title: "Setup Access & Agreement",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Setup Access & Agreement</h3>
        <p className="text-gray-600">Access and agreement configuration</p>
      </Card>
    ),
  },
  {
    title: "One Medical Admin Access",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">One Medical Admin Access</h3>
        <p className="text-gray-600">Dashboard admin access setup</p>
      </Card>
    ),
  },
  {
    title: "Optimize Content for SEO",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Optimize Content for SEO</h3>
        <p className="text-gray-600">Website SEO optimization</p>
      </Card>
    ),
  },
  {
    title: "Setup Google Business Profile",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">
          Setup Google Business Profile
        </h3>
        <p className="text-gray-600">Google Business Profile configuration</p>
      </Card>
    ),
  },
  {
    title: "Social Media Posts",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Social Media Posts</h3>
        <p className="text-gray-600">20 Posts for Instagram and Facebook</p>
      </Card>
    ),
  },
  {
    title: "Google Event Integration",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Google Event Integration</h3>
        <p className="text-gray-600">
          Website and Google event/pixel integration
        </p>
      </Card>
    ),
  },
  {
    title: "Meta Event Integration",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Meta Event Integration</h3>
        <p className="text-gray-600">
          Website and Meta event/pixel integration
        </p>
      </Card>
    ),
  },
  {
    title: "Report Generation",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Report Generation</h3>
        <p className="text-gray-600">
          Dashboard report generation for last year
        </p>
      </Card>
    ),
  },
  {
    title: "Implementation Plan",
    children: (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Implementation Plan</h3>
        <p className="text-gray-600">
          One Medical Journey with KEFusion (Milestones)
        </p>
      </Card>
    ),
  },
];

export default function Milestone1Page() {
  return (
    <Presentation slides={milestoneSlides} title="One Medical Milestones" />
  );
}
