import * as actionTypes from './actionTypes';
import axios from '../../axios_cashkeeper';

const borrowPaymentInfoSuccess = (data) => {
    return {
        type: actionTypes.BORROW_PAYMENT_INFO_SUCCESS,
        borrow_payment: data
    }
}

const borrowPaymentInfoFail = () => {
    return {
        type: actionTypes.BORROW_PAYMENT_INFO_FAIL,
    }
}

export const getBorrowPaymentInfo = () => {
    return async dispatch => {
        try {
            const token = window.localStorage.getItem('user_token');
            const borrowPayments = await axios.get('/api/borrow-payment/list?user_token='+token);
            const borrows = await axios.get('/api/borrow/list?user_token='+token);
            const allBorrowPayments = [];
            borrowPayments.data.data.forEach( b => {         
                for (let borrow of borrows.data.data) {
                    if (b.borrow_id === borrow.borrow_id) {
                        b.moreData = {
                            borrow_serial: borrow.borrow_serial,
                            is_borrow_completed: borrow.is_completed,
                            partner_id: borrow.PartnerAccount.partner_id,
                            partner_firstname: borrow.PartnerAccount.firstname,
                            partner_lastname: borrow.PartnerAccount.lastname
                        };
                        allBorrowPayments.push(b);
                    }
                }
            });
            dispatch(borrowPaymentInfoSuccess(allBorrowPayments));
        } catch {
            dispatch(borrowPaymentInfoFail());
        }
    }
}

const borrowPaymentSumSuccess = (data) => {
    return {
        type: actionTypes.BORROW_PAYMENT_SUM_SUCCESS,
        borrowSum: data
    }
}

const borrowPaymentSumFail = () => {
    return {
        type: actionTypes.BORROW_PAYMENT_SUM_FAIL
    }
}

export const getBorrowPaymentSum = () => {
    return async dispatch => {
        try {
            const token = window.localStorage.getItem('user_token');
            const borrowPaymentsSum = await axios.get('/api/borrow-payment/sum?user_token='+token);
            dispatch(borrowPaymentSumSuccess(borrowPaymentsSum.data.data));
        } catch {
            dispatch(borrowPaymentSumFail());
        }
    }
}

const loanPaymentInfoSuccess = (data) => {
    return {
        type: actionTypes.LOAN_PAYMENT_INFO_SUCCESS,
        loan_payment: data
    }
}

const loanPaymentInfoFail = () => {
    return {
        type: actionTypes.LOAN_PAYMENT_INFO_FAIL,
    }
}

export const getLoanPaymentInfo = () => {
    return async dispatch => {
        try {
            const token = window.localStorage.getItem('user_token');
            const loanPayments = await axios.get('/api/loan-payment/list?user_token='+token);
            const loans = await axios.get('/api/loan/list?user_token='+token);
            const allLoanPayments = [];
            loanPayments.data.data.forEach( l => {         
                for (let loan of loans.data.data) {
                    if (l.loan_id === loan.loan_id) {
                        l.moreData = {
                            loan_serial: loan.loan_serial,
                            is_loan_completed: loan.is_completed,
                            partner_id: loan.PartnerAccount.partner_id,
                            partner_firstname: loan.PartnerAccount.firstname,
                            partner_lastname: loan.PartnerAccount.lastname
                        };
                        allLoanPayments.push(l);
                    }
                }
            });
            dispatch(loanPaymentInfoSuccess(allLoanPayments));
        } catch {
            dispatch(loanPaymentInfoFail());
        }
    }
}

const loanPaymentSumSuccess = (data) => {
    return {
        type: actionTypes.LOAN_PAYMENT_SUM_SUCCESS,
        loanSum: data
    }
}

const loanPaymentSumFail = () => {
    return {
        type: actionTypes.LOAN_PAYMENT_SUM_FAIL
    }
}

export const getLoanPaymentSum = () => {
    return async dispatch => {
        try {
            const token = window.localStorage.getItem('user_token');
            const loanPaymentsSum = await axios.get('/api/loan-payment/sum?user_token='+token);
            dispatch(loanPaymentSumSuccess(loanPaymentsSum.data.data));
        } catch {
            dispatch(loanPaymentSumFail());
        }
    }
}