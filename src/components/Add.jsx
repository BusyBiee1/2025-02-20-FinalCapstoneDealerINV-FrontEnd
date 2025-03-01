// import dependencies
import React, { useState } from 'react'; 
import axios from 'axios';  
import '../styles/Add.css'; 

function Add() {
  // State to manage the vehicle form data
  const [vehicle, setVehicle] = useState({ make: '', model: '', color: '', year: '' });
  // State to manage error messages
  const [error, setError] = useState(null);
  // State to manage success messages
  const [success, setSuccess] = useState(false);

  // Function to handle input changes in the form
  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value }); // Update the vehicle state with the new input value
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Clear any previous errors
    setSuccess(false); // Clear any previous success messages
    try {
      // Send a POST request to the vehicles API endpoint using axios
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/vehicles`, vehicle);
      console.log('Vehicle added:', response.data); // Log the response data
      setSuccess(true); // Set success to true
      setVehicle({ make: '', model: '', color: '', year: '' }); // Reset the form fields
    } catch (error) {
      console.error('Error adding vehicle:', error); // Log any errors
      // Set error message from the API response or a default message
      setError(error.response?.data?.message || 'An error occurred while adding the vehicle');
    }
  };

  return (
    <div className="add"> 
      <h2>Add Inventory</h2> 
      {error && <div className="error-message">{error}</div>} {/* Conditionally render error message if there is an error */}
      {success && <div className="success-message">Vehicle added successfully!</div>} {/* Conditionally render success message if successful */}
      <form onSubmit={handleSubmit} className="add-form"> 
        <input className="input-field" name="make" value={vehicle.make} onChange={handleChange} placeholder="Make" required /> {/* Input field for vehicle make */}
        <input className="input-field" name="model" value={vehicle.model} onChange={handleChange} placeholder="Model" required /> {/* Input field for vehicle model */}
        <input className="input-field" name="color" value={vehicle.color} onChange={handleChange} placeholder="Color" required /> {/* Input field for vehicle color */}
        <input className="input-field" name="year" value={vehicle.year} onChange={handleChange} placeholder="Year" type="number" required /> {/* Input field for vehicle year */}
        <button type="submit" className="submit-button">Add Vehicle</button> {/* Submit button */}
      </form>
    </div>
  );
}

export default Add; 