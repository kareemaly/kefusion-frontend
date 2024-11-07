import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="container mx-auto max-w-7xl space-y-8 py-6">{children}</div>
  );
}
