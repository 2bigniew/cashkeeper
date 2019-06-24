import * as actionTypes from'../actions/actionTypes';

const initialState = {
    loanData: {},
    loanCount: 0,
    loanMsg: '',
    loanSum: null
};

const setLoanList = (state, action) => {
    const oldState = {
        ...state
    }
    let count = 0; 
    const updatedLoan = {
        ...action.loan
    }

    for (let loan in updatedLoan) {
        count = count + 1;
    }
    const newState = {
        ...oldState,
        loanData: {
            ...updatedLoan
        },
        loanCount: count
    }

    return newState;
}

const setLoanSum = (state, action) => {
    const oldState = {
        ...state
    };

    const updatedLoan = action.loanSum;
    const newState = {
        ...oldState
    };
    newState.loanSum = updatedLoan;
    return newState;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAN_INFO_SUCCESS: return setLoanList(state, action);
        case actionTypes.LOAN_SUM_SUCCESS: return setLoanSum(state, action);
        default: return state;
    }
}

export default reducer;