import React from 'react';
//import Banner from '../components/Banner';
import Navigation from '../components/Navigation';
import Login from '../components/Login';

function HomePage () {
//const HomePage = () => {
  return (
    <div className="home-page">
      {/* <Banner /> */}
      {/* <Navigation /> */}
      {/* <h2>Welcome to Dealer Vehicle Tracking System</h2> */}
      <Login />
    </div>
  );
};

export default HomePage;
