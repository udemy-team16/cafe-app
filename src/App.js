import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './page/LandingPage';

import AllListPage from './page/AllListPage';
import Footer from './components/Footer';
import LikePage from './page/LikePage';
import DetailPage from './page/DetailPage';
import SeatPage from './page/SeatPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/list' element={<AllListPage />} />
        <Route path='/list/:id' element={<DetailPage />} />
        <Route path='/list/:id/seat' element={<SeatPage />} />
        <Route path='/likelist' element={<LikePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;