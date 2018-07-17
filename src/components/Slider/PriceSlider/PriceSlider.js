import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterFlights } from '../../../store/actions';
import Slider from '@material-ui/lab/Slider';
import styles from './PriceSlider.css';

// create price filter slider
const PriceSlider = props => {
  return (
    <div className={styles.slider}>
      <Slider
        // pass the asssociated arguments to filterflights method on each slider change
        onChange={(event, filteredPrice) =>
          props.filterFlights(
            event,
            filteredPrice,
            props.filteredDuration,
            'price',
            'duration',
            props.origin,
            props.destination
          )
        }
        // the value is updated under filtered price, keep the current value on each change action
        value={props.filteredPrice}
        min={props.minPrice}
        max={props.maxPrice}
        step={1}
      />
      {/* display minimum price and filtered price, which is the maximum price initially, then changes */}
      <span className={styles.min}>&#8378;{props.minPrice}</span>
      <span className={styles.max}>&#8378;{props.filteredPrice}</span>
    </div>
  );
};

// get slider selected filtered price, selected filtered duration by other slider
// minimum and maximum price among all flights, departure flights and return flights and make them available under props
const mapStateToProps = state => {
  return {
    origin: state.flights.departureFlights,
    destination: state.flights.returnFlights,
    minPrice: state.flights.minPrice,
    maxPrice: state.flights.maxPrice,
    filteredPrice: state.flights.filteredPrice,
    filteredDuration: state.flights.filteredDuration
  };
};

// get price slider triggered action method and make them available under props
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ filterFlights }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceSlider);
