import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/indexAction';
import Card from '../../component/UI/Card/Card';
import Loader from '../../component/UI/Loader/Loader';
import classes from './Payment.css';
import Button from '../../component/UI/Button/Button';


class Payment extends Component {
    state = {
        loader: true
    }
    
    componentDidMount(){
        this.props.onGetBorrowPayment();
        this.props.onGetLoanPayment();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.borrowPayment && nextProps.loanPayment) {
            this.setState({loader: false});
        }
    }

    render() {
        let allBPs;
        if(this.props.borrowPayment) {
            const allBorrowPayments = [];
            for (let bp in this.props.borrowPayment) {
                allBorrowPayments.push(this.props.borrowPayment[bp]);
            }

            if (this.props.bpCount) {
                allBPs = allBorrowPayments.map( (bp, i) => {
                    const detailsData = Object.keys(bp.moreData).map( el => bp.moreData[el]);
                    detailsData.push({type: 'borrow'});
                    return (<Card key={'bp'+bp.borrow_payment_details_id}
                        details={detailsData}
                        header={bp.payment_date}
                        mainValue={bp.payment_value} />)
                })
            } else {
                allBPs = 'Nie ma żadnych płatności w systemie';
            }
        } else {
            allBPs = 'Nie ma żadnych płatności w systemie';
        }

        let allLPs;
        if(this.props.loanPayment) {
            const allLoanPayments = [];
            for (let lp in this.props.loanPayment) {
                allLoanPayments.push(this.props.loanPayment[lp]);
            }

            if (this.props.lpCount) {
                allLPs = allLoanPayments.map( (lp, i) => {
                    const detailsData = Object.keys(lp.moreData).map( el => lp.moreData[el]);
                    detailsData.push({type: 'loan'});
                    return (<Card key={'lp'+lp.loan_payment_details_id}
                        details={detailsData}
                        header={lp.payment_date}
                        mainValue={lp.payment_value} />)
                })
            } else {
                allLPs = 'Nie ma żadnych płatności w systemie';
            }
        } else {
            allLPs = 'Nie ma żadnych płatności w systemie';
        }
        return(
            <div className={classes['payment']}>
                <h2 className={classes["payment__header"]}>Twoje płatności</h2>
                <div className={classes['payment__action-row']}>
                    <div className={classes['payment__action-box']}>
                        <label className={classes['payment__label']}>Znajdź płatność</label>
                        <input type="text" 
                            className={classes['payment__search']}
                            placeholder='Nazwisko...' />
                            <span>&nbsp;/&nbsp;&nbsp;</span>
                            <input type="text" 
                            className={classes['payment__search']}
                            placeholder='Numer seryjny...' />
                        <Button parentClass={classes['payment--btn']}>Wyszukaj</Button>
                    </div>
                    <div  className={classes['payment__action-box']}>
                        <Button parentClass={classes['payment--btn']}>Dodaj płatność</Button>
                    </div>
                </div>
                <div className={classes['payment__container']}>
                    <div className={classes['payment__left']}>
                        <h3 className={classes['payment__h3']}>Płatności przychodzące (Pożyczenia)</h3>
                        <div className={classes['payment__box']}>{allBPs}</div>
                    </div>
                    <div className={classes['payment__right']}>
                        <h3 className={classes['payment__h3']}>Płatności wychodzące (Zobowiązania)</h3>
                        <div className={classes['payment__box']}>{allLPs}</div>  
                    </div>
                </div>
                <Loader displayLoader={this.state.loader} />
            </div>
        )
    }
}

const passReduxStateToComponentProps = (state) => {
    return {
        borrowPayment: state.payment.borrowPaymentData,
        bpCount: state.payment.borrowPaymentCount,
        loanPayment: state.payment.loanPaymentData,
        lpCount: state.payment.loanPaymentCount
    }
}

const passReduxDispatchToComponentProps = (dispatch) => {
    return {
        onGetBorrowPayment: () => dispatch(actions.getBorrowPaymentInfo()),
        onGetLoanPayment: () => dispatch(actions.getLoanPaymentInfo())
    }
}

export default connect(passReduxStateToComponentProps, passReduxDispatchToComponentProps)(Payment);