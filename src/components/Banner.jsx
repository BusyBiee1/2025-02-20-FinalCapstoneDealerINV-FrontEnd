// import dependencies
import React from 'react'; 
import bannerImage from '../assets/images/banner.jpg'; 
import '../styles/Banner.css'; 

function Banner () {
  return (
    <div className="banner-wrapper"> 
      <div className="banner"> 
        <img src={bannerImage} alt="Dealer Vehicle Tracking System" className="banner-image" /> 
      </div>
      <h1 className="banner-title">Dealer Vehicle Tracking System</h1> {/* Heading for the banner title, styled with 'banner-title' class */}
    </div>
  );
}

export default Banner; 