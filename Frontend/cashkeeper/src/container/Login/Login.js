import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import classes from './Login.css';
import * as actions from '../../store/actions/indexAction';
import checkMarkImg from '../../assets/check.png';

class Login extends Component {
    state = {
        login: {
            value: '2bigniew',
            valid: false,
        },
        password: {
            value: 'lfc96Ynwa2019',
            valid: false
        },
        isValid: false,
        disabled: false
    }

    formValidation = (input) => {
        if (input.value !== '') {
            input.valid = true;
        } else {
            input.valid = false;
        }
        const updatedState = this.state;

        if(this.state.login.valid === true && this.state.password.valid === true) {
            updatedState.disabled = false;
            this.setState({ ...updatedState });
        } else {
            updatedState.disabled = true;
            this.setState({ ...updatedState });
        }
    }

    getLoginHandler = (e) => {
        const updatedState = this.state;
        updatedState.login.value = e.target.value;
        this.formValidation(updatedState.login);

        this.setState({
            ...updatedState
        });
    }

    getPasswordHandler = (e) => {
        const updatedState = this.state;
        updatedState.password.value = e.target.value;
        this.formValidation(updatedState.password);

        this.setState({
            ...updatedState
        });
    }

    authorizationHandler = async (e) => {
        e.preventDefault();
        const login = this.state.login.value;
        const password = this.state.password.value;
        this.props.onGetAuthorization(login, password);
        this.props.history.push('/');
    }

    render() {
        let btnValidationClass = '';
        if (this.state.disabled) {
            btnValidationClass = classes["btn-validation-class"];
        };
        const btnClasses = [classes["login--button"], btnValidationClass].join(' ');

        let checkMarkLogin = '';
        if (this.state.login.valid) {
            checkMarkLogin = (<img src={ checkMarkImg } width="25px" alt="checked" />);
        }

        let checkMarkPass = '';
        if (this.state.password.valid) {
            checkMarkPass = (<img src={ checkMarkImg } width="25px" alt="checked" />);
        }
        return(
            <Aux>
                <main className={classes.login}>
                    <section className={classes["login--section"]}>
                        <form className={classes["login--form"]}>
                            <div className={classes["login--form-row"]}>
                                <label className={classes["login--label"]}>
                                    Login:
                                </label>
                                <div className="login--input-row">
                                    <input 
                                        onInput={(e) => this.getLoginHandler(e)}
                                        type="text" 
                                        name="login" 
                                        placeholder="Twój login..." 
                                        className={classes["login--input"]}/>
                                        <div className={classes["login--check"]}>
                                          { checkMarkLogin }
                                        </div>
                                </div>
                            </div>
                            <div className={classes["login--form-row"]}>
                                <label className={classes["login--label"]}>
                                    Hasło: 
                                </label>
                                <div>
                                    <input 
                                        onInput={(e) => this.getPasswordHandler(e)}
                                        type="password" 
                                        name="password" 
                                        placeholder="Twoje hasło..." 
                                        className={classes["login--input"]}/>
                                        <div className={classes["login--check"]}>
                                          { checkMarkPass }
                                        </div>
                                </div>
                            </div>
                            <div className={classes["login--form-row"]}>
                                <input 
                                    disabled={this.state.disabled}
                                    type="submit" 
                                    onClick={(e) => this.authorizationHandler(e)} 
                                    role="button"
                                    className={btnClasses}
                                    value="Zaloguj!"/>
                            </div>
                        </form>
                    </section>
                </main>
            </Aux>
        )
    }
}

const passReduxStateToComponentProps = (state) => {
    return {
        errorMsg: state.homePage.msg,
        isLogged: state.homePage.isLogged
    }
}

const passReduxDispatchToComponentProps = (dispatch) => {
    return {
        onGetAuthorization: (loginParam, passParam) => dispatch(actions.getAuthorization(loginParam, passParam))
    }
}

export default connect(passReduxStateToComponentProps, passReduxDispatchToComponentProps)(Login);