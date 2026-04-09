import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import auditRoutes from './routes/auditRoutes.js'; // <-- ADD THIS IMPORT

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  credentials: true
}));

// --- ROUTES ---
app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend is live!' });
});

// Hook up the AI Audit route! <-- ADD THIS LINE
app.use('/api/audit', auditRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});