export const shortenText = (text, maxLength) => {
    if (typeof text !== "string" || text.length <= maxLength) {
      return text;
    }
  
    const shortened = text.substr(0, maxLength) + "...";
    return shortened;
  };