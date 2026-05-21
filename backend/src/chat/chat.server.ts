import { Server } from 'socket.io';
import { createServer } from 'http';
import jwt from 'jsonwebtoken';
import Message from '../models/Message.js';
import User from '../auth/auth.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

export const setupChat = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('Authentication error'));
      
      const decoded: any = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return next(new Error('User not found'));
      
      socket.data.user = user;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const user = socket.data.user;
    console.log(`User connected: ${user.username}`);
    socket.join(user._id.toString());

    socket.on('send_message', async (data) => {
      try {
        const { receiverId, content, mediaUrl, messageType } = data;
        const conversationId = [user._id.toString(), receiverId].sort().join('_');

        const message = await Message.create({
          sender: user._id,
          receiver: receiverId,
          conversationId,
          content,
          mediaUrl: mediaUrl || '',
          messageType: messageType || 'text',
        });

        io.to(receiverId).emit('receive_message', message);
        socket.emit('message_sent', message);
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${user.username}`);
    });
  });

  return io;
};
