// import dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function Dashboard() {
  // State to store the count of vehicles
  const [vehicleCount, setVehicleCount] = useState(0);
  // State to manage the loading state
  const [loading, setLoading] = useState(true);
  // State to manage any errors during data fetching
  const [error, setError] = useState(null);

  // useEffect hook to fetch vehicle data when the component mounts
  useEffect(() => {
    // Async function to fetch vehicles
    const fetchVehicles = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        setError(null); // Clear any previous errors
        console.log('API URL:', import.meta.env.VITE_API_URL); 
        // Make a GET request to the vehicles API endpoint using axios
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles`);
        console.log('API Response:', response.data); 
        // I can use this in the futgure - kind of comprehensive on the fly error handling to make sure that the data is in the format that I expect
        // Check the format of the response data to determine how to set vehicleCount
        if (Array.isArray(response.data)) {
          // If the response data is an array, set vehicleCount to the length of the array
          setVehicleCount(response.data.length);
        } else if (typeof response.data === 'object' && response.data.count !== undefined) {
          // If the response data is an object with a 'count' property, set vehicleCount to that value
          setVehicleCount(response.data.count);
        } else {
          // If the response data is in an unexpected format, throw an error
          throw new Error('Unexpected data format received from API');
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error); // Log any errors during data fetching
        // Handle different types of errors
        if (error.response) {
          // Server responded with an error status
          setError(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          // Request was made but no response was received
          setError('No response received from server. Please check your network connection.');
        } else {
          // Other types of errors
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false); // Set loading to false after fetching data or encountering an error
      }
    };

    fetchVehicles(); // Call the fetchVehicles function
  }, []); // Empty dependency array means this effect runs only once on mount

  // Conditional rendering: display loading message while data is being fetched
  if (loading) {
    return <div className="dashboard">Loading vehicle data...</div>;
  }

  // Conditional rendering: display error message if there was an error fetching data
  if (error) {
    return (
      <div className="dashboard error">
        <h2>Dashboard</h2>
        <p>Error: {error}</p>
        <p>Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    );
  }

  // Conditional rendering: display dashboard content with vehicle count
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>{vehicleCount} vehicles of various Makes and Models available</p>
    </div>
  );
}

export default Dashboard;