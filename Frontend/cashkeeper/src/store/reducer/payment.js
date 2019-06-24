import * as actionTypes from'../actions/actionTypes';

const initialState = {
    borrowPaymentData: null,
    borrowPaymentCount: 0,
    borrowPaymentSum: null,
    loanPaymentData: null,
    loanPaymentCount: 0,
    loanPaymentSum: null
};

const setBorrowPayment = (state, action) => {
    const oldState = { ...state };
    let count = 0;
    const updatedPayment = {
        ...action.borrow_payment
    };
    
    for (let payment in updatedPayment) {
        count =+ 1;
    }

    const newState = {
        ...oldState,
        borrowPaymentData: {
            ...updatedPayment
        },
        borrowPaymentCount: count
    };
    return newState;
}

const setBorrowPaymentSum = (state, action) => {
    const oldState = { ...state };

    const updatedPaymentSum = action.borrowSum;
    
    const newState = {
        ...oldState
    };

    newState.borrowPaymentSum = updatedPaymentSum;
    return newState;
}

const setLoanPayment = (state, action) => {
    const oldState = { ...state };
    let count = 0;
    const updatedPayment = {
        ...action.loan_payment
    };

    for (let payment in updatedPayment) {
        count =+ 1;
    }

    const newState = {
        ...oldState,
        loanPaymentData: {
            ...updatedPayment
        },
        loanPaymentCount: count
    };

    return newState;
}

const setLoanPaymentSum = (state, action) => {
    const oldState = { ...state };

    const updatedPaymentSum = action.loanSum;

    const newState = {
        ...oldState,
    };
    
    newState.loanPaymentSum = updatedPaymentSum;
    return newState;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BORROW_PAYMENT_INFO_SUCCESS: return setBorrowPayment(state, action);
        case actionTypes.LOAN_PAYMENT_INFO_SUCCESS: return setLoanPayment(state, action);
        case actionTypes.BORROW_PAYMENT_SUM_SUCCESS: return setBorrowPaymentSum(state, action);
        case actionTypes.LOAN_PAYMENT_SUM_SUCCESS: return setLoanPaymentSum(state, action);
        default: return state;
    }
}

export default reducer;