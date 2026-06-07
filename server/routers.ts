import { router } from "./_core/trpc";
import { skycoin4444Router } from "./routers/skycoin4444-core";
import { impactRouter } from "./routers/impact-engine";
import { hopeNeuralRouter } from "./routers/hope-ai-neural";
import { hopeAIRouter } from "./routers/hope-ai";
import { marketplaceRouter } from "./routers/marketplace";
import { socialRouter } from "./routers/social";
import { cryptoRouter } from "./routers/crypto";
import { swarmRouter } from "./routers/swarm";
import { engineerRouter } from "./routers/engineer-dev-mode";

export const appRouter = router({
  skycoin4444: skycoin4444Router,
  impact: impactRouter,
  neural: hopeNeuralRouter,
  hopeAI: hopeAIRouter,
  marketplace: marketplaceRouter,
  social: socialRouter,
  crypto: cryptoRouter,
  swarm: swarmRouter,
  engineer: engineerRouter,
});

export type AppRouter = typeof appRouter;
