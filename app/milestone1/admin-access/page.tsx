"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, User, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminAccessPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication
    console.log("Credentials submitted:", credentials);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="flex min-h-[calc(100vh-2rem)]"
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      {/* Left side - Login Form */}
      <motion.div
        className="flex w-full items-center justify-center px-4 lg:w-1/2"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-lg relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <CardHeader className="space-y-4 relative">
            <motion.div
              className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.div className="space-y-2 text-center" variants={fadeIn}>
              <CardTitle className="text-2xl font-bold">
                One Medical Dashboard
              </CardTitle>
              <CardDescription>
                Sign in to access your team's customized dashboard
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="relative">
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div className="space-y-4" variants={staggerChildren}>
                <motion.div
                  className="relative"
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Username"
                    className="pl-10"
                    value={credentials.username}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                  />
                </motion.div>
                <motion.div
                  className="relative"
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                </motion.div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </motion.div>
              <motion.div
                className="text-center text-sm text-muted-foreground"
                variants={fadeIn}
              >
                Need access?{" "}
                <a href="#" className="text-primary hover:underline">
                  Contact support
                </a>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right side - Deliverable Details */}
      <motion.div
        className="hidden lg:flex w-1/2 bg-muted/30 p-8 items-center justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-lg space-y-6">
          <motion.h2
            className="text-2xl font-bold tracking-tight"
            variants={fadeIn}
          >
            Admin Dashboard Access
          </motion.h2>
          <motion.div
            className="space-y-4 text-muted-foreground"
            variants={staggerChildren}
          >
            <motion.p variants={fadeIn}>
              This authentication system is part of the One Medical dashboard
              deliverable, featuring:
            </motion.p>
            <motion.ul
              className="space-y-2 list-disc list-inside"
              variants={staggerChildren}
            >
              {[
                "Secure username/password authentication",
                "Modern, responsive UI built with shadcn/ui components",
                "Role-based access control for team members",
                "Seamless integration with existing systems",
                "Password recovery and account management",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={fadeIn}
                  custom={index}
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
            <motion.p
              className="text-sm border-l-2 border-primary/50 pl-4 italic"
              variants={fadeIn}
              whileHover={{ x: 5 }}
            >
              "Our goal is to provide a secure yet user-friendly access point to
              your customized dashboard, ensuring your team can efficiently
              manage and monitor all aspects of your medical practice."
            </motion.p>
          </motion.div>
          <motion.div className="pt-4" variants={fadeIn}>
            <p className="text-sm text-muted-foreground">
              Built with modern security practices and an intuitive user
              interface, this system balances robust protection with ease of
              use.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
