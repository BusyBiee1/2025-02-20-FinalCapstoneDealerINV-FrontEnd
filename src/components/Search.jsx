// import dependencies
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import VehicleTable from './VehicleTable'; 
import handleApiError from '../utils/errorHandler'; 
import '../styles/Search.css'; 

function Search() {
  // State to manage the search field (e.g., 'all', 'make', 'model'). This state is updated when the user selects a search field from the dropdown
  const [searchField, setSearchField] = useState('all');
  // State to manage the search value (e.g., 'Toyota', 'Camry'). This state is updated when the user types in the search input field
  const [searchValue, setSearchValue] = useState('');
  // State to store the search results (vehicles array). when this state is updated, the VehicleTable component will re-render
  const [vehicles, setVehicles] = useState([]);
  // State to manage error messages while data fetching. This state is updated when an error occurs during the API request
  const [error, setError] = useState(null);

  // Function to handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Clear any previous errors. It triggers a state change and a rerender but since nothing is in the error msg there is no display. Only way to clear.
    try {
      let url = `${import.meta.env.VITE_API_URL}/api/vehicles`; // Base URL for the vehicles API
      // If a specific search field and value are selected, append them to the URL
      if (searchField !== 'all' && searchValue.trim() !== '') {
        url += `/search?${searchField}=${encodeURIComponent(searchValue.trim())}`;  // prepare the url to query the mongodb
      }
      // Make a GET request to the search URL using axios for the search field value
      const response = await axios.get(url);
      // Set the vehicles state with the search results. The VehicleTable component will re-render with the updated vehicles
      setVehicles(response.data);  
    } catch (error) {
      // Handle API errors using the errorHandler utility
      const errorMessage = handleApiError(error);
      setError(errorMessage); // Set the error message which will casuse the component to rerender and disply that msg in errorMessage
    }
  };

  // useEffect hook to perform an initial search when the component mounts. 
  // The useEffect hook works with handleSearch: useEffect runs the handleSearch function after the component renders. 
  // Basically every time this component updates, check if handleSearch needs to be called as per stated dependencies (in array), like [searchTerm], 
  // it only re-runs handleSearch when searchTerm changes. But here it is a dempty dependency array, so it runs only once.
  // which bring all the vehicles from the database as default search
  useEffect(() => {
    handleSearch({ preventDefault: () => {} }); // Prevent default behavior of submit btn and Perform an initial search with empty search criteria
  }, []); // Empty dependency array means this effect runs only once on mount

  // Function to handle changes in the search field dropdown
  const handleDropdownChange = (e) => {
    const selectedField = e.target.value; // Get the selected search field
    setSearchField(selectedField); // Update the searchField state
    if (selectedField === 'all') {
      setSearchValue(''); // Clear the search value if 'all' is selected. This will trigger a new search with empty search criteria.
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