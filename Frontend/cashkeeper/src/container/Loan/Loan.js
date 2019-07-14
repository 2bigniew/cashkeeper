import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/indexAction';
import Row from '../../component/UI/Row/Row';
import Loader from '../../component/UI/Loader/Loader';
import classes from './Loan.css';
import Button from '../../component/UI/Button/Button';

class Loan extends Component {
    state = {
        rows: [
            { rowId: 0, show: false, rotate: '0' }
        ],
        loader: true,
        partners: []
    }

    componentDidMount() {
        this.props.onGetLoan();
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
        const loansArr = [];
        for (let loan in this.props.loans) {
            loansArr.push(this.props.loans[loan]);
        }

        let allLoans;
        if (this.props.lCount > 0) {
            allLoans = loansArr.map( (loan, index) => {
                const columnsOnArr = [loan.loan_serial, loan.loan_date, loan.value, loan.purpose];
                const columnsHideArr = [];
                const lpa = loan.PartnerAccount;

                if (lpa) {
                    columnsHideArr.push(`${lpa.firstname} ${lpa.lastname}, mail: ${lpa.email}`);
                    columnsHideArr.push(`${lpa.street} ${lpa.number}/${lpa.local}, ${lpa.city}`);
                    columnsHideArr.push(`Nr. konta: ${lpa.bank_account}`);
                }

                const showhidden = this.state.rows[index] ? this.state.rows[index].show : false;
                const rotate = this.state.rows[index] ? this.state.rows[index].rotate : '0';
                
                return (
                    <Row key={'loan'+loan.loan_id}
                        columnsOn={columnsOnArr}
                        columnsHide={columnsHideArr}
                        rowNum={index+1}
                        showHiddenRow={showhidden}
                        rotateValue={rotate}
                        clicked={() => this.showHiddenRowHandler(loan.loan_id, index, showhidden, loan.partner_id)}
                        firstAction={this.firstActionHandler}
                        secondAction={this.secondtActionHandler}
                        thirdAction={this.thirdActionHandler}
                        rowType={'BODY'} />
                )
            })
        } else {
            allLoans = (<h3>Nie posiadasz obecnie żadnych zobowiązań. Dodaj zobowiązanie korzystając z przycisku "Dodaj Pożyczenia"</h3>)
        }
        return(
            <div>
                <h1 className={classes['loan__h1']}>Zobowiązanie</h1>
                <div className={classes['loan__action-row']}>
                    <div className={classes['loan__box']}>
                        <label className={classes['loan__label']}>Znajdź zobowiązanie</label>
                        <input type="text" 
                            className={classes['loan__search']}
                            placeholder='Nazwisko...' />
                        <Button parentClass={classes['loan--btn']}>Wyszukaj</Button>
                    </div>
                    <div  className={classes['loan__box']}>
                        <Button parentClass={classes['loan--btn']}>Dodaj zobowiązanie</Button>
                    </div>
                </div>
                { allLoans }
                <Loader displayLoader={this.state.loader} />
            </div>
        )
    }
}


const passReduxStateToComponentProps = (state) => {
    return {
        loans: state.loan.loanData,
        lCount: state.loan.loanCount,
    }
}

const passReduxDispatchToComponentProps = (dispatch) => {
    return {
        onGetLoan: () => dispatch(actions.getLoanInfo()),
    }
}

export default connect(passReduxStateToComponentProps, passReduxDispatchToComponentProps)(Loan);