import * as actionTypes from '../actions/types';

const initialState = {
  departureFlights: {},
  returnFlights: {},
  filteredDepartureFlights: {},
  filteredReturnFlights: {},
  errorMessage: '',
  selectedOrigin: '',
  selectedDestination: '',
  loading: false,
  filteredPrice: null,
  filteredDuration: null,
  maxPrice: null,
  minPrice: null,
  maxDuration: null,
  minDuration: null
};

// compare all flights and get the minimum price or duration which is passed dynamically under the argument 'key'
const getTheMinimum = (action, key) => {
  const minOriginFlight = action.payload.departureFlights.reduce(
    (prev, curr) => {
      return prev[key] <= curr[key] ? prev : curr;
    }
  );

  const minDestinationFlight = action.payload.returnFlights.reduce(
    (prev, curr) => {
      return prev[key] <= curr[key] ? prev : curr;
    }
  );

  return minOriginFlight[key] <= minDestinationFlight[key]
    ? minOriginFlight[key]
    : minDestinationFlight[key];
};

// compare all flights and get the maximum price or duration which is passed dynamically under the argument 'key'
const getTheMaximum = (action, key) => {
  const maxOriginFlight = action.payload.departureFlights.reduce(
    (prev, curr) => {
      return prev[key] >= curr[key] ? prev : curr;
    }
  );

  const maxDestinationFlight = action.payload.returnFlights.reduce(
    (prev, curr) => {
      return prev[key] >= curr[key] ? prev : curr;
    }
  );

  return maxOriginFlight[key] >= maxDestinationFlight[key]
    ? maxOriginFlight[key]
    : maxDestinationFlight[key];
};

// method to update the state on api call
const updateFlights = (state, action) => {
  return {
    ...state,
    departureFlights: action.payload.departureFlights,
    returnFlights: action.payload.returnFlights,
    filteredDepartureFlights: action.payload.departureFlights,
    filteredReturnFlights: action.payload.returnFlights,
    selectedOrigin: action.payload.selectedOrigin,
    selectedDestination: action.payload.selectedDestination,
    minPrice: getTheMinimum(action, 'price'),
    maxPrice: getTheMaximum(action, 'price'),
    filteredPrice: getTheMaximum(action, 'price'),
    minDuration: getTheMinimum(action, 'duration'),
    maxDuration: getTheMaximum(action, 'duration'),
    filteredDuration: getTheMaximum(action, 'duration'),
    loading: action.payload.loading,
    errorMessage: ''
  };
};

const setFilteredFlights = (state, action) => {
  return {
    ...state,
    filteredDepartureFlights: action.payload.filteredDepartureFlights,
    filteredReturnFlights: action.payload.filteredReturnFlights,
    filteredPrice: action.payload.filteredPrice,
    filteredDuration: action.payload.filteredDuration
  };
};

// method to generate error message based on error code
const generateErrorMessage = errorCode => {
  switch (errorCode) {
    case 400:
      return 'No flight information exists on the selected dates. Please try another date, origin or destination.';
    case 401:
      return 'Error! API auth key is expired. Please generate anew.';
    case 404:
      return 'No available flight was found. Please choose another date, origin or destination.';
    default:
      return 'Something went wrong. Please try again later.';
  }
};

// method to update the state based on error status
const handleError = (state, action) => {
  // if the error is related with the api call then it will have response which consists an object.
  if (Object.keys(action.payload.error).length) {
    return {
      ...state,
      errorMessage: generateErrorMessage(action.payload.error.response.status),
      loading: action.payload.loading,
      departureFlights: {},
      returnFlights: {}
    };
  }
  // if the error is related with the internal logic, generate the message accordingly
  return {
    ...state,
    errorCode: null,
    errorMessage: 'An internal error occured. Please try your action again.',
    loading: action.payload.loading,
    departureFlights: {},
    returnFlights: {}
  };
};

// method to handle loading state
const handleLoading = (state, action) => {
  return { ...state, loading: action.payload.loading };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_FLIGHTS:
      return updateFlights(state, action);
    case actionTypes.SET_FILTERED_FLIGHTS:
      return setFilteredFlights(state, action);
    case actionTypes.FETCH_FAIL:
      return handleError(state, action);
    case actionTypes.INIT_LOADING:
      return handleLoading(state, action);
    default:
      return state;
  }
}
