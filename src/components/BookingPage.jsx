import "../index.css";
import "../booking.css";
import BookingForm from "./BookingForm";

const BookingPage = ({ availableTimes, dispatch, submitForm, bookedSlots }) => {
  return (
    <div className="booking-page">
      <div className="booking-hero">
        <div className="container">
          <h1 className="booking-hero-title">Book a Table</h1>
          <p className="booking-hero-subtitle">
            Reserve your table at Little Lemon and enjoy our authentic Mediterranean cuisine
          </p>
        </div>
      </div>
      
      <div className="booking-form-section">
        <div className="container">
          <BookingForm 
            availableTimes={availableTimes} 
            dispatch={dispatch}
            submitForm={submitForm}
            bookedSlots={bookedSlots}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;