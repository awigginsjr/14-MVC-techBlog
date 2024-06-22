// Purpose: login.js is a client side javascript file that handles the login form submission. 
// It sends a POST request to the server with the username and password entered by the user. 
// If the login is successful, the user is redirected to the homepage. If the login fails, an alert is displayed to the user.
const loginHandler = async (event) => {
    // prevent the default behavior
    event.preventDefault();
  
    // get the values from the login form
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
  
    // if the username and password are not empty
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if the response is ok, redirect to the homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      // if the response is not ok, display an alert
      alert('Login failed');
    }
};

// add an event listener to the login form
document.querySelector('#login-form').addEventListener('submit', loginHandler);
