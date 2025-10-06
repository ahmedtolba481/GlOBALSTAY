// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Load booking data from session storage
const bookingData = JSON.parse(sessionStorage.getItem('bookingData'));

if (!bookingData) {
  window.location.href = 'booking.html';
}

// Display payment summary
function displayPaymentSummary() {
  const summaryContent = document.getElementById('paymentSummary');
  
  if (!bookingData) return;

  const checkIn = new Date(bookingData.checkInDate);
  const checkOut = new Date(bookingData.checkOutDate);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const roomPrice = bookingData.roomPrices[bookingData.roomType] || 100;
  const subtotal = roomPrice * nights;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  summaryContent.innerHTML = `
    <div class="hotel-summary-card">
      <img src="${bookingData.hotelImage}" alt="${bookingData.hotelName}" class="hotel-summary-img">
      <h4 class="hotel-summary-title">${bookingData.hotelName}</h4>
      <p class="hotel-summary-location">
        <i class="fas fa-map-marker-alt me-1"></i> ${bookingData.hotelLocation}
      </p>
      <div class="stars text-warning">★★★★★</div>
    </div>
    <div class="summary-divider"></div>
    <div class="summary-item">
      <span>Guest:</span>
      <strong>${bookingData.guestFirstName} ${bookingData.guestLastName}</strong>
    </div>
    <div class="summary-item">
      <span>Check-in:</span>
      <strong>${new Date(bookingData.checkInDate).toLocaleDateString()}</strong>
    </div>
    <div class="summary-item">
      <span>Check-out:</span>
      <strong>${new Date(bookingData.checkOutDate).toLocaleDateString()}</strong>
    </div>
    <div class="summary-item">
      <span>Nights:</span>
      <strong>${nights}</strong>
    </div>
    <div class="summary-item">
      <span>Guests:</span>
      <strong>${bookingData.numGuests}</strong>
    </div>
    <div class="summary-item">
      <span>Room Type:</span>
      <strong>${bookingData.roomType.charAt(0).toUpperCase() + bookingData.roomType.slice(1)}</strong>
    </div>
    <div class="summary-divider"></div>
    <div class="summary-item">
      <span>Room (${nights} nights):</span>
      <strong>$${subtotal.toFixed(2)}</strong>
    </div>
    <div class="summary-item">
      <span>Taxes & Fees:</span>
      <strong>$${tax.toFixed(2)}</strong>
    </div>
    <div class="summary-divider"></div>
    <div class="summary-total">
      <span>Total:</span>
      <strong>$${total.toFixed(2)}</strong>
    </div>
  `;
}

// Format card number
document.getElementById('cardNumber')?.addEventListener('input', function(e) {
  let value = e.target.value.replace(/\s/g, '');
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
  e.target.value = formattedValue;
});

// Format expiry date
document.getElementById('expiryDate')?.addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4);
  }
  e.target.value = value;
});

// Format CVV
document.getElementById('cvv')?.addEventListener('input', function(e) {
  e.target.value = e.target.value.replace(/\D/g, '');
});

// Toggle payment method display
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
  radio.addEventListener('change', function() {
    const cardDetails = document.getElementById('cardDetails');
    
    if (this.value === 'credit') {
      cardDetails.innerHTML = `
        <div class="row g-3">
          <div class="col-12">
            <label class="form-label">Cardholder Name *</label>
            <input
              type="text"
              class="form-control"
              id="cardName"
              placeholder="Name on card"
              required
            />
          </div>
          <div class="col-12">
            <label class="form-label">Card Number *</label>
            <input
              type="text"
              class="form-control"
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Expiry Date *</label>
            <input
              type="text"
              class="form-control"
              id="expiryDate"
              placeholder="MM/YY"
              maxlength="5"
              required
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">CVV *</label>
            <input
              type="text"
              class="form-control"
              id="cvv"
              placeholder="123"
              maxlength="4"
              required
            />
          </div>
        </div>
      `;
      
      // Re-attach formatters
      attachCardFormatters();
    } else if (this.value === 'vodafone') {
      cardDetails.innerHTML = `
        <div class="row g-3">
          <div class="col-12">
            <label class="form-label">Full Name *</label>
            <input
              type="text"
              class="form-control"
              id="vodafoneName"
              placeholder="Your full name"
              required
            />
          </div>
          <div class="col-12">
            <label class="form-label">Vodafone Cash Number *</label>
            <input
              type="tel"
              class="form-control"
              id="vodafoneNumber"
              placeholder="01xxxxxxxxx"
              maxlength="11"
              required
            />
          </div>
          <div class="col-12">
            <div class="alert alert-info">
              <i class="fas fa-info-circle me-2"></i>
              You will receive a payment request on your Vodafone Cash number to complete the transaction.
            </div>
          </div>
        </div>
      `;
      
      // Format Vodafone number
      const vodafoneNumberInput = document.getElementById('vodafoneNumber');
      if (vodafoneNumberInput) {
        vodafoneNumberInput.addEventListener('input', function(e) {
          e.target.value = e.target.value.replace(/\D/g, '');
        });
      }
    } else {
      cardDetails.innerHTML = `
        <div class="alert alert-info">
          <i class="fab fa-paypal me-2"></i>
          You will be redirected to PayPal to complete your payment.
        </div>
      `;
    }
  });
});

// Function to attach card formatters
function attachCardFormatters() {
  // Format card number
  const cardNumberInput = document.getElementById('cardNumber');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s/g, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formattedValue;
    });
  }

  // Format expiry date
  const expiryDateInput = document.getElementById('expiryDate');
  if (expiryDateInput) {
    expiryDateInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      e.target.value = value;
    });
  }

  // Format CVV
  const cvvInput = document.getElementById('cvv');
  if (cvvInput) {
    cvvInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
}

// Handle payment form submission
document.getElementById('paymentForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Generate booking reference
  const bookingRef = 'GS' + Date.now().toString().slice(-8);
  document.getElementById('bookingRef').textContent = bookingRef;

  // Show success modal
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));
  successModal.show();

  // Clear booking data
  sessionStorage.removeItem('bookingData');

  // Redirect to My Bookings page after showing success
  setTimeout(() => {
    window.location.href = 'my-bookings.html';
  }, 1500);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  displayPaymentSummary();
  
  // Show card details by default
  const cardDetails = document.getElementById('cardDetails');
  cardDetails.innerHTML = `
    <div class="row g-3">
      <div class="col-12">
        <label class="form-label">Cardholder Name *</label>
        <input
          type="text"
          class="form-control"
          id="cardName"
          placeholder="Name on card"
          required
        />
      </div>
      <div class="col-12">
        <label class="form-label">Card Number *</label>
        <input
          type="text"
          class="form-control"
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          maxlength="19"
          required
        />
      </div>
      <div class="col-md-6">
        <label class="form-label">Expiry Date *</label>
        <input
          type="text"
          class="form-control"
          id="expiryDate"
          placeholder="MM/YY"
          maxlength="5"
          required
        />
      </div>
      <div class="col-md-6">
        <label class="form-label">CVV *</label>
        <input
          type="text"
          class="form-control"
          id="cvv"
          placeholder="123"
          maxlength="4"
          required
        />
      </div>
    </div>
  `;
  
  attachCardFormatters();
});