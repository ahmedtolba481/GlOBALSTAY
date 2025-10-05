import { Router } from 'express';
import Booking from '../models/Booking.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

function generateReference() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = 'GS-';
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

// Create booking
router.post('/', requireAuth, async (req, res) => {
  try {
    const reference = generateReference();
    const booking = await Booking.create({
      user: req.user.id,
      reference,
      ...req.body,
    });
    return res.status(201).json({ booking });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// List my bookings
router.get('/', requireAuth, async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ bookings });
});

// Cancel booking
router.delete('/:reference', requireAuth, async (req, res) => {
  const { reference } = req.params;
  const result = await Booking.findOneAndDelete({ reference, user: req.user.id });
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;


