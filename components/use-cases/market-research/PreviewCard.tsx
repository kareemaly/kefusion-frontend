import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface PreviewCardProps {
  title: string;
  icon: LucideIcon;
  imageUrl: string;
}

export function PreviewCard({ title, icon: Icon, imageUrl }: PreviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <img
          src={imageUrl}
          alt={`${title} Preview`}
          className="w-full h-auto"
        />
      </CardContent>
    </Card>
  );
}
