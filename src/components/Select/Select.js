import React from 'react';
import Select from 'react-select';
import cityAirportDummy from '../../dummy_data/city-airport.json';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOrigin, getDestination } from '../../store/actions';
import styles from './Select.css';

const CustomSelect = props => {
  // convert dummy data to array of objects of such [{ value: '...', label: '...' }] with value being the select's value and label being what will be shown in the ui
  const cityAirportArrayOfObjs = cityAirportDummy.map(element => {
    return { value: element['code'], label: element['name'] };
  });

  // find the chosen airport to among appropriately formatted array of objects, so it can be used as default value
  const getChosenCityAirportObject = position => {
    const chosenCityAirport = cityAirportArrayOfObjs.find(element => {
      return element.value === position;
    });
    return chosenCityAirport;
  };

  // show different value and trigger different action based on which select is used which differentiated via 'where' prop
  return (
    <Select
      classNamePrefix={'react-select'}
      className={styles.selectContainer}
      defaultValue={
        props.where === 'origin'
          ? getChosenCityAirportObject(props.selectedOrigin)
          : getChosenCityAirportObject(props.selectedDestination)
      }
      onChange={
        props.where === 'origin' ? props.getOrigin : props.getDestination
      }
      options={cityAirportArrayOfObjs}
      isClearable={false}
      isSearchable
      placeholder="City Or Airport"
    />
  );
};

// get selected airports and make them available under props
const mapStateToProps = state => {
  return {
    selectedOrigin: state.flightInfo.origin,
    selectedDestination: state.flightInfo.destination
  };
};

// get select triggered action methods and make them available under props
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getOrigin, getDestination }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomSelect);
