import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Learning Catalyst Backend is Running');
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
