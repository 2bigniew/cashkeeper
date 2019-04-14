import * as actionTypes from'../actions/actionTypes';

const initialState = {
    borrowData: {},
    borrowCount: 0,
    borrowMsg: '',
    borrowSum: null
};

const setBorrowList = (state, action) => {
    const oldState = {
        ...state
    };

    const updatedBorrow = {
        ...action.borrow
    }

    let count = 0;
    for (let borrow in updatedBorrow) {
        count = count + 1;
    }

    const newState = {
        ...oldState,
        borrowData: {
            ...updatedBorrow
        },
        borrowCount: count,
    }
    return newState;
}

const setBorrowSum = (state, action ) => {
    const oldState = {
        ...state
    };

    const updatedBorrowSum = action.borrowSum;
    const newState = {
            ...oldState
        };
    newState.borrowSum = updatedBorrowSum;

    return newState;
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.BORROW_INFO_SUCCESS: return setBorrowList(state, action);
        case actionTypes.BORROW_SUM_SUCCESS: return setBorrowSum(state, action);
        default: return state;
    }
}

export default reducer;