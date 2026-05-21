import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { setupChat } from './chat/chat.server.js';
import authRoutes from './auth/auth.routes.js';
import socialRoutes from './social/social.routes.js';
import cryptoRoutes from './crypto/crypto.routes.js';
import marketplaceRoutes from './marketplace/marketplace.routes.js';
import stripeRoutes from './stripe/stripe.routes.js';
import aiRoutes from './ai/ai.routes.js';
import adminRoutes from './admin/admin.routes.js';
import notificationRoutes from './notifications/notifications.routes.js';
import chatRoutes from './chat/chat.routes.js';
import { protect } from './auth/auth.middleware.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shadowchat_v70';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('ShadowChat v70 Production API is running!');
});

app.use("/api/auth", authRoutes);
app.use("/api/social", protect, socialRoutes);
app.use("/api/crypto", protect, cryptoRoutes);
app.use("/api/marketplace", protect, marketplaceRoutes);
app.use("/api/stripe", protect, stripeRoutes);
app.use("/api/ai", protect, aiRoutes);
app.use("/api/admin", protect, adminRoutes);
app.use("/api/notifications", protect, notificationRoutes);
app.use("/api/chat", protect, chatRoutes);

setupChat(httpServer);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
