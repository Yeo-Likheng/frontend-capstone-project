// Initialize times function
export const initializeTimes = () => {
  return [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  ];
};

// Times reducer function
export const updateTimes = (state, action) => {
  if (!action || typeof action !== 'object') {
    return state;
  }
  
  switch (action.type) {
    case 'UPDATE_TIMES':
      // For now, return the same times regardless of date
      // In a real app, this would filter times based on the selected date
      return initializeTimes();
    default:
      return state;
  }
};
