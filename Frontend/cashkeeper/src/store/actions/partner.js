import * as actionTypes from './actionTypes';
import axios from '../../axios_cashkeeper';

const partnerInfoSuccess = (data) => {
    return {
        type: actionTypes.PARTNER_INFO_SUCCESS,
        partner: data,
    }
}

const partnerInfoFail = () => {
    return {
        type: actionTypes.PARTNER_INFO_FAIL
    }
}

export const getPartnerInfo = () => {
    return async dispatch => {
        try {
            const token = window.localStorage.getItem('user_token');
            const partner = await axios.get('/api/partner/list?user_token='+token);
            // console.log(partner.data);
            dispatch(partnerInfoSuccess(partner.data));
        } catch {
            dispatch(partnerInfoFail());
        }
    }
}

const singlePartnerInfoSuccess = (data) => {
    return {
        type: actionTypes.SINGLE_PARTNER_INFO_SUCCESS,
        partner: data,
    }
}

const singlePartnerInfoFail = () => {
    return {
        type: actionTypes.SINGLE_PARTNER_INFO_FAIL
    }
}

export const getSinglePartnerInfo = (partnerId) => {
    return async dispatch => {
        try {
            const token = window.localStorage.getItem('user_token');
            const partner = await axios.get('/api/partner/getById?partner_id='+partnerId+'&user_token='+token);
            console.log(partner.data);
            dispatch(singlePartnerInfoSuccess(partner.data));
        } catch {
            dispatch(singlePartnerInfoFail());
        }
    }
}