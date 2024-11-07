import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Technology {
  id: string;
  name: string;
  imageUrl: string;
}

interface TechnologiesGridProps {
  technologies: Technology[];
}

export function TechnologiesGrid({ technologies }: TechnologiesGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technologies Used</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {technologies.map((tech) => (
            <div key={tech.id} className="flex items-center space-x-2">
              <img src={tech.imageUrl} alt={tech.name} className="w-8 h-8" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
