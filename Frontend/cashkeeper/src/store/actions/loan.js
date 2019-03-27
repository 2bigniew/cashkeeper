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
            console.log(loan.data.data);
            dispatch(loanInfoSuccess(loan.data.data));
        } catch {
            dispatch(loanInfoFail());
        }
    }
};