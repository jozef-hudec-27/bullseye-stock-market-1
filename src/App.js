import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchStock from './pages/SearchStock';
import StockDetails from './pages/StockDetails';
import News from './pages/News';

const App = () => {

  const [range, setRange] = useState('3mo')


  return (
      <div>

          <Router>
          <Navbar />  
              <Routes>

                <Route path='/' element={<HomePage />} />
                <Route path='/search/:searchedStock'element={<SearchStock />} />
                <Route path='/stock/:stockSymbol' element={<StockDetails range={range} setRange={setRange} />} />
                <Route path='/news' element={<News searchQuery='Business,Stocks,Money' freshness='Month' count={40} />} />
   
              </Routes>
          <Footer />
          </Router>

      </div>
  )
};

export default App;