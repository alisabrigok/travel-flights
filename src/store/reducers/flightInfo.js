import * as actionTypes from '../actions/types';
import moment from 'moment';

// set initial dates, departure as current day and return as a week from current day
const initialState = {
  departureDate: moment(),
  returnDate: moment().add(7, 'd'),
  origin: 'IST',
  destination: 'ESB',
  sameSelection: false
};

// update only departure date unless the condition below matches
const updateDepartureDate = (state, action) => {
  // check if departure date is after return date. if so make both date the same
  if (moment(action.payload).isAfter(state.returnDate)) {
    return {
      ...state,
      departureDate: action.payload,
      returnDate: action.payload
    };
  }
  return {
    ...state,
    departureDate: action.payload
  };
};

// update only return date unless the condition below matches
const updateReturnDate = (state, action) => {
  // check if return date is before return date. if so make them the same
  if (moment(action.payload).isBefore(state.departureDate)) {
    return {
      ...state,
      departureDate: action.payload,
      returnDate: action.payload
    };
  }
  return {
    ...state,
    returnDate: action.payload
  };
};

// update selected origin airport code
const updateOrigin = (state, action) => {
  return {
    ...state,
    origin: action.payload.value,
    sameSelection: state.destination === action.payload.value ? true : false
  };
};

// update selected destination airport code
const updateDestination = (state, action) => {
  return {
    ...state,
    destination: action.payload.value,
    sameSelection: state.origin === action.payload.value ? true : false
  };
};

// apply the methods based on triggered action type
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEPARTURE_DATE:
      return updateDepartureDate(state, action);
    case actionTypes.GET_RETURN_DATE:
      return updateReturnDate(state, action);
    case actionTypes.GET_ORIGIN:
      return updateOrigin(state, action);
    case actionTypes.GET_DESTINATION:
      return updateDestination(state, action);
    default:
      return state;
  }
};
