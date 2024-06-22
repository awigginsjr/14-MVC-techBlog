const newPostHandler = async function (event) { // Function to handle the new post form submission
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value; // Get the title from the form
    const body = document.querySelector('textarea[name="post-body"]').value; // Get the body from the form
  
    await fetch(`/api/posts`, { // Send a request to the API endpoint
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: { 'Content-Type': 'application/json' }, // Send the request with a JSON body
    });
  
    document.location.replace('/dashboard'); // Redirect to the dashboard after creating a new post
};

document
  .querySelector('#new-post-form').addEventListener('submit', newPostHandler); // Add an event listener for the new post form
