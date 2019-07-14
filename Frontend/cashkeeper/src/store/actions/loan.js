import * as actionTypes from './actionTypes';
import axios from '../../axios_cashkeeper';

const loanInfoSuccess = (data) => {
    return {
        type: actionTypes.LOAN_INFO_SUCCESS,
        loan: data
    }
};

const loanInfoFail = () => {
    return {
        type: actionTypes.LOAN_INFO_FAIL
    }
};

export const getLoanInfo = () => {
    return async dispatch => {
        try {
            const token = window.localStorage.getItem('user_token');
            const loan = await axios.get('/api/loan/list?user_token='+token);
            dispatch(loanInfoSuccess(loan.data.data));
        } catch {
            dispatch(loanInfoFail());
        }
    }
};

const loanSumSuccess = (data) => {
    return {
        type: actionTypes.LOAN_SUM_SUCCESS,
        loanSum: data
    }
}

const loanSumFail = () => {
    return {
        type: actionTypes.LOAN_SUM_FAIL
    }
}

export const getLoanSum = () => {
    return async dispatch => {
        try {
            const token = window.localStorage.getItem('user_token');
            const loanSum = await axios.get('/api/loan/find/sum?user_token='+token);
            dispatch(loanSumSuccess(loanSum.data.data));
        } catch {
            dispatch(loanSumFail());
        }
    }
}