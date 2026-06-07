import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function Settings() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold gold-text">Settings</h1>
      <Card className="luxury-card p-8 text-center">
        <p className="text-muted-foreground">Feature page for Settings</p>
      </Card>
    </motion.div>
  );
}
