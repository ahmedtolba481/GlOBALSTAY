      document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        window.location.href = 'booking.html';
      });

      document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
        e.preventDefault();
        const modal = new bootstrap.Modal(document.getElementById('forgotModal'));
        modal.show();
      });