// Purpose: JavaScript file for handling comments on posts
const commentsHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('input[name="postId"]').value; // Get the post ID from the form
    const body = document.querySelector('textarea[name="comment-body"]').value; // Get the comment body from the form
    // const bodyInput = document.querySelector('textarea[name="post-body"]'); // Get the comment body input element

    if (body) { // Check if the comment body is not empty
      const response = await fetch('/api/comments', { // Send a request to the API endpoint
        method: 'POST', // Send a POST request
        body: JSON.stringify({ postId, body }), // Send the post ID and comment body to the server
        // body: JSON.stringify({ postId, bodyInput }), // Send the post ID and comment body to the server
        headers: { 'Content-Type': 'application/json' }, // Send the request with a JSON body
      });
      
      if (response.ok) {
        document.location.reload(); // Reload the page to display the new comment
      } else {
        document.location.replace('/login'); // Redirect to the login page if there is an error
      }
    }
};

// Event listener for when the comment form is submitted
document.querySelector('#new-comment-form').addEventListener('submit', commentsHandler);