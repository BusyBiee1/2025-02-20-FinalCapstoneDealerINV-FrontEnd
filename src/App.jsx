import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
        <Banner />
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={
            <>
              <Navigation />
              <DashboardPage />
            </>
          } />          
              <Navigation />
              <SearchPage />
              <>
              <Navigation />
              <AddPage />
            </>
        </Routes>
    </Router>
  );
}

export default App;