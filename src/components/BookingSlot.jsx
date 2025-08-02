import "../booking.css";
const BookingSlot = ({ time, isAvailable, guests, occasion, onSelect, isSelected }) => {
  return (
    <div 
      className={`booking-slot ${isAvailable ? 'available' : 'booked'} ${isSelected ? 'selected' : ''}`}
      onClick={isAvailable ? () => onSelect(time) : undefined}
    >
      <div className="slot-time">{time}</div>
      <div className="slot-status">
        {isAvailable ? (
          <span className="status-available">Available</span>
        ) : (
          <div className="status-booked">
            <span>Booked</span>
            {guests && <span className="slot-details">{guests} guests</span>}
            {occasion && <span className="slot-details">{occasion}</span>}
          </div>
        )}
      </div>
      {isAvailable && (
        <div className="slot-action">
          <span className="select-text">Click to select</span>
        </div>
      )}
    </div>
  );
};

export default BookingSlot;