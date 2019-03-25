import * as actionTypes from './actionTypes';
import axios from '../../axios_cashkeeper';

const borrowInfoSuccess = (data) => {
    return {
        type: actionTypes.BORROW_INFO_SUCCESS,
        borrow: data
    }
};

const borrowInfoFail = () => {
    return {
        type: actionTypes.BORROW_INFO_FAIL
    }
};

export const getBorrowInfo = () => {
    return async dispatch => {
        try {
            const token = window.localStorage.getItem('user_token');
            const borrow = await axios.get('/api/borrow/list?user_token='+token);
            console.log(borrow.data.data);
            dispatch(borrowInfoSuccess(borrow.data.data));
        } catch {
            dispatch(borrowInfoFail());
        }
    }
};