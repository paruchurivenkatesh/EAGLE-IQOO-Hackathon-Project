import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Analysis from './pages/Analysis';
import Result from './pages/Result';
import ProductDetails from './pages/ProductDetails';
import Comparison from './pages/Comparison';
import History from './pages/History';
import Reports from './pages/Reports';
import Database from './pages/Database';
import About from './pages/About';
import Settings from './pages/Settings';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        
        {/* Full screen routes without standard layout */}
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/result" element={<Result />} />

        {/* Routes with Sidebar/MobileNav Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<ProductDetails />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/history" element={<History />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/database" element={<Database />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
