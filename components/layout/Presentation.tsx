"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Slide {
  title: string;
  children: React.ReactNode;
}

interface PresentationProps {
  slides: Slide[];
  title?: string; // Optional title for the sidebar
}

export function Presentation({
  slides,
  title = "Presentation",
}: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <div className="w-full lg:w-64 bg-white shadow-md">
        <ScrollArea className="h-full">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            {slides.map((slide, index) => (
              <Button
                key={index}
                variant={currentSlide === index ? "default" : "ghost"}
                className="w-full justify-start mb-2"
                onClick={() => setCurrentSlide(index)}
              >
                {slide.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1 p-4 lg:p-8 overflow-hidden">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{slides[currentSlide].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-[calc(100vh-12rem)] overflow-y-auto pr-4"
              >
                {slides[currentSlide].children}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <Button
          onClick={prevSlide}
          size="icon"
          variant="outline"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          onClick={nextSlide}
          size="icon"
          variant="outline"
          disabled={currentSlide === slides.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
