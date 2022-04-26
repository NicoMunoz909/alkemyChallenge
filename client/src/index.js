import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout';
import Home from './Components/Home';
import Moves from './Components/Moves';

const container = document.getElementById('root');
const root = createRoot(container) 

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='moves' element={<Moves />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
