import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/indexAction';
import Row from '../../component/UI/Row/Row';
import Loader from '../../component/UI/Loader/Loader';
import classes from './Partner.css';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';

class Partner extends Component {
    state = {
        rows: [
        { rowId: 0, show: false, rotate: '0' }
        ],
        loader: true
    }

    componentDidMount() {
        this.props.onGetPartner();
    }

    componentWillReceiveProps() {
        this.setState({ loader: false })
    }

    showHiddenRowHandler = (rowId, i, showhidden) => {
        const rows = this.state.rows;
        rows[i] = { rowId: rowId, show: !showhidden, rotate: showhidden  ? '0' : '180'};
        this.setState({ rows: rows });
    }

    firstActionHandler = () => {
        console.log('firstActionHandler');
    }

    secondtActionHandler = () => {
        console.log('secondtActionHandler');
    }

    thirdActionHandler = () => {
        console.log('thirdActionHandler');
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
                const rotate = this.state.rows[index] ? this.state.rows[index].rotate : '0';
                
                return (
                    <Row key={'partner'+partner.partner_id}
                        columnsOn={columnsOnArr}
                        columnsHide={columnsHideArr}
                        rowNum={index+1}
                        showHiddenRow={showhidden}
                        rotateValue={rotate}
                        clicked={() => this.showHiddenRowHandler(partner.partner_id, index, showhidden)}
                        firstAction={this.firstActionHandler}
                        secondAction={this.secondtActionHandler}
                        thirdAction={this.thirdActionHandler}
                        rowType={'BODY'} />
                )
            })
        } else {
            allPartners = (<h3>Nie posiadasz obecnie żadnych partnerów. Dodaj partnerów korzystając z przycisku "Dodaj Partnera"</h3>)
        }

        return(
            <div>
                <h1 className={classes['partner__h1']}>Twoi partnerzy</h1>
                <div className={classes['partner__searchbox']}>
                    <label className={classes['partner__label']}>Znajdź partnera</label>
                    <input type="text" 
                        className={classes['partner__search']}
                        placeholder='Nazwisko...' />
                    <Button parentClass={classes['partner--search-btn']}>Wyszukaj</Button>
                </div>
                { allPartners }
                <Loader displayLoader={this.state.loader} />
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