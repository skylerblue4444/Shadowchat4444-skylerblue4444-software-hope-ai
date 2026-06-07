import { motion } from "framer-motion";
import { Briefcase, BarChart3, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CreatorEmpire() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] p-8"
    >
      <h1 className="text-4xl font-bold gold-text mb-8">Creator Empire</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="luxury-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-bold gold-text">$45,230</p>
            </div>
            <BarChart3 className="w-8 h-8 gold-text" />
          </div>
        </Card>
        <Card className="luxury-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Followers</p>
              <p className="text-3xl font-bold gold-text">12.4K</p>
            </div>
            <Users className="w-8 h-8 gold-text" />
          </div>
        </Card>
        <Card className="luxury-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Active Products</p>
              <p className="text-3xl font-bold gold-text">8</p>
            </div>
            <Briefcase className="w-8 h-8 gold-text" />
          </div>
        </Card>
      </div>

      <Card className="luxury-card">
        <h2 className="text-xl font-bold gold-text mb-4">Creator Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="luxury-button">Launch Product</Button>
          <Button variant="outline" className="gold-border">View Analytics</Button>
          <Button variant="outline" className="gold-border">Manage Customers</Button>
          <Button variant="outline" className="gold-border">Create Course</Button>
        </div>
      </Card>
    </motion.div>
  );
}
