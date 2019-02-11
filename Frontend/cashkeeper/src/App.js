import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import classes from './App.css';
import NonAuthView from './hoc/NonAuthView/NonAuthView';
import AuthView from './hoc/AuthView/AuthView';

class App extends Component {

  state = {
    authenticated: false
  }

  render() {
    // przekazac elementy html jako tablice z wartosciami string
    return (
      <div className={classes.App}>
        <Layout>
          <AuthView isAuth={this.state.authenticated}>
          </AuthView>
          <NonAuthView isAuth={this.state.authenticated}>
          </NonAuthView>
        </Layout>
      </div>
    );
  }
}

export default App;
