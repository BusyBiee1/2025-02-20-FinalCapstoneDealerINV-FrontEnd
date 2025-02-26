// import dependencies
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import VehicleTable from './VehicleTable'; 
import handleApiError from '../utils/errorHandler'; 
import '../styles/Search.css'; 

function Search() {
  // State to manage the search field (e.g., 'all', 'make', 'model')
  const [searchField, setSearchField] = useState('all');
  // State to manage the search value (e.g., 'Toyota', 'Camry')
  const [searchValue, setSearchValue] = useState('');
  // State to store the search results (vehicles array)
  const [vehicles, setVehicles] = useState([]);
  // State to manage error messages
  const [error, setError] = useState(null);

  // Function to handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Clear any previous errors
    try {
      let url = `${import.meta.env.VITE_API_URL}/api/vehicles`; // Base URL for the vehicles API
      // If a specific search field and value are selected, append them to the URL
      if (searchField !== 'all' && searchValue.trim() !== '') {
        url += `/search?${searchField}=${encodeURIComponent(searchValue.trim())}`; 
      }
      // Make a GET request to the search URL using axios
      const response = await axios.get(url);
      // Set the vehicles state with the search results
      setVehicles(response.data);
    } catch (error) {
      // Handle API errors using the errorHandler utility
      const errorMessage = handleApiError(error);
      setError(errorMessage); // Set the error message
    }
  };

  // useEffect hook to perform an initial search when the component mounts
  useEffect(() => {
    handleSearch({ preventDefault: () => {} }); // Perform an initial search with empty search criteria
  }, []); // Empty dependency array means this effect runs only once on mount

  // Function to handle changes in the search field dropdown
  const handleDropdownChange = (e) => {
    const selectedField = e.target.value; // Get the selected search field
    setSearchField(selectedField); // Update the searchField state
    if (selectedField === 'all') {
      setSearchValue(''); // Clear the search value if 'all' is selected
    }
  };

  // Function to handle editing a vehicle
  const handleEdit = async (updatedVehicle) => {
    try {
      // Make a PUT request to update the vehicle using axios
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/vehicles/${updatedVehicle.v_id}`, updatedVehicle);
      // Update the vehicles state with the updated vehicle
      setVehicles(vehicles.map(v => v.v_id === updatedVehicle.v_id ? response.data : v));
    } catch (error) {
      // Handle API errors using the errorHandler utility
      const errorMessage = handleApiError(error);
      setError(errorMessage); // Set the error message
    }
  };

  // Function to handle deleting a vehicle
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to delete the vehicle using axios
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/vehicles/${id}`);
      // Update the vehicles state by filtering out the deleted vehicle
      setVehicles(vehicles.filter(v => v.v_id !== id));
    } catch (error) {
      // Handle API errors using the errorHandler utility
      const errorMessage = handleApiError(error);
      setError(errorMessage); // Set the error message
    }
  };

  return (
    <div className="search"> 
      <h2>Search Inventory</h2> 
      <form onSubmit={handleSearch} className="search-controls"> 
        <select
          value={searchField}
          onChange={handleDropdownChange}
        >
          <option value="all">All</option>
          <option value="make">Make</option>
          <option value="model">Model</option>
          <option value="color">Color</option>
          <option value="year">Year</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search value"
          disabled={searchField === 'all'} // Disable the input field if 'all' is selected
        />
        <button type="submit">Search</button>
      </form>
      {error && <div className="error-message">{error}</div>} {/* Conditionally render error message if there is an error */}
      <div className="table-container"> 
        <VehicleTable vehicles={vehicles} onEdit={handleEdit} onDelete={handleDelete} /> {/* Render the VehicleTable component with search results and edit/delete handlers */}
      </div>
    </div>
  );
}

export default Search; 