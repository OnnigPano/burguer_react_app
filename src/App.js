import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../src/store/actions/index';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';

import { Route, Switch } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';


class App extends Component {

  componentDidMount() {
    this.props.checkAutoLogIn();
  }

  render() {
    return (
      <div >
      <Layout>
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAutoLogIn : () => dispatch(actions.checkAuthState())
  }
}

export default connect(null, mapDispatchToProps)(App);
