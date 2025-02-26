
import React, { useState } from 'react';
import '../styles/VehicleTable.css';

function VehicleTable({ vehicles, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editedVehicle, setEditedVehicle] = useState({});

  const handleEditClick = (vehicle) => {
    setEditingId(vehicle.v_id);
    setEditedVehicle({ ...vehicle });
  };

  const handleSave = () => {
    onEdit(editedVehicle);
    setEditingId(null);
  };

  const handleChange = (e, field) => {
    setEditedVehicle({ ...editedVehicle, [field]: e.target.value });
  };

  const handleDelete = (v_id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      onDelete(v_id);
    }
  };

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
      <tbody>
        {vehicles.map((vehicle) => (
          <tr key={vehicle.v_id}>
            <td>{vehicle.v_id}</td>
            <td>
              {editingId === vehicle.v_id ? (
                <input value={editedVehicle.make} onChange={(e) => handleChange(e, 'make')} />
              ) : (
                vehicle.make
              )}
            </td>
            <td>
              {editingId === vehicle.v_id ? (
                <input value={editedVehicle.model} onChange={(e) => handleChange(e, 'model')} />
              ) : (
                vehicle.model
              )}
            </td>
            <td>
              {editingId === vehicle.v_id ? (
                <input value={editedVehicle.color} onChange={(e) => handleChange(e, 'color')} />
              ) : (
                vehicle.color
              )}
            </td>
            <td>
              {editingId === vehicle.v_id ? (
                <input value={editedVehicle.year} onChange={(e) => handleChange(e, 'year')} />
              ) : (
                vehicle.year
              )}
            </td>
            <td>
              <div className="button-container">
                {editingId === vehicle.v_id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(vehicle)}>Edit</button>
                )}
                <button onClick={() => handleDelete(vehicle.v_id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VehicleTable;



// import React, { useState } from 'react';
// import '../styles/VehicleTable.css';

// function VehicleTable({ vehicles, onEdit, onDelete }) {
//   const [editingId, setEditingId] = useState(null);
//   const [editedVehicle, setEditedVehicle] = useState({});

//   const handleEditClick = (vehicle) => {
//     setEditingId(vehicle.v_id);
//     setEditedVehicle({ ...vehicle });
//   };

//   const handleSave = () => {
//     onEdit(editedVehicle);
//     setEditingId(null);
//   };

//   const handleChange = (e, field) => {
//     setEditedVehicle({ ...editedVehicle, [field]: e.target.value });
//   };

//   return (
//     <table className="vehicle-table">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Make</th>
//           <th>Model</th>
//           <th>Color</th>
//           <th>Year</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {vehicles.map((vehicle) => (
//           <tr key={vehicle.v_id}>
//             <td>{vehicle.v_id}</td>
//             <td>
//               {editingId === vehicle.v_id ? (
//                 <input value={editedVehicle.make} onChange={(e) => handleChange(e, 'make')} />
//               ) : (
//                 vehicle.make
//               )}
//             </td>
//             <td>
//               {editingId === vehicle.v_id ? (
//                 <input value={editedVehicle.model} onChange={(e) => handleChange(e, 'model')} />
//               ) : (
//                 vehicle.model
//               )}
//             </td>
//             <td>
//               {editingId === vehicle.v_id ? (
//                 <input value={editedVehicle.color} onChange={(e) => handleChange(e, 'color')} />
//               ) : (
//                 vehicle.color
//               )}
//             </td>
//             <td>
//               {editingId === vehicle.v_id ? (
//                 <input value={editedVehicle.year} onChange={(e) => handleChange(e, 'year')} />
//               ) : (
//                 vehicle.year
//               )}
//             </td>
//             <td>
//               <div className="button-container">
//                 {editingId === vehicle.v_id ? (
//                   <button onClick={handleSave}>Save</button>
//                 ) : (
//                   <button onClick={() => handleEditClick(vehicle)}>Edit</button>
//                 )}
//                 <button onClick={() => onDelete(vehicle.v_id)}>Delete</button>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default VehicleTable;
