import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from "./components/Homepage";
import BookingPage from "./components/BookingPage";
function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
