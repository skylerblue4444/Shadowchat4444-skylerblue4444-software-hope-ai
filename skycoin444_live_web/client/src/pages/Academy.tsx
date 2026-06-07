import { motion } from "framer-motion";
import { BookOpen, Award, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Academy() {
  const courses = [
    { title: "AI Fundamentals", level: "Beginner", students: "12.4K", progress: 45 },
    { title: "Advanced Trading", level: "Advanced", students: "3.2K", progress: 0 },
    { title: "Creator Masterclass", level: "Intermediate", students: "8.9K", progress: 0 },
    { title: "Blockchain Basics", level: "Beginner", students: "15.6K", progress: 0 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] p-8"
    >
      <h1 className="text-4xl font-bold gold-text mb-8">Academy</h1>

      <div className="space-y-4">
        {courses.map((course, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="luxury-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <BookOpen className="w-8 h-8 gold-text" />
                <div>
                  <h3 className="font-bold">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm gold-text flex items-center gap-1">
                  <Users className="w-4 h-4" /> {course.students}
                </p>
                {course.progress > 0 && (
                  <div className="w-24 h-2 bg-[#FFD700]/20 rounded mt-2">
                    <div className="h-full bg-[#FFD700]" style={{ width: `${course.progress}%` }}></div>
                  </div>
                )}
              </div>
            </div>
            <Button className="luxury-button w-full mt-4">
              {course.progress > 0 ? "Continue" : "Enroll"}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
