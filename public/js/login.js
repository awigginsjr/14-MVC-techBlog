// Purpose: login.js is a client side javascript file that handles the login form submission. It sends a POST request to the server with the username and password entered by the user. If the login is successful, the user is redirected to the homepage. If the login fails, an alert is displayed to the user.
const loginFormHandler = async (event) => {
    // prevent the default behavior
    event.preventDefault();
  
    // get the values from the login form
    const username = document.querySelector('#username-input-login');
    const password = document.querySelector('#password-input-login');
  
    // if the username and password are not empty
    if (username && password) {
      try {
        // send a POST request to the server
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        
        // if the response is ok, redirect to the homepage
        if (response.ok) {
          document.location.replace('/');
        } else {

            // if the response is not ok, display an alert
          alert('Login failed');
        }
      } catch (error) {

        // if there is an error, log the error and display an alert
        console.error('Error:', error);
        alert('Login failed');
      }
    } else {

        // if the username or password is empty, display an alert
      alert('Please fill out both fields');
    }
};

// add an event listener to the login form
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
