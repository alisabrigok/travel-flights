import * as actionTypes from './types';

// action triggered by price filter and duration filter sliders
// filteredValues represents filteredPrice or filteredDuration. values represents 'price' or 'duration'
export const filterFlights = (
  event,
  filteredFirstValue,
  filteredSecondValue,
  firstValue,
  secondValue,
  departureFlights,
  returnFlights
) => {
  // get departure flights whose price and duration is smaller than or equal to filtered price and duration
  const filteredDepartureFlights = departureFlights.filter(flight => {
    return (
      flight[firstValue] <= filteredFirstValue &&
      flight[secondValue] <= filteredSecondValue
    );
  });

  // get return flights whose price and duration is smaller than or equal to filtered price and duration
  const filteredReturnFlights = returnFlights.filter(flight => {
    return (
      flight[firstValue] <= filteredFirstValue &&
      flight[secondValue] <= filteredSecondValue
    );
  });

  // pass the filtered flights, filtered price and filtered duration to reducers
  return {
    type: actionTypes.SET_FILTERED_FLIGHTS,
    payload: {
      filteredDepartureFlights,
      filteredReturnFlights,
      filteredPrice:
        firstValue === 'price' ? filteredFirstValue : filteredSecondValue,
      filteredDuration:
        firstValue === 'duration' ? filteredFirstValue : filteredSecondValue
    }
  };
};
