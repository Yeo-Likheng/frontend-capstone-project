import "../booking.css";
import BookingSlot from "./BookingSlot";

const BookingSlotsList = ({ selectedDate, availableTimes, bookedSlots, selectedTime, onTimeSelect }) => {
  if (!selectedDate) {
    return (
      <div className="slots-placeholder">
        <p>Please select a date to view available time slots</p>
      </div>
    );
  }

  // Combine available and booked times for display
  const allTimeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  ];

  return (
    <div className="booking-slots-container">
      <h3 className="slots-title">Available Time Slots for {selectedDate}</h3>
      <div className="slots-grid">
        {allTimeSlots.map((time) => {
          const isBooked = bookedSlots.some(slot => slot.time === time);
          const isAvailable = availableTimes.includes(time) && !isBooked;
          const bookedSlot = bookedSlots.find(slot => slot.time === time);
          
          return (
            <BookingSlot
              key={time}
              time={time}
              isAvailable={isAvailable}
              guests={bookedSlot?.guests}
              occasion={bookedSlot?.occasion}
              onSelect={onTimeSelect}
              isSelected={selectedTime === time}
            />
          );
        })}
      </div>
      <div className="slots-legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color booked"></div>
          <span>Booked</span>
        </div>
        <div className="legend-item">
          <div className="legend-color selected"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSlotsList;