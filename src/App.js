import React, { Component } from 'react';
import { connect} from "remx";
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

// import { APP_LOAD } from "./helpers/actionTypes";
import auth from "./stores/auth";

// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

import "sweetalert/dist/sweetalert.css";

// Containers
import { DefaultLayout } from './containers';
import Login from './views/Login';

import broker from "./utils/broker";

// import { renderRoutes } from 'react-router-config';

class App extends Component {
  componentDidMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      broker.checkUserIdentity().then(res => {
        if (res.status) {
          auth.setters.setUser(res.user);
         } else {
          window.localStorage.clear();
        }
      });
    }
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

function mapStateToProps(props) {
  return {
      user: auth.getters.getUser(),
  }
}

export default connect(mapStateToProps)(App);
//export default App;
