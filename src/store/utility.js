import moment from 'moment';
import airlineDummy from '../dummy_data/airline.json';

// method used to calculate flight duration
export const calculateDuration = (departureTime, arrivalTime) => {
  // convert date-time api contained to moment object
  departureTime = moment(departureTime);
  arrivalTime = moment(arrivalTime);
  // get the time difference between arrival time and departure time (arrival is later, so it's bigger)
  const duration = moment.duration(arrivalTime.diff(departureTime));
  return (
    // finally, return the duration as milliseconds
    duration.asMilliseconds()
  );
};

// generate random number method; min is included, max isn't
export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// generate a random airline name
export const generateRandomAirline = () => {
  const randomNumber = generateRandomNumber(0, 7);
  // choose random airline element from airline dummy data array
  return airlineDummy[randomNumber];
};
