import reducer from './flightSearchFilter';
import * as actionTypes from '../actions/types';

describe('flightSearchFilter reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
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
    });
  });

  it('should store loading as true', () => {
    expect(
      reducer(
        { loading: false },
        {
          type: actionTypes.INIT_LOADING,
          payload: { loading: true }
        }
      )
    ).toEqual({ loading: true });
  });

  it('should store errorMessage as "No available flight was found..."', () => {
    expect(
      reducer(
        {
          errorMessage: '',
          loading: true,
          departureFlights: { flight: 'some flight info' },
          returnFlights: { flight: 'some other flight info' }
        },
        {
          type: actionTypes.FETCH_FAIL,
          payload: { loading: false, error: { response: { status: 404 } } }
        }
      )
    ).toEqual({
      errorMessage:
        'No available flight was found. Please choose another date, origin or destination.',
      loading: false,
      departureFlights: {},
      returnFlights: {}
    });
  });

  it('should store filtered price, duration and flight infos accordingly', () => {
    expect(
      reducer(
        {
          filteredDepartureFlights: { flights: '' },
          filteredReturnFlights: { flights: '' },
          filteredPrice: 0,
          filteredDuration: 1
        },
        {
          type: actionTypes.SET_FILTERED_FLIGHTS,
          payload: {
            filteredDepartureFlights: { flights: 'some flight data' },
            filteredReturnFlights: { flights: 'some other flight data' },
            filteredPrice: 99,
            filteredDuration: 999
          }
        }
      )
    ).toEqual({
      filteredDepartureFlights: { flights: 'some flight data' },
      filteredReturnFlights: { flights: 'some other flight data' },
      filteredPrice: 99,
      filteredDuration: 999
    });
  });

  it('should update all flight infos accordingly', () => {
    expect(
      reducer(
        {
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
        },
        {
          type: actionTypes.FETCH_FLIGHTS,
          payload: {
            departureFlights: [
              {
                price: 55,
                duration: 90
              },
              {
                price: 15,
                duration: 100
              }
            ],
            returnFlights: [
              {
                price: 105,
                duration: 60
              },
              {
                price: 205,
                duration: 10
              }
            ],
            errorMessage: '',
            selectedOrigin: 'IST',
            selectedDestination: 'ESB',
            loading: false
          }
        }
      )
    ).toEqual({
      departureFlights: [
        {
          price: 55,
          duration: 90
        },
        {
          price: 15,
          duration: 100
        }
      ],
      returnFlights: [
        {
          price: 105,
          duration: 60
        },
        {
          price: 205,
          duration: 10
        }
      ],
      filteredDepartureFlights: [
        {
          price: 55,
          duration: 90
        },
        {
          price: 15,
          duration: 100
        }
      ],
      filteredReturnFlights: [
        {
          price: 105,
          duration: 60
        },
        {
          price: 205,
          duration: 10
        }
      ],
      errorMessage: '',
      selectedOrigin: 'IST',
      selectedDestination: 'ESB',
      loading: false,
      filteredPrice: 205,
      filteredDuration: 100,
      maxPrice: 205,
      minPrice: 15,
      maxDuration: 100,
      minDuration: 10
    });
  });
});
