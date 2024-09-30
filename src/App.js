import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductList from "./components/ProductList";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
        </Routes>
      </Router>
  );
}

export default App;
