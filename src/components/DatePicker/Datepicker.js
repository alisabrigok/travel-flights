import React from 'react';
import { DatePicker } from 'material-ui-pickers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDepartureDate, getReturnDate } from '../../store/actions';
import styles from './Datepicker.css';

// show different value and trigger different action based on which datepicker is used which differentiated via 'when' prop
const CustomDatePicker = props => {
  return (
    <span className={styles.pickerContainer}>
      <DatePicker
        placeholder="Select A Depart Date"
        value={
          props.when === 'departure' ? props.departureDate : props.returnDate
        }
        onChange={
          props.when === 'departure'
            ? props.getDepartureDate
            : props.getReturnDate
        }
        disablePast
        showTodayButton
        format="DD/MM/YYYY"
      />
    </span>
  );
};

// get the dates and make them available under props
const mapStateToProps = state => {
  return {
    departureDate: state.flightInfo.departureDate,
    returnDate: state.flightInfo.returnDate
  };
};

// get date change triggered action methods and make them available under props
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getDepartureDate, getReturnDate }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDatePicker);
