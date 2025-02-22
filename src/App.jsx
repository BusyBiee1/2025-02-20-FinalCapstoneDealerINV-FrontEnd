import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage';
import AddPage from './pages/AddPage';
import Banner from './components/Banner';
import Navigation from './components/Navigation';
import './styles/App.css';  // Import the CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <Banner />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={
            <>
              <Navigation />
              <DashboardPage />
            </>
          } />
          <Route path="/search" element={
            <>
              <Navigation />
              <SearchPage />
            </>
          } />
          <Route path="/add" element={
            <>
              <Navigation />
              <AddPage />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;