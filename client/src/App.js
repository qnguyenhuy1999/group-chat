import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';

import { PUBLIC_ROUTE, PRIVATE_ROUTE } from './constants/routes';
import PrivateRoute from './components/PrivateRoute';

const showPrivateRoute = (routes, name) => {
  let result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <PrivateRoute
          key={index}
          path={route.path}
          name={route.name}
          exact={route.exact}
          component={route.component}
        />
      );
    });
  }
  return result;
};

const showPublicRoute = (routes) => {
  let result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          name={route.name}
          exact={route.exact}
          component={route.component}
        />
      );
    });
  }
  return result;
};

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          {showPublicRoute(PUBLIC_ROUTE)}
          {showPrivateRoute(PRIVATE_ROUTE)}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
