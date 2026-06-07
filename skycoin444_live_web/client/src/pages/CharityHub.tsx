import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function CharityHub() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold gold-text">CharityHub</h1>
      <Card className="luxury-card p-8 text-center">
        <p className="text-muted-foreground">Feature page for CharityHub</p>
      </Card>
    </motion.div>
  );
}
