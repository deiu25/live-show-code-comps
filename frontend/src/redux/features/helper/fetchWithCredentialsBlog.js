export const fetchWithCredentialsBlog = async (url, options) => {
  const headers = {};

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  
  // Log the body being sent to the server
  console.log('Sending request to server with body:', options.body);

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `Network response was not ok, status code: ${response.status}`
    );
  }

  return response.json();
};