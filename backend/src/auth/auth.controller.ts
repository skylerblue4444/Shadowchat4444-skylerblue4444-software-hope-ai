import { type Request, type Response } from 'express';
import User from './auth.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = await User.create({ username, email, password });

    const token = generateToken(user._id.toString());
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString());
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
