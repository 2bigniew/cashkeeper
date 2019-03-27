import * as actionTypes from'../actions/actionTypes';

const initialState = {
    loanData: {},
    loanCount: 0,
    loanMsg: ''
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAN_INFO_SUCCESS: return setLoanList(state, action);
        default: return state;
    }
}

export default reducer;