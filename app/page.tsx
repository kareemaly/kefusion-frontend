"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart, Users, Zap, ChevronRight } from "lucide-react";

export default function IntroductionPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    {
      icon: BarChart3,
      title: "Behavioral Data Collection",
      description:
        "Integrate and analyze data from multiple sources for a 360-degree view of customer behavior.",
    },
    {
      icon: Users,
      title: "Dynamic Persona Creation",
      description:
        "Automatically generate and update customer personas based on real-time data and insights.",
    },
    {
      icon: Zap,
      title: "Personalized Messaging",
      description:
        "Deliver tailored content and product offerings to increase engagement and conversions.",
    },
    {
      icon: LineChart,
      title: "Visual Dashboard",
      description:
        "Access intuitive visualizations and key metrics for data-driven decision making.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">KEFUSION</h1>
            <div className="space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Contact</Button>
              <Button variant="secondary">Get Started</Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-primary/90 to-background py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
              Revolutionize Your Digital Marketing with AI
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/80">
              KEFUSION empowers businesses with cutting-edge AI-driven insights
              and persona-driven strategies for optimized marketing performance.
            </p>
            <Button size="lg" className="mr-4">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </motion.div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              Our Journey
            </h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-muted-foreground/20"></div>
              {[
                {
                  year: 2021,
                  title: "KEFUSION Launch",
                  description: "Founded in UAE, Ras Al Khaimah",
                },
                {
                  year: 2022,
                  title: "Rapid Growth",
                  description: "Achieved 500+ business clients",
                },
                {
                  year: 2023,
                  title: "Innovation Milestone",
                  description: "Launched AI-powered persona creation",
                },
                {
                  year: 2024,
                  title: "Market Leader",
                  description: "Recognized as a pioneer in MENA region",
                },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`flex items-center mb-8 ${
                    index % 2 === 0 ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "text-right pr-8" : "pl-8"
                    }`}
                  >
                    <h4 className="text-xl font-bold">{milestone.title}</h4>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center z-10">
                    <span className="text-accent-foreground font-bold">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: activeFeature === index ? 1 : 0.5,
                      y: 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`mb-6 cursor-pointer ${
                      activeFeature === index ? "scale-105" : ""
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <feature.icon className="w-6 h-6 mr-2 text-accent" />
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div className="relative h-[400px]">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: activeFeature === index ? 1 : 0,
                      scale: activeFeature === index ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-64 h-64 text-accent opacity-80" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              What Our Clients Say
            </h3>
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tab1">
                  Digital Marketing Manager
                </TabsTrigger>
                <TabsTrigger value="tab2">Content Strategist</TabsTrigger>
                <TabsTrigger value="tab3">Business Analyst</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <Card>
                  <CardHeader>
                    <CardTitle>Increased Conversion Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      "KEFUSION has transformed our marketing strategy. We've
                      seen a 15% increase in conversion rates using their
                      personalized campaign features."
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tab2">
                <Card>
                  <CardHeader>
                    <CardTitle>Efficient Content Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      "The insights provided by KEFUSION have allowed us to
                      create more engaging content, resulting in a 50%
                      improvement in user engagement."
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tab3">
                <Card>
                  <CardHeader>
                    <CardTitle>Predictive Insights for Cross-Selling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      "KEFUSION's predictive analytics have significantly
                      improved our cross-selling efforts. We've seen a 30%
                      increase in upsell opportunities."
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-20 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Transform Your Digital Marketing?
            </h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join 500+ businesses already using KEFUSION to drive growth and
              engagement.
            </p>
            <Button size="lg" variant="secondary" className="mr-4">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent-foreground/20 hover:bg-accent-foreground/10"
            >
              Schedule a Demo
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted/30 text-muted-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">KEFUSION</h4>
              <p>AI-driven digital marketing insights and personalization</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Features</h5>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-accent transition-colors">
                      {feature.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Company</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Connect</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-muted-foreground/10 text-center">
            <p>
              &copy; 2024 KEFUSION by KE Software Consultancy. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
