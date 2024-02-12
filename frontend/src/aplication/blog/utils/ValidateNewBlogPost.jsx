// NewBlogPostValidation.jsx
export const validateNewBlogPost = (inputs, files, isLoggedIn, isVerified) => {
    let errors = {};
  
    if (!isLoggedIn || !isVerified) {
      errors.form = "You must be logged in and verified to create a blog post.";
    }
  
    if (!files || files.length === 0) {
      errors.file = "The file is required.";
    }
  
    ['title', 'description', 'date', 'tags'].forEach(key => {
      if (!inputs[key]) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    });
  
    return errors;
  };