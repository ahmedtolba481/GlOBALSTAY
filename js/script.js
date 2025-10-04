// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    document.querySelector(".navbar").classList.add("navbar-scrolled");
  } else {
    document.querySelector(".navbar").classList.remove("navbar-scrolled");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Add active class to nav links on scroll
window.addEventListener("scroll", function () {
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Booking page functions
function openBooking() {
  document.getElementById("bookingPage").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeBooking() {
  document.getElementById("bookingPage").style.display = "none";
  document.body.style.overflow = "auto";
}

// Close booking page when clicking outside
document.getElementById("bookingPage").addEventListener("click", function (e) {
  if (e.target === this) {
    closeBooking();
  }
});

// Search form functionality
document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  performSearch();
});

// Booking form functionality
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert(
    "Booking submitted successfully! You will receive a confirmation email shortly."
  );
  closeBooking();
  // Here you would typically send the booking data to a server
});

// Hotel details functionality
function openHotelDetails(hotelName) {
  // Set hotel details based on the hotel name
  document.getElementById("hotelDetailsTitle").textContent = hotelName;

  // Set different details for each hotel
  let description = "";
  let price = "";
  let rating = "";
  let amenities = [];
  let location = "";
  let policies = [];

  switch (hotelName) {
    case "Mediterranean Resort":
      description =
        "Experience the ultimate beachfront getaway at Mediterranean Resort. With stunning ocean views, private balconies, and direct beach access, this hotel offers the perfect coastal retreat. Our rooms feature modern amenities, comfortable bedding, and elegant decor inspired by the sea.";
      price = "$120 / night";
      rating = "★★★★★";
      amenities = [
        "Sea View",
        "Free Breakfast",
        "Free Wi-Fi",
        "Swimming Pool",
        "Spa",
        "Beach Access",
        "Restaurant",
        "Bar",
      ];
      location =
        "Located directly on the beachfront with panoramic ocean views, just 10 minutes from the city center.";
      policies = [
        "Check-in: 3:00 PM",
        "Check-out: 11:00 AM",
        "Free cancellation up to 48 hours before arrival",
        "Pets not allowed",
        "Children of all ages welcome",
      ];
      break;
    case "Nile View Hotel":
      description =
        "Situated in the heart of the city, Nile View Hotel offers convenience and comfort for both business and leisure travelers. Our modern rooms are designed with productivity and relaxation in mind, featuring ergonomic workspaces and premium bedding.";
      price = "$89 / night";
      rating = "★★★★☆";
      amenities = [
        "Central Location",
        "Free Cancellation",
        "Parking",
        "Business Center",
        "Fitness Center",
        "Restaurant",
        "Room Service",
        "Concierge",
      ];
      location =
        "In the central business district, walking distance to major attractions, shopping centers, and public transportation.";
      policies = [
        "Check-in: 2:00 PM",
        "Check-out: 12:00 PM",
        "Free cancellation up to 24 hours before arrival",
        "Pets allowed with fee",
        "Airport shuttle available",
      ];
      break;
    case "Pharaoh's Palace":
      description =
        "Indulge in luxury at Pharaoh's Palace, where elegance meets tranquility. Our spacious suites feature private gardens, premium amenities, and personalized service. Enjoy the on-site spa, fine dining restaurant, and beautifully landscaped grounds.";
      price = "$145 / night";
      rating = "★★★★★";
      amenities = [
        "Luxury Suite",
        "Breakfast & Spa",
        "Room Service",
        "Private Garden",
        "Fine Dining",
        "Spa Services",
        "Concierge",
        "Valet Parking",
      ];
      location =
        "Set in a peaceful garden oasis just outside the city center, offering a serene escape with easy access to urban amenities.";
      policies = [
        "Check-in: 4:00 PM",
        "Check-out: 11:00 AM",
        "Free cancellation up to 72 hours before arrival",
        "No pets allowed",
        "Minimum 2-night stay on weekends",
      ];
      break;
    case "Red Sea Resort":
      description =
        "The perfect destination for families, our resort offers activities for all ages. With dedicated kids' clubs, family-sized accommodations, and multiple swimming pools, everyone will have an unforgettable vacation.";
      price = "$110 / night";
      rating = "★★★★☆";
      amenities = [
        "Kids Club",
        "Swimming Pool",
        "Family Rooms",
        "Playground",
        "Restaurant",
        "Entertainment",
        "Game Room",
        "Babysitting Services",
      ];
      location =
        "Located in a family-friendly area with easy access to theme parks, beaches, and family attractions.";
      policies = [
        "Check-in: 3:00 PM",
        "Check-out: 11:00 AM",
        "Free cancellation up to 7 days before arrival",
        "Children stay free",
        "Family packages available",
      ];
      break;
    case "Coral Bay Hotel":
      description =
        "Designed for the modern business traveler, our hotel offers state-of-the-art facilities and convenient services. From well-equipped meeting rooms to high-speed internet, we ensure your business trip is productive and comfortable.";
      price = "$95 / night";
      rating = "★★★★☆";
      amenities = [
        "Conference Rooms",
        "Business Center",
        "Airport Shuttle",
        "High-Speed Internet",
        "Fitness Center",
        "Restaurant",
        "24/7 Room Service",
        "Executive Lounge",
      ];
      location =
        "Conveniently located near the business district and airport, with easy access to corporate offices and conference centers.";
      policies = [
        "Check-in: 2:00 PM",
        "Check-out: 12:00 PM",
        "Flexible cancellation for corporate accounts",
        "Early check-in available",
        "Complimentary airport transfers",
      ];
      break;
    case "Mediterranean Paradise":
      description =
        "Escape to our intimate retreat designed for couples. Enjoy private balconies with stunning views, couples' spa treatments, and romantic dining experiences. Perfect for anniversaries, honeymoons, or special occasions.";
      price = "$160 / night";
      rating = "★★★★★";
      amenities = [
        "Private Balcony",
        "Couples Massage",
        "Fine Dining",
        "Romantic Decor",
        "Spa Services",
        "Wine Tasting",
        "Private Dining",
        "Jacuzzi",
      ];
      location =
        "Nestled in a secluded area with breathtaking views, offering privacy and romance just a short drive from the city.";
      policies = [
        "Check-in: 4:00 PM",
        "Check-out: 12:00 PM",
        "Special packages for honeymooners",
        "Romantic amenities available",
        "Advance reservation recommended",
      ];
      break;
    default:
      description =
        "Experience luxury and comfort at our premium hotel. Enjoy stunning views, exceptional service, and world-class amenities that will make your stay unforgettable.";
      price = "$120 / night";
      rating = "★★★★★";
      amenities = [
        "Free Wi-Fi",
        "Swimming Pool",
        "Restaurant",
        "Fitness Center",
        "Spa",
        "Room Service",
        "Concierge",
      ];
      location =
        "Located in a prime location with easy access to major attractions and amenities.";
      policies = [
        "Check-in: 3:00 PM",
        "Check-out: 11:00 AM",
        "Free cancellation policy",
        "Standard hotel policies apply",
      ];
  }

  // Update the modal content
  document.getElementById("hotelDetailsDescription").textContent = description;
  document.getElementById("hotelDetailsPrice").textContent = price;
  document.getElementById("hotelDetailsRating").textContent = rating;
  document.getElementById("hotelLocation").textContent = location;

  // Update amenities
  const amenitiesContainer = document.getElementById("hotelAmenities");
  amenitiesContainer.innerHTML = "";
  amenities.forEach((amenity) => {
    const badge = document.createElement("span");
    badge.className = "amenity-badge";
    badge.textContent = amenity;
    amenitiesContainer.appendChild(badge);
  });

  // Update policies
  const policiesContainer = document.getElementById("hotelPolicies");
  policiesContainer.innerHTML = "";
  policies.forEach((policy) => {
    const li = document.createElement("li");
    li.textContent = policy;
    policiesContainer.appendChild(li);
  });

  // Show the modal
  document.getElementById("hotelDetailsModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeHotelDetails() {
  document.getElementById("hotelDetailsModal").style.display = "none";
  document.body.style.overflow = "auto";
}

// Close hotel details when clicking outside
document
  .getElementById("hotelDetailsModal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeHotelDetails();
    }
  });

// Search functionality
function performSearch() {
  const destination = document
    .getElementById("destinationInput")
    .value.toLowerCase();
  const checkin = document.getElementById("checkinDate").value;
  const checkout = document.getElementById("checkoutDate").value;
  const rooms = document.getElementById("roomsSelect").value;
  const guests = document.getElementById("guestsSelect").value;

  // Update search criteria display
  document.getElementById("criteriaDestination").textContent =
    destination || "-";
  document.getElementById("criteriaCheckin").textContent = checkin || "-";
  document.getElementById("criteriaCheckout").textContent = checkout || "-";
  document.getElementById("criteriaRooms").textContent = rooms || "-";
  document.getElementById("criteriaGuests").textContent = guests || "-";

  // Get all hotel items
  const allHotels = document.querySelectorAll(".hotel-item");
  const searchResultsContainer = document.getElementById(
    "searchResultsContainer"
  );
  const noResultsMessage = document.getElementById("noResultsMessage");

  // Clear previous results
  searchResultsContainer.innerHTML = "";

  let foundResults = 0;

  // Filter hotels based on destination
  allHotels.forEach((hotel) => {
    const hotelDestination = hotel.getAttribute("data-destination");

    // Simple matching logic - you can expand this with more complex filtering
    if (destination === "" || hotelDestination.includes(destination)) {
      const hotelClone = hotel.cloneNode(true);
      searchResultsContainer.appendChild(hotelClone);
      foundResults++;
    }
  });

  // Update results count
  document.getElementById(
    "resultsCount"
  ).textContent = `Showing ${foundResults} hotels`;

  // Show/hide no results message
  if (foundResults === 0) {
    noResultsMessage.style.display = "block";
  } else {
    noResultsMessage.style.display = "none";
  }

  // Show search results section and hide featured hotels
  document.getElementById("searchResults").style.display = "block";
  document.getElementById("hotels").style.display = "none";

  // Scroll to search results
  document
    .getElementById("searchResults")
    .scrollIntoView({ behavior: "smooth" });
}

function showAllHotels() {
  // Show featured hotels and hide search results
  document.getElementById("hotels").style.display = "block";
  document.getElementById("searchResults").style.display = "none";

  // Scroll to hotels section
  document.getElementById("hotels").scrollIntoView({ behavior: "smooth" });
}

// Set destination from popular destinations
function setDestination(city) {
  document.getElementById("destinationInput").value = city;
}

// Set default dates for search form
window.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format dates as YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  document.getElementById("checkinDate").value = formatDate(today);
  document.getElementById("checkoutDate").value = formatDate(tomorrow);
});
document.addEventListener('DOMContentLoaded', function() {
  // Add click handlers to all hotel card "Book Now" buttons
  const hotelCards = document.querySelectorAll('.hotel-card');
  
  hotelCards.forEach((card, index) => {
    const bookBtn = card.querySelector('.btn-book');
    if (bookBtn) {
      bookBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Hotel IDs correspond to the order (1-indexed)
        const hotelId = index + 1;
        window.location.href = `pages/booking.html?hotel=${hotelId}`;
      });
    }
  });
});
