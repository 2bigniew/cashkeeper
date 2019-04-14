import * as actionTypes from '../actions/actionTypes';

// console.log(window.sessionStorage.getItem('cashkeeperUser'));

const initialState = {
    quotes: [
        {
            quote: 'Pieniądze są dobrym sługą, ale złym panem',
            id: 1,
            author_or_source: 'przysłowie francuskie'
        }
    ],
    isLogged: window.localStorage.getItem('cashkeeperUser') ? true : false,
    user: window.localStorage.getItem('cashkeeperUser') ? JSON.parse(window.localStorage.getItem('cashkeeperUser')) : null,
    userDetails: null,
    msg: '',
    logoutMsg: ''
};

const setQuotes = (state, action) => {
    const oldState = {
        ...state
    };
    const updatedQuotes = {
        ...action.quotes
    };
    const newState = {
        ...oldState,
        quotes: {
            ...updatedQuotes
        } 
    };
    return newState;
}

const setUser = (state, action) => {
    const oldState = {
        ...state
    };
    const updatedUser = {
        ...action.user
    };
    const newState = {
        ...oldState,
        user: {
            ...updatedUser
        },
        isLogged: action.isLogged
    };
    window.localStorage.setItem('cashkeeperUser', JSON.stringify(action.user));
    window.localStorage.setItem('user_token', action.token);
    console.log(newState);
    return newState;
}

const setAuthorizationFailedMsg = (state, action) => {
    const oldState = {
        ...state
    };
    const updatedMsg = {
        ...action.msg
    };
    const newState = {
        ...oldState,
        msg: {
            ...updatedMsg
        },
        isLogged: action.isLogged
    };
    return newState;
}

const setCreatedUser = (state, action) => {
    const oldState = {
        ...state
    };
    const updatedUser = {
        ...action.user
    };
    const newState = {
        ...oldState,
        user: {
            ...updatedUser
        },
        isLogged: action.isLogged
    };
    window.localStorage.setItem('cashkeeperUser', JSON.stringify(action.user));
    window.localStorage.setItem('user_token', action.token);
    console.log(newState);
    return newState;
}

const setCreateAccountFailedMsg = (state, action) => {
    const oldState = {
        ...state
    };
    const updatedMsg = {
        ...action.msg
    };
    const newState = {
        ...oldState,
        msg: {
            ...updatedMsg
        },
        isLogged: action.isLogged
    };
    return newState;
}

const setUserLogout = (state, action) => {
    const oldState = {
        ...state
    };
    window.localStorage.clear();
    const newState = {
        ...oldState,
        isLogged: window.localStorage.getItem('cashkeeperUser') ? true : false,
        user: window.localStorage.getItem('cashkeeperUser') ? JSON.parse(window.localStorage.getItem('cashkeeperUser')) : null,
        logoutMsg: action.msg,
        msg: ''
    };
    return newState;
}

const setUserInfo = (state, action) => {
    const oldState = {
        ...state
    }

    const newState = {
        ...oldState,
        userDetails: {
            ...action.userDetails
        }
    }
    console.log(newState);
    
    return newState;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_START_QUOTES: return setQuotes(state, action);
        case actionTypes.AUTHORIZATION_SUCCES: return setUser(state, action);
        case actionTypes.AUTHORIZATION_FAILED: return setAuthorizationFailedMsg(state, action);
        case actionTypes.CREATE_ACCOUNT_SUCCESS: return setCreatedUser(state, action);
        case actionTypes.CREATE_ACCOUNT_FAILED: return setCreateAccountFailedMsg(state, action);
        case actionTypes.USER_LOGOUT: return setUserLogout(state, action);
        case actionTypes.GET_USER_WHOLE_INFO_SUCCESS: return setUserInfo(state, action);
        default: 
            return state;
    }
};

export default reducer;