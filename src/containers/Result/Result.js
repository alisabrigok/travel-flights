import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '../../components/Card/Card';
import Logo from '../../components/Logo/Logo';
import Loader from '../../components/Loader/Loader';
import SearchFilterContainer from '../../components/SearchFilterContainer/SearchFilterContainer';
import styles from './Result.css';

// create result page
const Result = props => {
  // if the api call yet to be finalized, show the loader
  const uponRequestCompletion = !props.loading ? (
    <Fragment>
      {/* if an error occured or no data was found on the api call display error message*/}
      {!props.errorMessage ? (
        <Fragment>
          <SearchFilterContainer />
          <Card where="origin" />
          <Card where="destination" />
        </Fragment>
      ) : (
        <Fragment>
          <SearchFilterContainer error="error" />
          <Grid item md={8} xs={12}>
            <p className={styles.error}>{props.errorMessage}</p>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  ) : (
    <Loader />
  );

  // if the user is attempting to go to '/result' url directly, that should mean no flight data, no error message and no loading.
  // then redirect to home page. in any other condition render the result page
  const generateResultPage = () => {
    if (
      !Object.keys(props.returnFlights).length &&
      !props.errorMessage &&
      !props.loading &&
      props.location.pathname === '/result'
    ) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <header className={styles.header}>
          <Logo />
        </header>
        <div className={styles.result}>
          <section>
            <Grid container spacing={16}>
              {uponRequestCompletion}
            </Grid>
          </section>
        </div>
      </Fragment>
    );
  };
  // generate the JSX
  return generateResultPage();
};
// get loading and error states. Also get return flights to use it as reference on direct '/result' route access attempts
const mapStateToProps = state => {
  return {
    loading: state.flights.loading,
    errorMessage: state.flights.errorMessage,
    returnFlights: state.flights.returnFlights
  };
};

export default withRouter(connect(mapStateToProps)(Result));
