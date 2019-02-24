import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


import Layout from './hoc/Layout/Layout';
import classes from './App.css';
import NonAuthView from './hoc/NonAuthView/NonAuthView';
import AuthView from './hoc/AuthView/AuthView';
import Login from './container/Login/Login';
import Homepage from './container/Homepage/Homepage'
import About from './container/About/About';
import CreateAccount from './container/CreateAcoount/CreateAccount';

import * as actions from './store/actions/actionTypes';

class App extends Component {

  state = {
    authenticated: false
  }

  render() {
    // przekazac elementy html jako tablice z wartosciami string
    return (
      <div className={classes.App}>
        <Layout>
          <AuthView isAuth={this.props.isLoggedStore}>
          </AuthView>
          <NonAuthView isAuth={this.props.isLoggedStore}>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/about" component={About} />
                <Route path="/create-account" component={CreateAccount} />
                <Route path="/login" component={Login} />
              </Switch>
            </BrowserRouter>  
          </NonAuthView>
        </Layout>
      </div>
    );
  }
}

const passReduxStateToComponentProps = (state) => {
  return {
      isLoggedStore: state.homePage.isLogged
  }
}

export default connect(passReduxStateToComponentProps)(App);
