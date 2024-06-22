const signupHandler = async (event) => { // Function to handle the sign up form submission
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim(); // Get the username from the form
    const password = document.querySelector('#password').value.trim(); // Get the password from the form
  
    if (password.length >= 10 && username) { // Check if the password is at least 10 characters long and the username is not empty
      const response = await fetch('/api/users', { // Send a request to the API endpoint
        method: 'POST',
        body: JSON.stringify({ username: username, password: password,}), // Send the username and password to the server
        headers: { 'Content-Type': 'application/json' }, // Send the request with a JSON body
      });
  
      if (response.ok) {
        document.location.replace('/'); // Redirect to the homepage after signing up
      } else {
        alert('Sign up failed'); // Alert the error message if there is an error
      }
    } else {
      alert(
        'Please enter both a username and a password! Ensuring that the password is at least 10 characters long!' // Alert the user if the username or password is empty
      );
    }
};
// Event listener for when the sign up form is submitted
document.querySelector('#sign-up-form').addEventListener('submit', signupHandler);