import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFlights } from '../../store/actions';

// create button component
const CustomButton = props => {
  return (
    <Button
      variant="outlined"
      color="default"
      size="large"
      disabled={props.sameSelection ? true : false}
      // pass the api call related values to action so correct calls can be made, also change browser route immediately to show result page on click
      onClick={() => {
        props.fetchFlights(
          props.departureRoute,
          props.returnRoute,
          props.selectedOrigin,
          props.selectedDestination
        );
        props.history.push('/result');
      }}
    >
      Search
    </Button>
  );
};

// get departure and return route, and selected origin and destination to combine them to create the api end-point for api call
const mapStateToProps = state => {
  // Format the date because API expects date to be YYYY-MM-DD format.
  const departureDate = moment(state.flightInfo.departureDate).format(
    'YYYY-MM-DD'
  );
  const returnDate = moment(state.flightInfo.returnDate).format('YYYY-MM-DD');

  // The places are expected to be as place1/place2 format. Below is for API call for origin.
  const originToDestination = `${state.flightInfo.origin}/${
    state.flightInfo.destination
  }`;

  // Switch the positions for the second API call, this time for destination.
  const destinationToOrigin = `${state.flightInfo.destination}/${
    state.flightInfo.origin
  }`;

  return {
    // Last manipulation for correct API url. The hard coded part is for only fetching direct flights and maximum of 8 results.
    departureRoute: `${originToDestination}/${departureDate}?directFlights=1&limit=8`,
    returnRoute: `${destinationToOrigin}/${returnDate}?directFlights=1&limit=8`,
    selectedOrigin: state.flightInfo.origin,
    selectedDestination: state.flightInfo.destination,
    // get sameSelection boolean to disable the button if same airport seleciton is made
    sameSelection: state.flightInfo.sameSelection
  };
};
// get button click triggered action method and make them available under props
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchFlights }, dispatch);
};

// wrap the component withRouter so route history can be used
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomButton)
);
