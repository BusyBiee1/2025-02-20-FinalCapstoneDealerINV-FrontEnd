function handleApiError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("API Error:", error.response.data);
    return error.response.data.message || "An error occurred while processing your request.";
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Network Error:", error.request);
    return "Unable to connect to the server. Please check your internet connection.";
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Request Error:", error.message);
    return "An unexpected error occurred. Please try again later.";
  }
}

export default handleApiError;
