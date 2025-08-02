import { useState } from 'react'
import { useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from "./components/Homepage";
import BookingPage from "./components/BookingPage";
import { initializeTimes, updateTimes } from "./utils/timesReducer";
import "./index.css";
import "./booking.css";

// Mock booked slots data
const getBookedSlots = () => {
  return [
    {
      time: '18:00',
      guests: 4,
      occasion: 'Anniversary',
      date: new Date().toISOString().split('T')[0] // Today's date
    },
    {
      time: '19:30',
      guests: 2,
      occasion: 'Birthday',
      date: new Date().toISOString().split('T')[0]
    },
    {
      time: '21:00',
      guests: 6,
      occasion: 'Anniversary',
      date: new Date().toISOString().split('T')[0]
    }
  ];
};

// Submit form function
const submitAPI = (formData) => {
  // In a real app, this would send data to an API
  console.log('Submitting reservation:', formData);
  return true; // Simulate successful submission
};
function App() {
 

  const [currentPage, setCurrentPage] = useState('home');
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [bookedSlots] = useState(getBookedSlots()); // In real app, this would come from API

  const submitForm = (formData) => {
    return submitAPI(formData);
  };

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
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App
