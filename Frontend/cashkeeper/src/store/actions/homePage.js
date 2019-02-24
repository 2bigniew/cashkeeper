import * as actionTypes from './actionTypes';
import axios from '../../axios_cashkeeper';

export const setStartQuotes = (quotesArgument) => {
    return {
        type: actionTypes.SET_START_QUOTES,
        quotes: quotesArgument,
    };
};

export const fetchQuotesFailed = () => {
    return {
        type: actionTypes.FETCH_QUOTES_FAILED
    };
};

export const getQuotes = () => {
    return async dispatch => {
        try {
            const response = await axios.get('/api/quotes');    
            dispatch(setStartQuotes(response.data.quotes));
        } catch (error) {
            dispatch(fetchQuotesFailed());
        } ;
    };
};

export const authorizationSucces = (userData) => {
    return {
        type: actionTypes.AUTHORIZATION_SUCCES,
        user: userData,
        isLogged: true
    };
};

export const authorizationFailed = (userData) => {
    return {
        type: actionTypes.AUTHORIZATION_FAILED,
        msg: userData,
        isLogged: false
    };
};

export const authorizationError = () => {
    return {
        type: actionTypes.AUTHORIZATION_ERROR
    };
};

export const getAuthorization = ( loginParam, passParam) => {
    return async dispatch => {
        const data = {
            login: loginParam,
            password: passParam
        };
        try {
            const auth = await axios.post('/api/auth/authorization-login', data);
            if (auth.data.user_id) {
                dispatch(authorizationSucces(auth.data));
            } else {
                dispatch(authorizationFailed(auth.data));
            }
        }catch (err) {
            dispatch(authorizationError());
        }
    }
}