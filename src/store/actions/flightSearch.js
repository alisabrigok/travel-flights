import * as actionTypes from './types';
import axios from '../../axios';
import * as _ from '../utility';

// the method that is used for formatting the flight datas
export const parseFlightSegments = flightData => {
  const fullFlightData = [];

  // if only a single value is returned from the api call
  if (!Array.isArray(flightData)) {
    // push duration, departure time, arrival time, flight code, random price and random airline name (the api doesn't contain the last two) to the array within an object
    fullFlightData.push({
      duration: _.calculateDuration(
        flightData.Flight.Departure.ScheduledTimeLocal.DateTime,
        flightData.Flight.Arrival.ScheduledTimeLocal.DateTime
      ),
      departureTime: flightData.Flight.Departure.ScheduledTimeLocal.DateTime,
      arrivalTime: flightData.Flight.Arrival.ScheduledTimeLocal.DateTime,
      flightCode: `${flightData.Flight.MarketingCarrier.AirlineID}-${
        flightData.Flight.MarketingCarrier.FlightNumber
      }`,
      price: _.generateRandomNumber(700, 50),
      airline: _.generateRandomAirline()
    });
  } else {
    // if more than one value is returned from the api call iterate the response data and apply the logic above
    flightData.forEach(element => {
      fullFlightData.push({
        duration: _.calculateDuration(
          element.Flight.Departure.ScheduledTimeLocal.DateTime,
          element.Flight.Arrival.ScheduledTimeLocal.DateTime
        ),
        departureTime: element.Flight.Departure.ScheduledTimeLocal.DateTime,
        arrivalTime: element.Flight.Arrival.ScheduledTimeLocal.DateTime,
        flightCode: `${element.Flight.MarketingCarrier.AirlineID}-${
          element.Flight.MarketingCarrier.FlightNumber
        }`,
        price: _.generateRandomNumber(700, 50),
        airline: _.generateRandomAirline()
      });
    });
  }
  return fullFlightData;
};

// the method that is used for fetching return flights
export const fetchReturnFlights = (
  returnRoute,
  departureFlights,
  selectedOrigin,
  selectedDestination
) => dispatch => {
  // initiate the second api call for return flights
  axios
    .get(returnRoute)
    .then(returnFlights => {
      // finally dispatch the expected needed datas in an easily usable format also set loading to false, the call was finalized
      // parseFlightSegments methods are used to format the datas to make them more convenient while using
      dispatch({
        type: actionTypes.FETCH_FLIGHTS,
        payload: {
          departureFlights: parseFlightSegments(
            departureFlights.data.ScheduleResource.Schedule
          ),
          returnFlights: parseFlightSegments(
            returnFlights.data.ScheduleResource.Schedule
          ),
          selectedOrigin,
          selectedDestination,
          loading: false
        }
      });
    })
    .catch(error => {
      // if there is an error or no data was found, dispatch the failed api call with error and loading payloads
      dispatch({
        type: actionTypes.FETCH_FAIL,
        payload: {
          error,
          loading: false
        }
      });
    });
};

// the method that is fired on button click
export const fetchFlights = (
  departureRoute,
  returnRoute,
  selectedOrigin,
  selectedDestination
) => dispatch => {
  // dispatch loading payload before the api call is being made
  dispatch({
    type: actionTypes.INIT_LOADING,
    payload: {
      loading: true
    }
  });

  // initiate the first api call for departure flight
  axios
    .get(departureRoute)
    .then(departureFlights => {
      // once the response returns, call second method for return flight api call and pass the response of api call as well
      dispatch(
        fetchReturnFlights(
          returnRoute,
          departureFlights,
          selectedOrigin,
          selectedDestination
        )
      );
    })
    .catch(error => {
      // if there is an error or no data was found, dispatch the failed api call with error and loading payloads
      dispatch({
        type: actionTypes.FETCH_FAIL,
        payload: {
          error,
          loading: false
        }
      });
    });
};
