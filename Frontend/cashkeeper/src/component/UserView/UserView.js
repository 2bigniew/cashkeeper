import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/indexAction';
import Loader from '../../component/UI/Loader/Loader';
import classes from './UserView.css';
import FrontHelpers from '../../FrotnHelpers/FrontHelpers';

class UserView extends Component {
    state = {
        loader: true
    }
    
    componentDidMount() {
        this.props.onGetBorrowPaymentSum();
        this.props.onGetLoanPaymentSum();
        this.props.onGetBorrowSum();
        this.props.onGetLoanSum();
        this.props.onGetUserInfo();
    }

    componentWillReceiveProps(nextProps) {
        const [borrowSum, loanSum, borrowPaySum, loanPaySum, userDetails] = 
        [nextProps.borrowSum, nextProps.loanSum, nextProps.borrowPaySum, nextProps.loanPaySum, nextProps.userDetails];
        if(borrowSum && loanSum && borrowPaySum && loanPaySum && userDetails) {
            this.setState({loader: false});
        }
    }
    
    render() {
        let userViewContent;
        const [borrowSum, loanSum, borrowPaySum, loanPaySum, userDetails] = 
        [this.props.borrowSum, this.props.loanSum, this.props.borrowPaySum, this.props.loanPaySum, this.props.userDetails];
        const borrowRest = borrowSum-borrowPaySum;
        const loanRest = loanSum-loanPaySum;
        const ud = userDetails;
        if(borrowSum && loanSum && borrowPaySum && loanPaySum && userDetails) {
            userViewContent = (
                <div className={classes["userview__content"]}>
                    <h2 className={classes["userview__h2"]}>{`Cześć ${FrontHelpers.firstnameFormat(ud.firstname)}!`}</h2>
                    <div>
                        <div className={classes["userview__details"]}>
                            <h3 className={classes["userview__h3"]}>Twoje Dane:</h3>
                            <ul className={classes["userview__list"]}>
                                <li className={classes["userview__listitem"]}>
                                    <span className={classes["userview__span"]}>{ud.firstname} {ud.lastname}</span>
                                </li>
                                <li className={classes["userview__listitem"]}>Adres: 
                                    <span className={classes["userview__span"]}>
                                        {`ul. ${ud.street} ${ud.number}${ud.local ? '/'+ud.local : null}, ${ud.city}, ${ud.country}.`}
                                    </span>
                                </li>
                                <li className={classes["userview__listitem"]}>
                                    Nr. konta: 
                                    <span className={classes["userview__span"]}>{ud.bank_account}</span>
                                </li>
                                <li className={classes["userview__listitem"]}>
                                    Email: 
                                    <span className={classes["userview__span"]}>{ud.email}</span>
                                </li>
                                <li className={classes["userview__listitem"]}>
                                    Mobile: 
                                    <span className={classes["userview__span"]}>{ud.mobile}</span>
                                </li>
                            </ul>
                        </div>
                        <div className={classes["userview__payments"]}>
                            <div className={classes["userview__col"]}>
                                <h3 className={classes["userview__h3"]}>Pożyczenia: </h3>
                                <ul className={classes["userview__list"]}>
                                    <li className={classes["userview__listitem"]}>
                                        Kwota wszystkich pożyczeń: 
                                        <span className={classes["userview__span"]}>{borrowSum.toFixed(2) + ' PLN'}</span>
                                    </li>
                                    <li className={classes["userview__listitem"]}>
                                        Odebrane: 
                                        <span className={classes["userview__span"]}>{borrowPaySum.toFixed(2) + ' PLN'}</span>
                                    </li>
                                    <li className={classes["userview__listitem"]}>
                                        Do odebrania pozostało:
                                        <span className={classes["userview__spangreen"]}>{borrowRest.toFixed(2) + ' PLN'}</span>
                                        </li>
                                </ul>
                            </div>
                            <div className={classes["userview__col"]}>
                                <h3 className={classes["userview__h3"]}>Zobowiązania</h3>
                                <ul className={classes["userview__list"]}>
                                    <li className={classes["userview__listitem"]}>
                                        Kwota wszystkich zobowiązań: 
                                        <span className={classes["userview__span"]}>{loanSum.toFixed(2) + ' PLN'}</span>
                                    </li>
                                    <li className={classes["userview__listitem"]}>
                                        Spłacone: 
                                        <span className={classes["userview__span"]}>{loanPaySum.toFixed(2) + ' PLN'}</span>
                                    </li>
                                    <li className={classes["userview__listitem"]}>
                                        Do spłaty pozostało: 
                                        <span className={classes["userview__spanred"]}>{loanRest.toFixed(2) + ' PLN'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>    
            )
        } else {
            userViewContent = null;
        }
        
        return (
            <main className={classes["userview"]}>
                { userViewContent }
                <Loader displayLoader={this.state.loader} />
            </main>
        )
    }
}

const passReduxStateToComponentProps = (state) => {
    return {
        borrowPaySum: state.payment.borrowPaymentSum,
        loanPaySum: state.payment.loanPaymentSum,
        borrowSum: state.borrow.borrowSum,
        loanSum: state.loan.loanSum,
        userData: state.homePage.user,
        userDetails: state.homePage.userDetails
    }
}

const passReduxDispatchToComponentProps = (dispatch) => {
    return {
        onGetBorrowPaymentSum: () => dispatch(actions.getBorrowPaymentSum()),
        onGetLoanPaymentSum: () => dispatch(actions.getLoanPaymentSum()),
        onGetBorrowSum: () => dispatch(actions.getBorrowSum()),
        onGetLoanSum: () => dispatch(actions.getLoanSum()),
        onGetUserInfo: () => dispatch(actions.setUserDetails())
    }
}

export default connect(passReduxStateToComponentProps, passReduxDispatchToComponentProps)(UserView);