import { type Request, type Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const moderateContent = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text content is required for moderation' });
    }

    const moderationResponse = await openai.moderations.create({
      input: text,
    });

    const moderationResult = moderationResponse.results[0];

    res.status(200).json({
      message: 'Content moderation successful',
      flagged: moderationResult.flagged,
      categories: moderationResult.categories,
      category_scores: moderationResult.category_scores,
    });
  } catch (error: any) {
    console.error('Error moderating content:', error);
    res.status(500).json({ message: error.message });
  }
};

export const analyzeSentiment = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text content is required for sentiment analysis' });
    }

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Analyze the sentiment of the following text and respond with a single word: positive, negative, or neutral.' },
        { role: 'user', content: text },
      ],
      temperature: 0.2,
      max_tokens: 10,
    });

    const sentiment = chatCompletion.choices[0].message.content?.trim().toLowerCase();

    res.status(200).json({
      message: 'Sentiment analysis successful',
      sentiment: sentiment,
    });
  } catch (error: any) {
    console.error('Error analyzing sentiment:', error);
    res.status(500).json({ message: error.message });
  }
};
