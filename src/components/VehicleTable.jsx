// import dependencies
import React, { useState, useMemo } from 'react'; 
import '../styles/VehicleTable.css'; 

function VehicleTable({ vehicles, onEdit, onDelete }) { // VehicleTable component, receives vehicles array and edit/delete functions as props
  const [editingId, setEditingId] = useState(null); // State to track the ID of the vehicle being edited
  const [editedVehicle, setEditedVehicle] = useState({}); // State to store the edited vehicle data

  // Function to handle the edit button click
  const handleEditClick = (vehicle) => {
    setEditingId(vehicle.v_id); // Set the editingId to the ID of the clicked vehicle
    setEditedVehicle({ ...vehicle }); // Create a copy of the vehicle data for editing
  };

  // Function to handle saving the edited vehicle
  const handleSave = () => {
    onEdit(editedVehicle); // Call the onEdit function passed as a prop, passing the edited vehicle data
    setEditingId(null); // Clear the editingId, exiting edit mode
  };

  // Function to handle input changes in the edit form
  const handleChange = (e, field) => {
    setEditedVehicle({ ...editedVehicle, [field]: e.target.value }); // Update the editedVehicle state with the new input value
  };

  // Function to handle deleting a vehicle
  const handleDelete = (v_id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) { // Confirm deletion with a window prompt
      onDelete(v_id); // Call the onDelete function passed as a prop, passing the vehicle ID
    }
  };

  // Sort vehicles in reverse order of v_id using useMemo for memoization
  const sortedVehicles = useMemo(() => {
    return [...vehicles].sort((a, b) => b.v_id - a.v_id); // Create a new array and sort it based on v_id
  }, [vehicles]); // Re-run the memoized function only when the vehicles prop changes

  return (
    <table className="vehicle-table"> 
      <thead> 
        <tr> 
          <th>ID</th> 
          <th>Make</th>
          <th>Model</th>
          <th>Color</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody> {/* Table body */}
        {sortedVehicles.map((vehicle) => ( // Map through the sortedVehicles array to create table rows
          <tr key={vehicle.v_id}> {/* Table row with unique key */}
            <td>{vehicle.v_id}</td> {/* Table data cells for vehicle properties */}
            <td>
              {editingId === vehicle.v_id ? ( // Conditional rendering: input field for editing, or display the vehicle's make
                <input value={editedVehicle.make} onChange={(e) => handleChange(e, 'make')} />
              ) : (
                vehicle.make
              )}
            </td>
            <td>
              {editingId === vehicle.v_id ? ( // Conditional rendering: input field for editing, or display the vehicle's model
                <input value={editedVehicle.model} onChange={(e) => handleChange(e, 'model')} />
              ) : (
                vehicle.model
              )}
            </td>
            <td>
              {editingId === vehicle.v_id ? ( // Conditional rendering: input field for editing, or display the vehicle's color
                <input value={editedVehicle.color} onChange={(e) => handleChange(e, 'color')} />
              ) : (
                vehicle.color
              )}
            </td>
            <td>
              {editingId === vehicle.v_id ? ( // Conditional rendering: input field for editing, or display the vehicle's year
                <input value={editedVehicle.year} onChange={(e) => handleChange(e, 'year')} />
              ) : (
                vehicle.year
              )}
            </td>
            <td>
              <div className="button-container"> 
                {editingId === vehicle.v_id ? ( // Conditional rendering: save button or edit button
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(vehicle)}>Edit</button> 
                )}
                <button onClick={() => handleDelete(vehicle.v_id)}>Delete</button> {/* Delete button */}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VehicleTable; // Export the VehicleTable component
