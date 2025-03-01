// import dependencies
import React from 'react';
//import Navigation from '../components/Navigation'; // Import the Navigation component
import Login from '../components/Login'; // Import the Login component

function HomePage () { // Define the HomePage functional component
  return (
    <div className="home-page"> 
      <Login /> {/* Render the Login component */}
    </div>
  );
};

export default HomePage; 
