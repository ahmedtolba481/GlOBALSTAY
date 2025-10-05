// Hotel data - matching index.html hotels
const hotels = [
  {
    id: 1,
    name: "Mediterranean Resort",
    location: "Alexandria, Egypt",
    price: 120,
    image: "../assets/img/photo-1551882547-ff40c63fe5fa.avif",
    rating: 5,
    features: [
      "Sea View",
      "Free Breakfast",
      "Free Wi-Fi",
      "Swimming Pool",
      "Spa",
      "Beach Access",
      "Restaurant",
      "Bar",
    ],
    badge: "Beachfront",
  },
  {
    id: 2,
    name: "Nile View Hotel",
    location: "Cairo, Egypt",
    price: 89,
    image: "../assets/img/photo-1551882547-ff40c63fe5fa.avif",
    rating: 4,
    features: [
      "Central Location",
      "Free Cancellation",
      "Parking",
      "Business Center",
      "Fitness Center",
      "Restaurant",
      "Room Service",
      "Concierge",
    ],
    badge: "City Center",
  },
  {
    id: 3,
    name: "Pharaoh's Palace",
    location: "Luxor, Egypt",
    price: 145,
    image: "../assets/img/photo-1611892440504-42a792e24d32.avif",
    rating: 5,
    features: [
      "Luxury Suite",
      "Breakfast & Spa",
      "Room Service",
      "Private Garden",
      "Fine Dining",
      "Spa Services",
      "Concierge",
      "Valet Parking",
    ],
    badge: "Historic",
  },
  {
    id: 4,
    name: "Red Sea Resort",
    location: "Hurghada, Egypt",
    price: 110,
    image: "../assets/img/photo-1611892440504-42a792e24d32.avif",
    rating: 4,
    features: [
      "Kids Club",
      "Swimming Pool",
      "Family Rooms",
      "Playground",
      "Restaurant",
      "Entertainment",
      "Game Room",
      "Babysitting Services",
    ],
    badge: "Beach Resort",
  },
  {
    id: 5,
    name: "Coral Bay Hotel",
    location: "Sharm El Sheikh, Egypt",
    price: 95,
    image: "../assets/img/photo-1564501049412-61c2a3083791.avif",
    rating: 4,
    features: [
      "Conference Rooms",
      "Business Center",
      "Airport Shuttle",
      "High-Speed Internet",
      "Fitness Center",
      "Restaurant",
      "24/7 Room Service",
      "Executive Lounge",
    ],
    badge: "Diving",
  },
  {
    id: 6,
    name: "Mediterranean Paradise",
    location: "Marsa Matruh, Egypt",
    price: 160,
    image: "../assets/img/photo-1520250497591-112f2f40a3f4.avif",
    rating: 5,
    features: [
      "Private Balcony",
      "Couples Massage",
      "Fine Dining",
      "Romantic Decor",
      "Spa Services",
      "Wine Tasting",
      "Private Dining",
      "Jacuzzi",
    ],
    badge: "Romantic",
  },
  {
    id: 7,
    name: "Aswan Grand Hotel",
    location: "Aswan, Egypt",
    price: 180,
    image: "../assets/img/photo-1542314831-068cd1dbfeeb.avif",
    rating: 5,
    features: [
      "Private Beach",
      "Water Sports",
      "All-Inclusive",
      "Nile View",
      "Spa",
      "Restaurant",
      "Bar",
      "Room Service",
    ],
    badge: "Nile View",
  },
  {
    id: 8,
    name: "Pyramids View Hotel",
    location: "Cairo, Egypt",
    price: 130,
    image: "../assets/img/photo-1566073771259-6a8506099945.avif",
    rating: 4,
    features: [
      "Pyramids View",
      "Hiking Trails",
      "Fireplace",
      "Restaurant",
      "WiFi",
      "Fitness Center",
      "Concierge",
      "Parking",
    ],
    badge: "Pyramids View",
  },
  {
    id: 9,
    name: "Valley of Kings Resort",
    location: "Luxor, Egypt",
    price: 125,
    image: "../assets/img/photo-1522798514-97ceb8c4f1c8.avif",
    rating: 4,
    features: [
      "Heritage Building",
      "Antique Furniture",
      "Guided Tours",
      "Historic",
      "Restaurant",
      "WiFi",
      "Spa",
      "Concierge",
    ],
    badge: "Historic",
  },
];

let selectedHotel = null;

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Check if specific hotel ID is in URL
  const urlParams = new URLSearchParams(window.location.search);
  const hotelId = urlParams.get("hotel");

  if (hotelId) {
    // Direct booking for specific hotel
    selectedHotel = hotels.find((h) => h.id === parseInt(hotelId));
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
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("checkInDate").setAttribute("min", today);

  // Handle check-in date change to set min check-out date
  document
    .getElementById("checkInDate")
    .addEventListener("change", function () {
      const checkInDate = new Date(this.value);
      checkInDate.setDate(checkInDate.getDate() + 1);
      const minCheckOut = checkInDate.toISOString().split("T")[0];
      document.getElementById("checkOutDate").setAttribute("min", minCheckOut);
    });

  // Handle back button
  document.getElementById("backBtn").addEventListener("click", function () {
    selectedHotel = null;
    document.getElementById("hotelSelection").style.display = "block";
    document.getElementById("bookingFormSection").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Handle form submission
  document
    .getElementById("bookingForm")
    .addEventListener("submit", handleBookingSubmit);
});

// Display all hotels
function displayHotels() {
  const hotelsList = document.getElementById("hotelsList");
  hotelsList.innerHTML = "";

  hotels.forEach((hotel) => {
    const stars = "★".repeat(hotel.rating);
    const hotelCard = document.createElement("div");
    hotelCard.className = "col-lg-4 col-md-6";
    hotelCard.innerHTML = `
      <div class="hotel-select-card" onclick="selectHotel(${hotel.id})">
        <div class="position-relative">
          <span class="badge-featured">${hotel.badge}</span>
          <img src="${hotel.image}" alt="${
      hotel.name
    }" class="hotel-select-img">
        </div>
        <div class="hotel-select-content">
          <h3 class="hotel-select-title">${hotel.name}</h3>
          <div class="hotel-select-location">
            <i class="fas fa-map-marker-alt"></i>
            <span>${hotel.location}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="stars text-warning">${stars}</div>
            <div class="hotel-select-price">$${
              hotel.price
            }<span style="font-size: 0.9rem; font-weight: normal; color: var(--text-light);">/night</span></div>
          </div>
          <div class="hotel-select-features mb-3">
            ${hotel.features
              .slice(0, 3)
              .map(
                (f) =>
                  `<span class="feature-badge"><i class="fas fa-check-circle me-1"></i>${f}</span>`
              )
              .join("")}
            ${
              hotel.features.length > 3
                ? `<span class="feature-badge">+${
                    hotel.features.length - 3
                  } more</span>`
                : ""
            }
          </div>
          <button class="btn btn-book w-100">Select Hotel</button>
        </div>
      </div>
    `;
    hotelsList.appendChild(hotelCard);
  });
}

// Select hotel and show booking form
function selectHotel(hotelId) {
  selectedHotel = hotels.find((h) => h.id === hotelId);
  if (selectedHotel) {
    showBookingForm();
  }
}

// Show booking form
function showBookingForm() {
  document.getElementById("hotelSelection").style.display = "none";
  document.getElementById("bookingFormSection").style.display = "block";
  updateBookingSummary();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update booking summary
function updateBookingSummary() {
  if (!selectedHotel) return;

  const summaryContent = document.getElementById("summaryContent");

  const stars = "★".repeat(selectedHotel.rating);

  summaryContent.innerHTML = `
    <div class="hotel-summary-card">
      <img src="${selectedHotel.image}" alt="${
    selectedHotel.name
  }" class="hotel-summary-img">
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
  const formFields = ["checkInDate", "checkOutDate", "numGuests", "roomType"];
  formFields.forEach((field) => {
    document.getElementById(field).addEventListener("change", calculateTotal);
  });
}

// Calculate total price
function calculateTotal() {
  const checkIn = document.getElementById("checkInDate").value;
  const checkOut = document.getElementById("checkOutDate").value;
  const numGuests = document.getElementById("numGuests").value;
  const roomType = document.getElementById("roomType").value;

  const dynamicSummary = document.getElementById("dynamicSummary");

  if (!checkIn || !checkOut) {
    dynamicSummary.innerHTML = "";
    return;
  }

  // Calculate number of nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil(
    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
  );

  if (nights <= 0) {
    dynamicSummary.innerHTML =
      '<p class="text-danger">Check-out must be after check-in</p>';
    return;
  }

  // Calculate room price multiplier
  let roomMultiplier = 1;
  let roomTypeName = "Standard Room";
  switch (roomType) {
    case "deluxe":
      roomMultiplier = 1.3;
      roomTypeName = "Deluxe Room";
      break;
    case "suite":
      roomMultiplier = 1.6;
      roomTypeName = "Suite";
      break;
    case "presidential":
      roomMultiplier = 2.5;
      roomTypeName = "Presidential Suite";
      break;
    default:
      roomTypeName = "Standard Room";
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
    ${
      numGuests
        ? `
    <div class="summary-item">
      <span class="summary-label">Guests:</span>
      <span class="summary-value">${numGuests}</span>
    </div>
    `
        : ""
    }
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

const API_BASE = 'http://localhost:4000/api';

// Handle booking form submission
function handleBookingSubmit(e) {
  e.preventDefault();

  // Get form data
  const firstName = document.getElementById("guestFirstName").value;
  const lastName = document.getElementById("guestLastName").value;
  const email = document.getElementById("guestEmail").value;
  const phone = document.getElementById("guestPhone").value;
  const checkIn = document.getElementById("checkInDate").value;
  const checkOut = document.getElementById("checkOutDate").value;
  const numGuests = document.getElementById("numGuests").value;
  const roomType = document.getElementById("roomType").value;
  const specialRequests = document.getElementById("specialRequests").value;

  // Validate dates
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil(
    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
  );

  if (nights <= 0) {
    alert("Please select valid check-in and check-out dates.");
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
      phone,
    },
    dates: {
      checkIn,
      checkOut,
      nights,
    },
    numGuests,
    roomType,
    specialRequests,
    timestamp: new Date().toISOString(),
  };

  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  if (!token) {
    alert('Please login first.');
    window.location.href = 'login.html';
    return;
  }

  fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(booking)
  })
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create booking');
      }
      return res.json();
    })
    .then((data) => {
      document.getElementById("bookingRef").textContent = data.booking.reference;
      const modal = new bootstrap.Modal(document.getElementById("successModal"));
      modal.show();
      document.getElementById("bookingForm").reset();
    })
    .catch((err) => {
      alert(err.message || 'Error creating booking');
    });

  // Show success modal
  document.getElementById("bookingRef").textContent = booking.reference;
  const modal = new bootstrap.Modal(document.getElementById("successModal"));
  modal.show();

  // Reset form
  document.getElementById("bookingForm").reset();
}

// Reference is generated server-side now
function generateBookingReference() { return 'pending'; }

// Make selectHotel available globally
window.selectHotel = selectHotel;
