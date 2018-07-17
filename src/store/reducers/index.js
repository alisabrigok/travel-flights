import { combineReducers } from 'redux';
import FlightInfoReducer from './flightInfo';
import FlightSearchReducer from './flightSearchFilter';

// combine reducers to make their state available under the state
const rootReducer = combineReducers({
  flightInfo: FlightInfoReducer,
  flights: FlightSearchReducer
});

export default rootReducer;
