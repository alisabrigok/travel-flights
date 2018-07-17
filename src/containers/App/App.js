import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import Home from '../Home/Home';
import Result from '../Result/Result';

// create the root. render result container on '/result' url and render home container on root url
// the MuiPickerUtilsProvider wrapper is needed for datepicker components
const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Switch>
        <Route path="/result" component={Result} />
        <Route path="/" component={Home} />
      </Switch>
    </MuiPickersUtilsProvider>
  );
};
export default App;
