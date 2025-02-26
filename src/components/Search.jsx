import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleTable from './VehicleTable';
import handleApiError from '../utils/errorHandler';
import '../styles/Search.css';

function Search() {
  const [searchField, setSearchField] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      let url = `${import.meta.env.VITE_API_URL}/api/vehicles`;
      if (searchField !== 'all' && searchValue.trim() !== '') {
        url += `/search?${searchField}=${encodeURIComponent(searchValue.trim())}`;
      }
      const response = await axios.get(url);
      setVehicles(response.data);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    handleSearch({ preventDefault: () => {} });
  }, []);

  const handleDropdownChange = (e) => {
    const selectedField = e.target.value;
    setSearchField(selectedField);
    if (selectedField === 'all') {
      setSearchValue('');
    }
  };

  const handleEdit = async (updatedVehicle) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/vehicles/${updatedVehicle.v_id}`, updatedVehicle);
      setVehicles(vehicles.map(v => v.v_id === updatedVehicle.v_id ? response.data : v));
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/vehicles/${id}`);
      setVehicles(vehicles.filter(v => v.v_id !== id));
    } catch (error) {
      const errorMessage = handleApiError(error);
      setError(errorMessage);
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
          disabled={searchField === 'all'}
        />
        <button type="submit">Search</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div className="table-container">
        <VehicleTable vehicles={vehicles} onEdit={handleEdit} onDelete={handleDelete} />
      </div>      
      {/* <VehicleTable vehicles={vehicles} onEdit={handleEdit} onDelete={handleDelete} /> */}
    </div>
  );
}

export default Search;

