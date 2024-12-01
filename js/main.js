document.getElementById('form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const firstName = document.querySelector('input[name="firstName"]').value.trim();
    const lastName = document.querySelector('input[name="lastName"]').value.trim();
    const phone = document.querySelector('input[name="phone"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const messageDiv = document.getElementById('message');
  
    if (!firstName || !lastName || !phone || !email) {
      messageDiv.innerText = 'Please fill in all required fields.';
      messageDiv.classList.remove('text-success');
      messageDiv.classList.add('text-danger');
      return;
    }
  

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      messageDiv.innerText = 'Please enter a valid email address.';
      messageDiv.classList.remove('text-success');
      messageDiv.classList.add('text-danger');
      return;
    }
  
    if (!/^\d{10}$/.test(phone)) {
      messageDiv.innerText = 'Please enter a valid 10-digit phone number.';
      messageDiv.classList.remove('text-success');
      messageDiv.classList.add('text-danger');
      return;
    }
  
    try {
      const firebaseURL = 'https://dawn-9601d-default-rtdb.firebaseio.com/subscribers.json';
  
      const response = await fetch(firebaseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, phone, email }),
      });
  
      if (response.ok) {
        messageDiv.innerText = 'Thank you for subscribing!';
        messageDiv.classList.remove('text-danger');
        messageDiv.classList.add('text-success');
  
        document.getElementById('form').reset();
      } else {
        messageDiv.innerText = 'Failed to subscribe. Please try again.';
        messageDiv.classList.remove('text-success');
        messageDiv.classList.add('text-danger');
      }
    } catch (error) {
      messageDiv.innerText = 'An error occurred. Please try again later.';
      messageDiv.classList.remove('text-success');
      messageDiv.classList.add('text-danger');
      console.error(error);
    }
  });
  