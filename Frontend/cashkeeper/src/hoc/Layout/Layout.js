import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/indexAction';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Button from '../../component/UI/Button/Button';

class Layout extends Component {

    logout = () => {
        this.props.onGetLogout();
        // window.location.reload(true);
    }

    render() {
        let logoutBtn = null;
        if (this.props.logged) {
            logoutBtn = (<Button 
                parentClass={classes["layout-btn"]}
                clicked={this.logout}>
                Wyloguj</Button>)
        };
        return(
            <Aux>
                <div className={classes["layout--container"]}>
                    <header className={classes["layout--header"]}>
                        <h1 className={classes["layout--logo"]}>#Cashkeeper</h1>
                        { logoutBtn }
                    </header>
                    <div className={classes["layout--content"]}>
                        { this.props.children }
                    </div>    
                    <h3 className={classes["layout--msg"]}>
                        { this.props.logoutMsg ? this.props.logoutMsg.message : ''}
                    </h3>
                    <p className={classes["layout--error"]}>{this.props.errorMsg.message}</p>
                    <footer className={classes["layout--footer"]}>
                        <p>Created by 2bigniew</p>
                        <a href="https://github.com/2bigniew">Github</a>
                        <a href="https://www.linkedin.com/in/zbigniew-stasiak/">LinkedIn</a>
                    </footer>
                </div>
            </Aux>
        )
    }
}

const passReduxStateToComponentProps = (state) => {
    return {
        errorMsg: state.homePage.msg,
        logged: state.homePage.isLogged,
        logoutMsg: state.homePage.logoutMsg,
    }
}

const passReduxDispatchToComponentProps = (dispatch) => {
    return {
        onGetLogout: () => dispatch(actions.userLogout())
    }
}

export default connect(passReduxStateToComponentProps, passReduxDispatchToComponentProps)(Layout);