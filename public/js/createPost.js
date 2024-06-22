// const createHandler = async(event) => {
//     event.preventDefault();
  
//     const title = document.querySelector('input[name="post-title"]').value.trim();
//     const body = document.querySelector('textarea[name="post-body"]').value.trim();

//     if (title && body) {
//         const response = await fetch("/api/posts", {
//           method: "POST",
//           body: JSON.stringify({ title, body }),
//           headers: { "Content-Type": "application/json" },
//         });
    
//         if (response.ok) {
//           document.location.replace("/dashboard");
//         } else {
//           console.log(response.statusText);
//           alert("Failed to post");
//         }
//     }
// };

// document.querySelector('#create-post-form').addEventListener('submit', createHandler );

async function createHandler(event) {
  event.preventDefault();

  const titleElement = document.querySelector('input[name="post-title"]');
  const bodyElement = document.querySelector('textarea[name="post-body"]');

  if (titleElement && bodyElement) {
      const title = titleElement.value.trim();
      const body = bodyElement.value.trim();
  
      if (title && body) {
          const response = await fetch("/api/posts", {
              method: "POST",
              body: JSON.stringify({ title, body }),
              headers: { "Content-Type": "application/json" },
          });
      
          if (response.ok) {
              document.location.replace("/dashboard");
          } else {
              console.log(response.statusText);
              alert("Failed to post");
          }
      }
  } else {
      console.error("Form elements not found");
  }
};

document.querySelector('#create-post-form').addEventListener('submit', createHandler);