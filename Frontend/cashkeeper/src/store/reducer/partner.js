import * as actionTypes from '../actions/actionTypes';

const initialState = {
    partnerData: {},
    partnerCount: 0,
    partnerMsg: '',
};

const setPartnerList = (state, action) => {
    const oldState = {
        ...state
    };

    const updatedPartner = {
        ...action.partner
    }

    let count = 0;
    for (let partner in updatedPartner) {
        count +=1;
    }

    const newState = {
        ...oldState,
        partnerData: {
            ...updatedPartner
        },
        partnerCount: count,
    }
    console.log(newState);
    return newState;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PARTNER_INFO_SUCCESS: return setPartnerList(state, action);
        default: return state;
    }
}

export default reducer;