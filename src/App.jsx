import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
        <Banner />
        <Routes>
              <DashboardPage />
              <SearchPage />
              <AddPage />
        </Routes>
    </Router>
  );
}

export default App;