import reducer from './flightInfo';
import * as actionTypes from '../actions/types';
import moment from 'moment';

describe('flightInfo reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toHaveProperty('origin', 'IST');
    expect(reducer(undefined, {})).toHaveProperty('destination', 'ESB');
    expect(reducer(undefined, {})).toHaveProperty('sameSelection', false);
  });

  it('should store the selected destination airport code', () => {
    expect(
      reducer(
        {
          origin: 'IST',
          destination: 'ESB',
          sameSelection: false
        },
        {
          type: actionTypes.GET_DESTINATION,
          payload: {
            value: 'ADA'
          }
        }
      )
    ).toEqual({
      origin: 'IST',
      destination: 'ADA',
      sameSelection: false
    });
  });

  it('should store the selected origin airport code', () => {
    expect(
      reducer(
        {
          origin: 'IST',
          destination: 'ESB',
          sameSelection: false
        },
        {
          type: actionTypes.GET_ORIGIN,
          payload: {
            value: 'AYT'
          }
        }
      )
    ).toEqual({
      origin: 'AYT',
      destination: 'ESB',
      sameSelection: false
    });
  });

  it('should change the sameSelection boolean to true', () => {
    expect(
      reducer(
        {
          origin: 'IST',
          destination: 'ESB',
          sameSelection: false
        },
        {
          type: actionTypes.GET_DESTINATION,
          payload: {
            value: 'IST'
          }
        }
      )
    ).toEqual({
      origin: 'IST',
      destination: 'IST',
      sameSelection: true
    });
  });

  it('should store the same dates', () => {
    // this becomes the case because when departure date is set later than return date, they become equal.
    // this is correct for exact opposite situation
    const currentDate = moment();
    const weekFromNow = moment().add(7, 'd');
    expect(
      reducer(
        {
          departureDate: currentDate,
          returnDate: currentDate
        },
        {
          type: actionTypes.GET_DEPARTURE_DATE,
          payload: weekFromNow
        }
      )
    ).toEqual({
      departureDate: weekFromNow,
      returnDate: weekFromNow
    });
  });
});
