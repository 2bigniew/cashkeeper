import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/indexAction';
import Row from '../../component/UI/Row/Row';
import Loader from '../../component/UI/Loader/Loader';
import classes from './Partner.css';
import Button from '../../component/UI/Button/Button';
import * as FrontHelpers from '../../FrotnHelpers/FrontHelpers'
import Modal from '../../component/UI/Modal/Modal';
import Form from '../../component/UI/Form/Form';

class Partner extends Component {
    state = {
        rows: [
        { rowId: 0, show: false, rotate: '0' }
        ],
        loader: true,
        showModal: true,
        modalPurpose: 'CREATE',
        inputs: [
            {
                id: 'input-firstname',
                elementType: 'input', label: 'Imię', value: '', type: 'text', placeholder: 'np. Jan', 
                touched: false, validation: { required: true, isAlpha: true, minLength: 1, maxLength: 60 }
            },
            {
                id: 'input-lastname',
                elementType: 'input', label: 'Nazwisko', value: '', type: 'text', placeholder: 'np. Kowalski', 
                touched: false, validation: { required: true, isAlpha: true, minLength: 1, maxLength: 60 }
            },
            {
                id: 'input-email',
                elementType: 'input', label: 'Email', value: '', type: 'email', placeholder: 'jankowalski@eemail.com', 
                touched: false, validation: { required: false, isMail: true, minLength: 6, maxLength: 60 }
            },
            {
                id: 'input-bank',
                elementType: 'input', label: 'Nr konta', value: '', type: 'text', placeholder: 'Konto bankowe', 
                touched: false, validation: { required: true, isNum: true, minLength: 8, maxLength: 30 }
            },
            {
                id: 'input-mobile',
                elementType: 'input', label: 'Mobile', value: '', type: 'text', placeholder: 'np. 654 321 654', 
                touched: false, validation: { required: false, isNum: true, minLength: 6, maxLength: 12 }
            },
            {
                id: 'input-street',
                elementType: 'input', label: 'Ul.', value: '', type: 'text', placeholder: 'np. Długa', 
                touched: false, validation: { required: false, minLength: 1, maxLength: 60 }
            },
            {
                id: 'input-number',
                elementType: 'input', label: 'Numer', value: '', type: 'text', placeholder: 'np. 23', 
                touched: false, validation: { required: false, minLength: 1, maxLength: 60 }
            },
            {
                id: 'input-local',
                elementType: 'input', label: 'Lokal', value: '', type: 'text', placeholder: 'np. 42', 
                touched: false, validation: { required: false, minLength: 1, maxLength: 60 }
            },
            {
                id: 'input-city',
                elementType: 'input', label: 'Miasto', value: '', type: 'text', placeholder: 'np. Poznań', 
                touched: false, validation: { required: false, minLength: 1, maxLength: 60 }
            },
            {
                id: 'input-country',
                elementType: 'input', label: 'Kraj', value: '', type: 'text', placeholder: 'np. Polska', 
                touched: false, validation: { required: false, minLength: 1, maxLength: 60 }
            }
        ]
    }

    getCreatePartnerModal = () => {
        if(!this.state.showModal && !this.state.modalPurpose) {
            this.setState(
                {
                    showModal: true,
                    modalPurpose: FrontHelpers.modalPurpose.CREATE  
                }
            )
        }
    }

    createPartnerHandler = (e) => {
        e.preventDefault();
        console.log(e);
    }

    getUpdatePartnerModal = () => {
        if(!this.state.showModal && !this.state.modalPurpose) {
            this.setState(
                {
                    showModal: true,
                    modalPurpose: FrontHelpers.modalPurpose.UPDATE  
                }
            )
        }
    }

    getDeletePartnerModal = () => {
        if(!this.state.showModal && !this.state.modalPurpose) {
            this.setState(
                {
                    showModal: true,
                    modalPurpose: FrontHelpers.modalPurpose.DELETE  
                }
            )
        }
    }

    inputChangeHandler = (inputId, inputValue) => {
        console.log(inputValue);
        const inputs = [...this.state.inputs]
        const changedInput = inputs.filter( input => input.id === inputId)[0];
        changedInput.touched = true;
        changedInput.value = inputValue;
        const updatedInputs = [...inputs]

        updatedInputs.forEach((input, i) => {
            if (input.id === changedInput.id) {  
                updatedInputs.splice(i, 1, changedInput);
            }
        });
        this.setState({
            inputs: updatedInputs
        })
        
        
    }

    hideModalHandler = () => {
        this.setState(
            {
                showModal: false,
                modalPurpose: null
            }
        )
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
        let modal = null;
        if(this.state.showModal) {
            switch(this.state.modalPurpose) {
                case FrontHelpers.modalPurpose.CREATE:
                    modal = (<Modal 
                        modalTitle={'Dodaj nowego partnera'}
                        closeModal={this.hideModalHandler}>
                            <Form 
                                inputsArr={this.state.inputs} 
                                inputChange={(inputId, inputValue) => this.inputChangeHandler(inputId, inputValue)}
                                formAction={(e) => this.createPartnerHandler(e)}/>
                        </Modal>);
                    break;
                case FrontHelpers.modalPurpose.UPDATE:
                modal = 'update';
                break;
                case FrontHelpers.modalPurpose.DELETE:
                modal = 'delete';
                break;
                default: modal = null;
            }
        }
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
                        rowType={'BODY'} 
                        firstBtn={'Edytuj'}
                        secondBtn={'Usuń'} />
                )
            })
        } else {
            allPartners = (<h3>Nie posiadasz obecnie żadnych partnerów. Dodaj partnerów korzystając z przycisku "Dodaj Partnera"</h3>)
        }

        return(
            <div>
                <h1 className={classes['partner__h1']}>Twoi partnerzy</h1>
                <div className={classes['partner__action-row']}>
                    <div className={classes['partner__searchbox']}>
                        <label className={classes['partner__label']}>Znajdź partnera</label>
                        <input type="text" 
                            className={classes['partner__search']}
                            placeholder='Nazwisko...' />
                        <Button parentClass={classes['partner--search-btn']}>Wyszukaj</Button>
                    </div>
                    <div  className={classes['partner__searchbox']}>
                        <Button 
                            parentClass={classes['partner--search-btn']}
                            clicked={this.getCreatePartnerModal}>Dodaj partnera</Button>
                    </div>
                </div>
                { allPartners }
                <Loader displayLoader={this.state.loader} />
                { modal }
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