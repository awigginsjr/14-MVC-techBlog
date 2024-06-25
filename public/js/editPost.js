
// Edit post form handler
document.addEventListener('DOMContentLoaded', () => {
  const postIdInput = document.querySelector('input[name="post-id"]'); // Get the post ID from the URL
  if (!postIdInput) {
    console.error('Post ID input element not found.');
    return;
  }
  
  const postId = postIdInput.value; // Get the post ID from the input element

  const editPostHandler = async function (event) { // Function to handle the edit post form submission
    event.preventDefault();

    const titleInput = document.querySelector('input[name="post-title"]'); // Get the title input element
    const bodyInput = document.querySelector('textarea[name="post-body"]'); // Get the body input element

    if (!titleInput || !bodyInput) { // Check if the title or body input element is not found
      console.error('Title or body input element not found.');
      return;
    }

    const title = titleInput.value; // Get the title from the form
    const body = bodyInput.value; // Get the body from the form

    await fetch(`/api/posts/${postId}`, { // Send a request to the API endpoint
      method: 'PUT',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    document.location.replace('/dashboard'); // Redirect to the dashboard after editing the post
  };

  const deleteClickHandler = async function () {  // Function to handle the delete button click
    await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    document.location.replace('/dashboard/'); // Redirect to the dashboard after deleting the post
  };

  const editPostForm = document.querySelector('#edit-post-form'); // Get the edit post form element
  const deleteBtn = document.querySelector('#delete-btn'); // Get the delete button element
  if (editPostForm) {
    editPostForm.addEventListener('submit', editPostHandler);  // Add an event listener for the edit post form
  } else {
    console.error('Edit post form not found.'); // Log an error if the edit post form is not found
  }
  if (deleteBtn) {
    deleteBtn.addEventListener('click', deleteClickHandler); // Add an event listener for the delete button
  } else {
    console.error('Delete button not found.'); // Log an error if the delete button is not found
  }
});
