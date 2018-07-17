import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Select from '../Select/Select';
import DatePicker from '../DatePicker/Datepicker';
import Grid from '@material-ui/core/Grid';
import Button from '../Button/Button';
import PriceSlider from '../Slider/PriceSlider/PriceSlider';
import DurationSlider from '../Slider/DurationSlider/DurationSlider';
import styles from './FilterContainer.css';

// create container to hold search section and filter section on result page
const SearchFilterContainer = props => {
  return (
    <Grid item md={3} xs={12}>
      <div className={styles.container}>
        <p className={styles.title}>Search</p>
        <hr className={styles.underline} />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <p className={styles.label}>Origin</p>
            <Select where="origin" />
          </Grid>
          <Grid item xs={12}>
            <p className={styles.label}>Destination</p>
            <Select where="destination" />
          </Grid>
          <Grid item xs={12}>
            <p className={styles.label}>Depart</p>
            <DatePicker when="departure" />
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <div className={styles.button}>
              <Button />
            </div>
          </Grid>
          {/* if there is an error, don't show the filter section. error is passed to props via result container */}
          {!props.error ? (
            <Fragment>
              <Grid item xs={12}>
                <p className={styles.title}>Filter</p>
                <hr className={styles.underline} />
              </Grid>
              <Grid item xs={12}>
                <p className={styles.label}>By Price</p>
                <PriceSlider />
              </Grid>{' '}
              <Grid item xs={12}>
                <p className={styles.label}>By Duration</p>
                <DurationSlider />
              </Grid>{' '}
            </Fragment>
          ) : null}
        </Grid>
      </div>
    </Grid>
  );
};

// get sameSelection boolean to differentiate if a same airport selection is made
const mapStateToProps = state => {
  return {
    sameSelection: state.flightInfo.sameSelection
  };
};

export default connect(mapStateToProps)(SearchFilterContainer);
