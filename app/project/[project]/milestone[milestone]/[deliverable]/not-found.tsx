"use client";

import { motion } from "framer-motion";
import { Construction, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function DeliverableNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
            >
              <Construction className="w-8 h-8 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl sm:text-3xl">
              Deliverable In Progress
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground"
            >
              This deliverable is currently under development. Our team is
              working hard to bring you the best possible experience.
            </motion.p>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => router.push("/project/one-medical/milestones")}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
