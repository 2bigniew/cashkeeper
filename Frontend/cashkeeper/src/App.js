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

import UserView from './component/UserView/UserView';
import Partner from './container/Partner/Partner';
import Borrow from './container/Borrow/Borrow';
import Loan from './container/Loan/Loan';
import Payment from './container/Payment/Payment';

// import * as actions from './store/actions/actionTypes';

class App extends Component {

  state = {
    authenticated: false
  }

  username = this.props.userData ? this.props.userData.firstname : null;

  render() {
    let myApp; 
    if (this.props.isLoggedStore) {
      myApp = (
        <AuthView isAuth={this.props.isLoggedStore}>
          <Route path="/" exact render={() => <UserView user={this.props.userData} />} />
          <Route path="/partner" component={Partner} />
          <Route path="/borrow" component={Borrow} />
          <Route path="/loan" component={Loan} />
          <Route path="/payment" component={Payment} />
        </AuthView>
      );
    } else {
      myApp = (
        <NonAuthView isAuth={this.props.isLoggedStore}>
          <Route path="/" exact component={Homepage} />
          <Route path="/about" component={About} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/login" component={Login} />
        </NonAuthView>
      )
    }
    return (
      <div className={classes.App}>
        <Layout username={this.username}>
          <BrowserRouter>
            <Switch> 
              {myApp}
            </Switch>
          </BrowserRouter>  
        </Layout>
      </div>
    );
  }
}

const passReduxStateToComponentProps = (state) => {
  return {
      isLoggedStore: state.homePage.isLogged,
      userData: state.homePage.user
  }
}

export default connect(passReduxStateToComponentProps)(App);
