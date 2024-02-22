export const fetchWithCredentialsBlog = async (url, options = {}) => {
  const headers = {};

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    credentials: "include",
  });

  const text = await response.text();
  
  if (!response.ok) {
    throw new Error(
      `Network response was not ok, status code: ${response.status}`
    );
  }
  
  return text.length ? JSON.parse(text) : {};
};