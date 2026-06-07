import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function ITServices() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold gold-text">ITServices</h1>
      <Card className="luxury-card p-8 text-center">
        <p className="text-muted-foreground">Feature page for ITServices</p>
      </Card>
    </motion.div>
  );
}
