import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/indexAction';
import Row from '../../component/UI/Row/Row';
import Loader from '../../component/UI/Loader/Loader';

class Partner extends Component {
    state = {
        rows: [
        { rowId: 0, show: false }
    ]
    }

    componentDidMount() {
        this.props.onGetPartner();
    }

    showHiddenRowHandler = (rowId, i, showhidden) => {
        const rows = this.state.rows;
        rows[i] = { rowId: rowId, show: !showhidden};
        this.setState({ rows: rows });
    }

    render() {
        const partnersArr = [];
        for (let partner in this.props.partners) {
            partnersArr.push(this.props.partners[partner]);
        }

        let allPartners;
        if (this.props.pCount > 0) {
            allPartners = partnersArr.map( (partner, index) => {
                const columnsOnArr = [partner.firstname+' '+partner.lastname, partner.email, partner.is_active ? 'Aktywny' : 'Nieaktywny'];
                const columnsHideArr = [
                    'Nr konta bankowego: '+partner.bank_account,
                    'Adress: ul. '+partner.street+' '+ partner.number+'/'+partner.local+', '+partner.city+'. '+partner.country+'.',
                    'Mobile: '+partner.mobile
                ];

                const showhidden = this.state.rows[index] ? this.state.rows[index].show : false;
                
                return (
                    <Row key={'partner'+partner.partner_id}
                        columnsOn={columnsOnArr}
                        columnsHide={columnsHideArr}
                        rowNum={index+1}
                        showHiddenRow={showhidden}
                        clicked={() => this.showHiddenRowHandler(partner.partner_id, index, showhidden)}
                        rowType={'BODY'} />
                )
            })
        } else {
            allPartners = (<h3>Nie posiadasz obecnie żadnych partnerów. Dodaj partnerów korzystając z przycisku "Dodaj Partnera"</h3>)
        }

        return(
            <div>
                <h1 onClick={this.lololo}>Partner</h1>
                { allPartners }
            </div>
        )
    }
}

const passReduxStateToComponentProps = (state) => {
    return {
        partners: state.partner.partnerData,
        pCount: state.partner.partnerCount
    }
}

const passReduxDispatchToComponentProps = (dispatch) => {
    return {
        onGetPartner: () => dispatch(actions.getPartnerInfo())
    }
}

export default connect(passReduxStateToComponentProps, passReduxDispatchToComponentProps)(Partner);