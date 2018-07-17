import React from 'react';
import { connect } from 'react-redux';
import Select from '../Select/Select';
import DatePicker from '../DatePicker/Datepicker';
import Grid from '@material-ui/core/Grid';
import styles from './SearchContainer.css';

// create container to hold search section on home page
const SearchContainer = props => {
  return (
    <div className={styles.container}>
      <Grid container spacing={16}>
        <Grid item md={3} sm={6} xs={12}>
          <p className={styles.label}>Origin</p>
          <Select where="origin" />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <p className={styles.label}>Destination</p>
          <Select where="destination" />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <p className={styles.label}>Depart</p>
          <DatePicker when="departure" />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <p className={styles.label}>Return</p>
          <DatePicker when="return" />
        </Grid>
        {/* if same airport selection is made, show error message */}
        {props.sameSelection ? (
          <Grid item xs={12}>
            <span className={styles.selectionError}>
              Origin and destination can't be the same! Please change it.
            </span>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

// get sameSelection boolean to differentiate if a same airport selection is made
const mapStateToProps = state => {
  return {
    sameSelection: state.flightInfo.sameSelection
  };
};

export default connect(mapStateToProps)(SearchContainer);
