import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API status
app.get('/api/status', (req, res) => {
  res.json({
    app: 'Money Management Super-App',
    version: '10.1.0',
    status: 'running',
    features: [
      'Crypto Engine',
      'Social Network',
      'Marketplace',
      'Gamification',
      'AI Manus Brain',
      'Free Will Agents',
      'Sovereign Policies',
      'Hope AI RAG'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🚀 API Status: http://localhost:${PORT}/api/status`);
});
