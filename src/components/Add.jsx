import React, { useState } from 'react';
import axios from 'axios';

function Add() {
  const [vehicle, setVehicle] = useState({ make: '', model: '', color: '', year: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/vehicles`, vehicle);
      console.log('Vehicle added:', response.data);
      setSuccess(true);
      setVehicle({ make: '', model: '', color: '', year: '' });
    } catch (error) {
      console.error('Error adding vehicle:', error);
      setError(error.response?.data?.message || 'An error occurred while adding the vehicle');
    }
  };

  return (
    <div className="add">
      <h2>Add Inventory</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Vehicle added successfully!</div>}
      <form onSubmit={handleSubmit}>
        <input name="make" value={vehicle.make} onChange={handleChange} placeholder="Make" required />
        <input name="model" value={vehicle.model} onChange={handleChange} placeholder="Model" required />
        <input name="color" value={vehicle.color} onChange={handleChange} placeholder="Color" required />
        <input name="year" value={vehicle.year} onChange={handleChange} placeholder="Year" type="number" required />
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
}

export default Add;


