import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './HomePage/MainPage';
import SelectDashboard from './HomePage/SelectDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/selectDashboard" element={<SelectDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
