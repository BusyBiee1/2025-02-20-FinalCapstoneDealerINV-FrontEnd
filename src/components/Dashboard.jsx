import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [vehicleCount, setVehicleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('API URL:', import.meta.env.VITE_API_URL); // Log the API URL
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles`);
        console.log('API Response:', response.data); // Log the API response

        if (Array.isArray(response.data)) {
          setVehicleCount(response.data.length);
        } else if (typeof response.data === 'object' && response.data.count !== undefined) {
          setVehicleCount(response.data.count);
        } else {
          throw new Error('Unexpected data format received from API');
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        if (error.response) {
          setError(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          setError('No response received from server. Please check your network connection.');
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div className="dashboard">Loading vehicle data...</div>;
  }

  if (error) {
    return (
      <div className="dashboard error">
        <h2>Dashboard</h2>
        <p>Error: {error}</p>
        <p>Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>{vehicleCount} vehicles of various Makes and Models available</p>
    </div>
  );
}

export default Dashboard;
