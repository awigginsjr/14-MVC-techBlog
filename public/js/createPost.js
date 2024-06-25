async function createHandler(event) { // Function to handle the create post form submission
  event.preventDefault(); // Prevent the default form submission

  const titleElement = document.querySelector('input[name="post-title"]'); // Get the title input element
  const bodyElement = document.querySelector('textarea[name="post-body"]'); // Get the body input element

  if (titleElement && bodyElement) {    // Check if the title or body input element is not found/
      const title = titleElement.value.trim(); // Get the title from the form
      const body = bodyElement.value.trim();    // Get the body from the form
  
      if (title && body) { // Check if the title and body are not empty
          const response = await fetch("/api/posts", { // Send a request to the API endpoint
              method: "POST", // Use the POST method
              body: JSON.stringify({ title, body }), // Convert the title and body to a JSON string
              headers: { "Content-Type": "application/json" }, // Set the content type to JSON
          });
      
          if (response.ok) { // Check if the response is OK
              document.location.replace("/dashboard"); // Redirect to the dashboard after creating the post
          } else {
              console.log(response.statusText); // Log the response status text
              alert("Failed to post"); // Alert the user that the post failed
          }
      }
  } else { // Log an error if the title or body input element is not found
      console.error("Form elements not found"); // Log an error if the form elements are not found
  }
};

document.querySelector('#create-post-form').addEventListener('submit', createHandler); // Add an event listener for the create post form