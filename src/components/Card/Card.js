import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from './Card.css';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// create different cards based on 'where' prop which is passed to prop using result page container
const CustomCard = props => {
  // generate from-to label which will be based on whether the card is departure card or return card which differentiated via 'where' prop
  const generateFromTo = () => {
    if (props.where === 'origin') {
      return `${props.selectedOrigin} - ${props.selectedDestination}`;
    }
    return `${props.selectedDestination} - ${props.selectedOrigin}`;
  };

  // generate cards dynamically using origin or destination state
  const generateFlightCards = () => {
    const flightCards = props[props.where].map(flight => {
      return (
        <div className={styles.card} key={flight.flightCode}>
          <Card align="center">
            <CardContent>
              <Typography color="textSecondary">
                {flight.airline} - {flight.flightCode}
              </Typography>
              <Typography variant="headline" component="h2">
                {/* convert the time to human readeble format */}
                {moment(flight.departureTime).format('HH.mm')}{' '}
                <ChevronRightIcon />
                {/* convert duration which is as milliseconds to human readeble format */}
                <sup> {moment.utc(flight.duration).format('h:mm')}h </sup>{' '}
                <ChevronRightIcon />
                {moment(flight.arrivalTime).format('HH.mm')}
              </Typography>
              <Typography color="textSecondary">{generateFromTo()}</Typography>
              <hr />
              <Typography variant="headline" component="h2">
                &#8378;{flight.price}
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    });
    return flightCards;
  };

  return (
    <Fragment>
      <Grid item md={4} xs={12}>
        {generateFlightCards()}
      </Grid>
    </Fragment>
  );
};

// get filtered departure and return flights as origin and destination. also get the airport codes to be shown on ui
const mapStateToProps = state => {
  return {
    origin: state.flights.filteredDepartureFlights,
    destination: state.flights.filteredReturnFlights,
    selectedOrigin: state.flights.selectedOrigin,
    selectedDestination: state.flights.selectedDestination
  };
};

export default connect(mapStateToProps)(CustomCard);
