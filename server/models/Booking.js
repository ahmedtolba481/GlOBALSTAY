import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reference: { type: String, required: true, unique: true },
    hotel: {
      id: Number,
      name: String,
      location: String,
      price: Number,
      image: String,
      rating: Number,
      badge: String,
    },
    guest: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
    },
    dates: {
      checkIn: String,
      checkOut: String,
      nights: Number,
    },
    numGuests: Number,
    roomType: String,
    specialRequests: String,
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);


