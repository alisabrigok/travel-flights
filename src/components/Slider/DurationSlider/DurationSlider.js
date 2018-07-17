import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterFlights } from '../../../store/actions';
import Slider from '@material-ui/lab/Slider';
import moment from 'moment';
import styles from './DurationSlider.css';

// create duration filter slider
const DurationSlider = props => {
  return (
    <div className={styles.slider}>
      <Slider
        // pass the asssociated arguments to filterflights method on each slider change
        onChange={(event, filteredDuration) =>
          props.filterFlights(
            event,
            filteredDuration,
            props.filteredPrice,
            'duration',
            'price',
            props.origin,
            props.destination
          )
        }
        // the value is updated under filtered duration, keep the current value on each change action
        value={props.filteredDuration}
        min={props.minDuration}
        max={props.maxDuration}
        step={1}
      />
      {/* display minimum duration and filtered duration which is the maximum duration initially, also format them to human readeble way */}
      <span className={styles.min}>
        {moment.utc(props.minDuration).format('h:mm')}h
      </span>
      <span className={styles.max}>
        {moment.utc(props.filteredDuration).format('h:mm')}h
      </span>
    </div>
  );
};

// get slider selected filtered duration, selected filtered duration by other slider
// minimum and maximum duration among all flights, departure flights and return flights and make them available under props
const mapStateToProps = state => {
  return {
    origin: state.flights.departureFlights,
    destination: state.flights.returnFlights,
    minDuration: state.flights.minDuration,
    maxDuration: state.flights.maxDuration,
    filteredDuration: state.flights.filteredDuration,
    filteredPrice: state.flights.filteredPrice
  };
};

// get duration slider triggered action method and make them available under props
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ filterFlights }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DurationSlider);
