import * as actionTypes from '../actions/actionTypes';

console.log(window.sessionStorage);
console.log(window.sessionStorage.getItem('cashkeeperUser'));

const initialState = {
    quotes: [
        {
            quote: 'Pieniądze są dobrym sługą, ale złym panem',
            id: 1,
            author_or_source: 'przysłowie francuskie'
        }
    ],
    isLogged: window.sessionStorage.getItem('cashkeeperUser') ? true : false,
    user: window.sessionStorage.getItem('cashkeeperUser') ? JSON.parse(window.sessionStorage.getItem('cashkeeperUser')) : null,
    msg: ''
};

console.log(initialState);

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
    window.sessionStorage.setItem('cashkeeperUser', JSON.stringify(action.user));
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
    console.log(newState);
    window.sessionStorage.setItem('cashkeeperUser', JSON.stringify(action.user));
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_START_QUOTES: return setQuotes(state, action);
        case actionTypes.AUTHORIZATION_SUCCES: return setUser(state, action);
        case actionTypes.AUTHORIZATION_FAILED: return setAuthorizationFailedMsg(state, action);
        case actionTypes.CREATE_ACCOUNT_SUCCESS: return setCreatedUser(state, action);
        case actionTypes.CREATE_ACCOUNT_FAILED: return setCreateAccountFailedMsg(state, action);
        default: 
            return state;
    }
};

export default reducer;