import React from 'react';
import bannerImage from '../assets/images/banner.jpg'; 
import '../styles/Banner.css'; // Import the CSS file

function Banner () {
//const Banner = () => {
  return (
    <div className="banner-wrapper">
      <div className="banner">
        <img src={bannerImage} alt="Dealer Vehicle Tracking System" className="banner-image" />
      </div>
      <h1 className="banner-title">Dealer Vehicle Tracking System</h1>
    </div>
  );
}  
//   return (
//     <div className="banner">
//       <img src={bannerImage} alt="Dealer Vehicle Tracking System" className="banner-image" />
//       <h1>Dealer Vehicle Tracking System</h1>
//     </div>
//   );
// };

export default Banner;