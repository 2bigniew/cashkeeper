import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/indexAction';
import Row from '../../component/UI/Row/Row';
import Loader from '../../component/UI/Loader/Loader';
import classes from './Borrow.css';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';

class Borrow extends Component {
    state = {
        rows: [
            { rowId: 0, show: false, rotate: '0' }
        ],
        loader: true,
        partners: []
    }

    componentDidMount() {
        this.props.onGetBorrow();
    }

    componentWillReceiveProps() {
        this.setState({ loader: false });
        // dodac renderowanie opisów - zrobić to przez przypisanie propsa do lokalnego state
        // dodac mały loader
    }

    showHiddenRowHandler = (rowId, i, showhidden, partner) => {
        // this.props.onGetPartnerToBorrow(partner);
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
        const borrowsArr = [];
        for (let borrow in this.props.borrows) {
            borrowsArr.push(this.props.borrows[borrow]);
        }

        let allBorrows;
        if (this.props.bCount > 0) {
            allBorrows = borrowsArr.map( (borrow, index) => {
                const columnsOnArr = [borrow.borrow_serial, borrow.borrow_date, borrow.value, borrow.purpose];
                const columnsHideArr = [];
                const bpd = borrow.PartnerAccount;

                if (bpd) {
                    columnsHideArr.push(`${bpd.firstname} ${bpd.lastname}, mail: ${bpd.email}`);
                    columnsHideArr.push(`${bpd.street} ${bpd.number}/${bpd.local}, ${bpd.city}`);
                    columnsHideArr.push(`Nr. konta: ${bpd.bank_account}`);
                }

                const showhidden = this.state.rows[index] ? this.state.rows[index].show : false;
                const rotate = this.state.rows[index] ? this.state.rows[index].rotate : '0';
                
                return (
                    <Row key={'borrow'+borrow.borrow_id}
                        columnsOn={columnsOnArr}
                        columnsHide={columnsHideArr}
                        rowNum={index+1}
                        showHiddenRow={showhidden}
                        rotateValue={rotate}
                        clicked={() => this.showHiddenRowHandler(borrow.borrow_id, index, showhidden, borrow.partner_id)}
                        firstAction={this.firstActionHandler}
                        secondAction={this.secondtActionHandler}
                        thirdAction={this.thirdActionHandler}
                        rowType={'BODY'} />
                )
            })
        } else {
            allBorrows = (<h3>Nie posiadasz obecnie żadnych pożyczeń. Dodaj pożyczenia korzystając z przycisku "Dodaj Pożyczenia"</h3>)
        }
        return(
            <div>
                <h1 className={classes['borrow__h1']}>Borrow</h1>
                <div className={classes['borrow__searchbox']}>
                    <label className={classes['borrow__label']}>Znajdź pożyczenie</label>
                    <input type="text" 
                        className={classes['borrow__search']}
                        placeholder='Nazwisko...' />
                    <Button parentClass={classes['borrow--search-btn']}>Wyszukaj</Button>
                </div>
                { allBorrows }
                <Loader displayLoader={this.state.loader} />
            </div>
        )
    }
}


const passReduxStateToComponentProps = (state) => {
    return {
        borrows: state.borrow.borrowData,
        bCount: state.borrow.borrowCount,
        partnerDesc: state.partner.partnerToBorrow
    }
}

const passReduxDispatchToComponentProps = (dispatch) => {
    return {
        onGetBorrow: () => dispatch(actions.getBorrowInfo()),
        onGetPartnerToBorrow: (partnerId) => dispatch(actions.getSinglePartnerInfo(partnerId))
    }
}

export default connect(passReduxStateToComponentProps, passReduxDispatchToComponentProps)(Borrow);