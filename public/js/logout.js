// Initiated by clicking the logout button in the header
const logoutHandler = async () => {
    const response = await fetch('/api/users/logout', { // Send a request to the API endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Send the request with a JSON body
    });

    if (response.ok) {
      document.location.replace('/'); // Redirect to the homepage after logging out
    } else {
      alert(response.statusText); // Alert the error message if there is an error
    }
};
// Event listener for when the logout button is clicked
document.querySelector('#logout').addEventListener('click', logoutHandler);