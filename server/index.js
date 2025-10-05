import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRouter from './routes/auth.js';
import bookingRouter from './routes/booking.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: false,
}));
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hotelapp';

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    app.get('/health', (req, res) => {
      res.json({ ok: true });
    });

    app.use('/api/auth', authRouter);
    app.use('/api/bookings', bookingRouter);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();


