import { useState, useReducer } from "react";
import BookingSlotsList from "./BookingSlotsList";
import "../booking.css"

const BookingForm = ({ availableTimes, dispatch, submitForm, bookedSlots }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    // Dispatch action to update available times based on selected date
    dispatch({ type: 'UPDATE_TIMES', payload: selectedDate });
  };

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date,
      time,
      guests,
      occasion
    };
    
    if (submitForm(formData)) {
      // Reset form on successful submission
      setDate('');
      setTime('');
      setGuests(1);
      setOccasion('Birthday');
      alert('Reservation submitted successfully!');
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-form-container">
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Reserve a Table</h2>
        
        <div className="form-group">
          <label htmlFor="res-date" className="form-label">Choose date</label>
          <input 
            type="date" 
            id="res-date" 
            name="res-date"
            className="form-input"
            value={date}
            min={today}
            onChange={handleDateChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="res-time" className="form-label">Choose time</label>
          <select 
            id="res-time" 
            name="res-time"
            className="form-select"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Select a time</option>
            {availableTimes.map((timeSlot) => (
              <option key={timeSlot} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="guests" className="form-label">Number of guests</label>
          <input 
            type="number" 
            placeholder="1" 
            min="1" 
            max="10" 
            id="guests" 
            name="guests"
            className="form-input"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="occasion" className="form-label">Occasion</label>
          <select 
            id="occasion" 
            name="occasion"
            className="form-select"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          >
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Make Your Reservation
        </button>
      </form>

      <BookingSlotsList 
        selectedDate={date}
        availableTimes={availableTimes}
        bookedSlots={bookedSlots}
        selectedTime={time}
        onTimeSelect={handleTimeSelect}
      />
    </div>
  );
};

export default BookingForm;