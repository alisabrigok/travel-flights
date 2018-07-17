import * as actionTypes from './types';

// action that is triggered by airport selection change for origin select
export const getOrigin = origin => {
  return {
    type: actionTypes.GET_ORIGIN,
    payload: origin
  };
};

// action that is triggered by airport selection change for destination select
export const getDestination = destination => {
  return {
    type: actionTypes.GET_DESTINATION,
    payload: destination
  };
};

// action that is triggered by date picker date change for departures
export const getDepartureDate = departureDate => {
  return {
    type: actionTypes.GET_DEPARTURE_DATE,
    payload: departureDate
  };
};
// action that is triggered by date picker date change for returns
export const getReturnDate = returnDate => {
  return {
    type: actionTypes.GET_RETURN_DATE,
    payload: returnDate
  };
};
