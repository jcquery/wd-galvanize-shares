import { green600, green900} from 'material-ui/styles/colors';
import Routes from 'components/Routes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  flatButton: {
    buttonFilterColor: green900,
    textColor: 'white'
  },
  palette: {
    primary1Color: green600
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Routes />
  </MuiThemeProvider>,
  document.getElementById('app')
);
