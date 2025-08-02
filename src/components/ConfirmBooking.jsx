import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, Phone, Mail, CheckCircle, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import "../confirm.css";

const ConfirmBooking = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData || {
    name: 'Guest',
    date: '2025-08-15',
    time: '19:00',
    guests: 4,
    occasion: 'Anniversary',
  };
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Generate confirmation number
    const generateConfirmationNumber = () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      let result = '';
      
      // 2 letters + 4 numbers format
      for (let i = 0; i < 2; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      for (let i = 0; i < 4; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }
      return result;
    };

    setConfirmationNumber(generateConfirmationNumber());
    
    // Trigger animation
    setTimeout(() => setShowAnimation(true), 100);
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="confirmation-wrapper">
      <div className={`confirmation-container ${showAnimation ? 'animate-in' : ''}`}>
        {/* Header Section */}
        <div className="header">
          <div className="header-background"></div>
          <div className="success-icon">
            <CheckCircle size={48} />
          </div>
          <h1>Booking Confirmed!</h1>
          <p>Your table has been successfully reserved</p>
        </div>

        {/* Content Section */}
        <div className="content">
          {/* Restaurant Info */}
          <div className="restaurant-info">
            <h2 className="restaurant-name">Little Lemon</h2>
            <p className="restaurant-tagline">Mediterranean Excellence in Every Bite</p>
          </div>

          {/* Confirmation Number */}
          <div className="confirmation-number">
            <h3>Confirmation Number</h3>
            <div className="confirmation-code">{confirmationNumber}</div>
            <p className="confirmation-note">Please save this number for your records</p>
          </div>

          {/* Booking Details */}
          <div className="booking-details">
            <h3>Reservation Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-icon">
                  <User size={20} />
                </div>
                <div className="detail-text">
                  <div className="detail-label">Name</div>
                  <div className="detail-value">{bookingData.name}</div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <Calendar size={20} />
                </div>
                <div className="detail-text">
                  <div className="detail-label">Date</div>
                  <div className="detail-value">{formatDate(bookingData.date)}</div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <Clock size={20} />
                </div>
                <div className="detail-text">
                  <div className="detail-label">Time</div>
                  <div className="detail-value">{formatTime(bookingData.time)}</div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <Users size={20} />
                </div>
                <div className="detail-text">
                  <div className="detail-label">Party Size</div>
                  <div className="detail-value">{bookingData.guests} {bookingData.guests === 1 ? 'Guest' : 'Guests'}</div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <span>🎉</span>
                </div>
                <div className="detail-text">
                  <div className="detail-label">Occasion</div>
                  <div className="detail-value">{bookingData.occasion}</div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
