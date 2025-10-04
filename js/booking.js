// Hotel data
const hotels = [
  {
    id: 1,
    name: "Grand Luxury Hotel",
    location: "Dubai, UAE",
    price: 250,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 5,
    features: ["WiFi", "Pool", "Spa", "Restaurant"]
  },
  {
    id: 2,
    name: "Seaside Paradise Resort",
    location: "Maldives",
    price: 350,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 5,
    features: ["Beach Access", "Pool", "WiFi", "Gym"]
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Swiss Alps",
    price: 200,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4,
    features: ["Mountain View", "Restaurant", "WiFi", "Spa"]
  },
  {
    id: 4,
    name: "Urban Boutique Hotel",
    location: "New York, USA",
    price: 180,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4,
    features: ["City View", "WiFi", "Gym", "Bar"]
  },
  {
    id: 5,
    name: "Tropical Beach Resort",
    location: "Bali, Indonesia",
    price: 220,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 5,
    features: ["Beach", "Pool", "Spa", "Restaurant"]
  },
  {
    id: 6,
    name: "Historic Palace Hotel",
    location: "Paris, France",
    price: 300,
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 5,
    features: ["Historic", "Restaurant", "WiFi", "Concierge"]
  },
  {
    id: 7,
    name: "Aswan Grand Hotel",
    location: "Aswan, Egypt",
    price: 180,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 5,
    features: ["Private Beach", "Water Sports", "All-Inclusive", "Nile View"]
  },
  {
    id: 8,
    name: "Pyramids View Hotel",
    location: "Cairo, Egypt",
    price: 130,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4,
    features: ["Pyramids View", "Hiking Trails", "Fireplace", "Restaurant"]
  },
  {
    id: 9,
    name: "Valley of Kings Resort",
    location: "Luxor, Egypt",
    price: 125,
    image: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4,
    features: ["Heritage Building", "Antique Furniture", "Guided Tours", "Historic"]
  }
];

let selectedHotel = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Check if specific hotel ID is in URL
  const urlParams = new URLSearchParams(window.location.search);
  const hotelId = urlParams.get('hotel');
  
  if (hotelId) {
    // Direct booking for specific hotel
    selectedHotel = hotels.find(h => h.id === parseInt(hotelId));
    if (selectedHotel) {
      showBookingForm();
    } else {
      displayHotels();
    }
  } else {
    // Show all hotels for selection
    displayHotels();
  }
  
  // Set min date for check-in to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('checkInDate').setAttribute('min', today);
  
  // Handle check-in date change to set min check-out date
  document.getElementById('checkInDate').addEventListener('change', function() {
    const checkInDate = new Date(this.value);
    checkInDate.setDate(checkInDate.getDate() + 1);
    const minCheckOut = checkInDate.toISOString().split('T')[0];
    document.getElementById('checkOutDate').setAttribute('min', minCheckOut);
  });
  
  // Handle back button
  document.getElementById('backBtn').addEventListener('click', function() {
    selectedHotel = null;
    document.getElementById('hotelSelection').style.display = 'block';
    document.getElementById('bookingFormSection').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Handle form submission
  document.getElementById('bookingForm').addEventListener('submit', handleBookingSubmit);
});

// Display all hotels
function displayHotels() {
  const hotelsList = document.getElementById('hotelsList');
  hotelsList.innerHTML = '';
  
  hotels.forEach(hotel => {
    const stars = '★'.repeat(hotel.rating);
    const hotelCard = document.createElement('div');
    hotelCard.className = 'col-lg-4 col-md-6';
    hotelCard.innerHTML = `
      <div class="hotel-select-card" onclick="selectHotel(${hotel.id})">
        <img src="${hotel.image}" alt="${hotel.name}" class="hotel-select-img">
        <div class="hotel-select-content">
          <h3 class="hotel-select-title">${hotel.name}</h3>
          <div class="hotel-select-location">
            <i class="fas fa-map-marker-alt"></i>
            <span>${hotel.location}</span>
          </div>
          <div class="stars text-warning mb-2">${stars}</div>
          <div class="hotel-select-features">
            ${hotel.features.map(f => `<span class="feature-badge"><i class="fas fa-check-circle me-1"></i>${f}</span>`).join('')}
          </div>
          <div class="hotel-select-price">$${hotel.price}<span style="font-size: 0.9rem; font-weight: normal; color: var(--text-light);">/night</span></div>
          <button class="btn btn-book w-100">Select Hotel</button>
        </div>
      </div>
    `;
    hotelsList.appendChild(hotelCard);
  });
}

// Select hotel and show booking form
function selectHotel(hotelId) {
  selectedHotel = hotels.find(h => h.id === hotelId);
  if (selectedHotel) {
    showBookingForm();
  }
}

// Show booking form
function showBookingForm() {
  document.getElementById('hotelSelection').style.display = 'none';
  document.getElementById('bookingFormSection').style.display = 'block';
  updateBookingSummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update booking summary
function updateBookingSummary() {
  if (!selectedHotel) return;
  
  const summaryContent = document.getElementById('summaryContent');
  
  const stars = '★'.repeat(selectedHotel.rating);
  
  summaryContent.innerHTML = `
    <div class="hotel-summary-card">
      <img src="${selectedHotel.image}" alt="${selectedHotel.name}" class="hotel-summary-img">
      <h4 class="hotel-summary-title">${selectedHotel.name}</h4>
      <p class="hotel-summary-location">
        <i class="fas fa-map-marker-alt me-1"></i>${selectedHotel.location}
      </p>
      <div class="stars text-warning">${stars}</div>
    </div>
    <div id="dynamicSummary">
      <div class="summary-item">
        <span class="summary-label">Price per night:</span>
        <span class="summary-value">${selectedHotel.price.toFixed(2)}</span>
      </div>
    </div>
  `;
  
  // Add event listeners to form fields for dynamic updates
  const formFields = ['checkInDate', 'checkOutDate', 'numGuests', 'roomType'];
  formFields.forEach(field => {
    document.getElementById(field).addEventListener('change', calculateTotal);
  });
}

// Calculate total price
function calculateTotal() {
  const checkIn = document.getElementById('checkInDate').value;
  const checkOut = document.getElementById('checkOutDate').value;
  const numGuests = document.getElementById('numGuests').value;
  const roomType = document.getElementById('roomType').value;
  
  const dynamicSummary = document.getElementById('dynamicSummary');
  
  if (!checkIn || !checkOut) {
    dynamicSummary.innerHTML = '';
    return;
  }
  
  // Calculate number of nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  
  if (nights <= 0) {
    dynamicSummary.innerHTML = '<p class="text-danger">Check-out must be after check-in</p>';
    return;
  }
  
  // Calculate room price multiplier
  let roomMultiplier = 1;
  let roomTypeName = 'Standard Room';
  switch(roomType) {
    case 'deluxe':
      roomMultiplier = 1.3;
      roomTypeName = 'Deluxe Room';
      break;
    case 'suite':
      roomMultiplier = 1.6;
      roomTypeName = 'Suite';
      break;
    case 'presidential':
      roomMultiplier = 2.5;
      roomTypeName = 'Presidential Suite';
      break;
    default:
      roomTypeName = 'Standard Room';
  }
  
  const basePrice = selectedHotel.price * roomMultiplier;
  const subtotal = basePrice * nights;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  dynamicSummary.innerHTML = `
    <div class="summary-item">
      <span class="summary-label">Room Type:</span>
      <span class="summary-value">${roomTypeName}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Price per night:</span>
      <span class="summary-value">${basePrice.toFixed(2)}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Number of nights:</span>
      <span class="summary-value">${nights}</span>
    </div>
    ${numGuests ? `
    <div class="summary-item">
      <span class="summary-label">Guests:</span>
      <span class="summary-value">${numGuests}</span>
    </div>
    ` : ''}
    <div class="summary-item">
      <span class="summary-label">Subtotal:</span>
      <span class="summary-value">${subtotal.toFixed(2)}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Tax (10%):</span>
      <span class="summary-value">${tax.toFixed(2)}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Total:</span>
      <span class="summary-value">${total.toFixed(2)}</span>
    </div>
  `;
}

// Handle booking form submission
function handleBookingSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const firstName = document.getElementById('guestFirstName').value;
  const lastName = document.getElementById('guestLastName').value;
  const email = document.getElementById('guestEmail').value;
  const phone = document.getElementById('guestPhone').value;
  const checkIn = document.getElementById('checkInDate').value;
  const checkOut = document.getElementById('checkOutDate').value;
  const numGuests = document.getElementById('numGuests').value;
  const roomType = document.getElementById('roomType').value;
  const specialRequests = document.getElementById('specialRequests').value;
  
  // Validate dates
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  
  if (nights <= 0) {
    alert('Please select valid check-in and check-out dates.');
    return;
  }
  
  // Create booking object
  const booking = {
    reference: generateBookingReference(),
    hotel: selectedHotel,
    guest: {
      firstName,
      lastName,
      email,
      phone
    },
    dates: {
      checkIn,
      checkOut,
      nights
    },
    numGuests,
    roomType,
    specialRequests,
    timestamp: new Date().toISOString()
  };
  
  // Store booking (in real app, this would be sent to server)
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  
  // Show success modal
  document.getElementById('bookingRef').textContent = booking.reference;
  const modal = new bootstrap.Modal(document.getElementById('successModal'));
  modal.show();
  
  // Reset form
  document.getElementById('bookingForm').reset();
}

// Generate booking reference
function generateBookingReference() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let reference = 'GS-';
  for (let i = 0; i < 8; i++) {
    reference += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return reference;
}

// Make selectHotel available globally
window.selectHotel = selectHotel;