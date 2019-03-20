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
        user: userData.user,
        isLogged: true,
        token: userData.token
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
            console.log(auth);
            if (auth.data.user.user_id) {
                dispatch(authorizationSucces(auth.data));
            } else {
                dispatch(authorizationFailed(auth.data));
            }
        }catch (err) {
            dispatch(authorizationError());
        }
    }
}

export const createAccountSuccess = (userData) => {
    return {
        type: actionTypes.CREATE_ACCOUNT_SUCCESS,
        user: userData,
        isLogged: true
    }
};

export const createAccountFailed = (userData) => {
    return {
        type: actionTypes.CREATE_ACCOUNT_FAILED,
        msg: userData,
        isLogged: false
    }
};

export const createAccountError = () => {
    return {
        type: actionTypes.CREATE_ACCOUNT_ERROR
    }
}

export const getCreateAccount = (userDataPack) => {
    return async dispatch => {
        const data = userDataPack;
        try {
            const auth = await axios.post('/api/auth/authorization-create-account', data);
            if (auth.data.user_id) {
                dispatch(createAccountSuccess(auth.data));
            } else {
                dispatch(createAccountFailed(auth.data));
            }
        } catch {
            dispatch(createAccountError());
        }
    }
}

export const userLogout = () => {
    return async dispatch => {
        try {
            const logout = await axios.get('/api/auth/logout');
            console.log(logout);
            const message = {
                message: logout.data.msg
            }
            const logoutAction = {
                type: actionTypes.USER_LOGOUT,
                msg: message,
                isLogged: false
            };
            dispatch(logoutAction);
        } catch {
            // *** dopisac obsługę błędu
        }
    }
}
