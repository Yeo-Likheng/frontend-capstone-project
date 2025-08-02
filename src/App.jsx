import { useState } from 'react'
import { useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from "./components/Homepage";
import BookingPage from "./components/BookingPage";
import ConfirmBooking from './components/ConfirmBooking';
import { initializeTimes, submitForm, timesReducer } from "./utils/timesReducer";
import "./index.css";
import "./booking.css";


const getBookedSlots = () => {
  return [
    
  ];
};

function App() {
  

  const [currentPage, setCurrentPage] = useState('home');
  const [availableTimes, dispatch] = useReducer(timesReducer, initializeTimes());
  const [bookedSlots] = useState(getBookedSlots());


  return (
    <BrowserRouter>
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Homepage setCurrentPage={setCurrentPage} />} />
          <Route path="/reservations" element={<BookingPage 
            availableTimes={availableTimes} 
            dispatch={dispatch}
            submitForm={submitForm}
            bookedSlots={bookedSlots}
          />} />
          <Route 
            path="/booking-confirmation" 
            element={<ConfirmBooking />} 
          />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App
