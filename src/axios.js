import axios from 'axios';

const token = 'your_token_here';

// create an instance of axios to be used globally with given options
const instance = axios.create({
  baseURL: 'https://api.lufthansa.com/v1/operations/schedules/',
  headers: { Authorization: `Bearer ${token}` }
});

export default instance;
