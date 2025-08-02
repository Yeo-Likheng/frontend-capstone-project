import { fetchAPI, submitAPI } from './api';

export const initializeTimes = () => {
  return fetchAPI(new Date());
};

export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      const selectedDate = new Date(action.payload);
      return fetchAPI(selectedDate);
    default:
      return state;
  }
};

export const submitForm = (formData) => {
  return submitAPI(formData);
};

export const timesReducer = (state, action) => {
  return updateTimes(state, action);
};
