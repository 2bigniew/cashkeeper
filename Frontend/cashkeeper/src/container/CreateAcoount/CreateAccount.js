import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import classes from './CreateAccount.css';
import Input from '../../component/UI/Input/Input';
import * as actions from '../../store/actions/indexAction';
import checkMarkImg from '../../assets/check.png';

const myRegexp = {
    alphaNum: /^[a-z0-9]+$/i,
    alpha: /^[a-z]+$/i,
    num: /^\d+$/,
    mail: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
};

class CreateAccount extends Component {
    state = {
        isValid: false,
        disabled: true,
        formFields: {
            login: {
                fieldType: 'input',
                fieldConfig: { type: 'text', placeholder: 'Twój login...' },
                value: '',
                validation: { required: true, isAlphanum: true, minLength: 6, maxLength: 30 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"]
            },
            password: {
                fieldType: 'input',
                fieldConfig: { type: 'password', placeholder: 'Hasło' },
                value: '',
                validation: { required: true, isAlphanum: true, minLength: 6, maxLength: 30 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"]
            },
            secondPass: {
                fieldType: 'input',
                fieldConfig: { type: 'password', placeholder: 'Powtórz hasło' },
                value: '',
                validation: { required: true, isSecondPass: true, minLength: 6, maxLength: 30 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"]
            },
            firstname: {
                fieldType: 'input',
                fieldConfig: { type: 'text', placeholder: 'Imię' },
                value: '',
                validation: { required: true, isAlpha: true, minLength: 1, maxLength: 60 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"]
            },
            lastname: {
                fieldType: 'input',
                fieldConfig: { type: 'text', placeholder: 'Nazwisko' },
                value: '',
                validation: { required: true, isAlpha: true, minLength: 1, maxLength: 60 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"]
            },
            bank_account: {
                fieldType: 'input',
                fieldConfig: { type: 'text', placeholder: 'Nr konta bankowego' },
                value: '',
                validation: { required: true, isNum: true, minLength: 8, maxLength: 30 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"]
            },
            email: {
                fieldType: 'input',
                fieldConfig: { type: 'email', placeholder: 'Adres email' },
                value: '',
                validation: { required: false, isMail: true, minLength: 6, maxLength: 60 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"]
            },
            mobile: {
                fieldType: 'input',
                fieldConfig: { type: 'text', placeholder: 'Nr telefonu' },
                value: '',
                validation: { required: false, isNum: true, minLength: 6, maxLength: 12 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"]
            },
            street: {
                fieldType: 'input',
                fieldConfig: { type: 'text', placeholder: 'Ulica' },
                value: '',
                validation: { required: false, minLength: 1, maxLength: 60 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"]
            },
            number: {
                fieldType: 'input',
                fieldConfig: { type: 'text', placeholder: 'Numer' },
                value: '',
                validation: { required: false, minLength: 1, maxLength: 60 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"] 
            },
            local: {
                fieldType: 'input',
                fieldConfig: { type: 'text', placeholder: 'Lokal' },
                value: '',
                validation: { required: false, minLength: 1, maxLength: 60 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"] 
            },
            city: {
                fieldType: 'input',
                fieldConfig: { type: 'text', placeholder: 'Miasto' },
                value: '',
                validation: { required: false, minLength: 1, maxLength: 60 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"] 
            },
            country: {
                fieldType: 'input',
                fieldConfig: { type: 'text', placeholder: 'Kraj' },
                value: '',
                validation: { required: false, minLength: 1, maxLength: 60 },
                valid: false,
                validMark: null,
                touched: false,
                inputclass: classes["ca--input"] 
            }
        }
    }

    inputGetValue = (event, formFieldName) => {
        const updatedFields = {
            ...this.state.formFields,
            [formFieldName]: {
                ...this.state.formFields[formFieldName],
                value: event.target.value,
                valid: this.inputValidation(event.target.value, this.state.formFields[formFieldName].validation),
                touched: true
            }
        }  

        if (updatedFields[formFieldName].valid && updatedFields[formFieldName].touched) {
            const validInput = [classes["ca--input"], classes["ca--input-valid"]];
            updatedFields[formFieldName].inputclass = validInput.join(" ");
            updatedFields[formFieldName].validMark = checkMarkImg;
        } else {
            const notvalidInput = [classes["ca--input"], classes["ca--input-notvalid"]];
            updatedFields[formFieldName].inputclass = notvalidInput.join(" ");
            updatedFields[formFieldName].validMark = null;
        }

        const fieldsArr = [];
        for (let field in updatedFields) {
            if (updatedFields[field].validation.required) {
                fieldsArr.push(field);
            }
        }
        const shouldEnableCreateAccount = fieldsArr.filter( el => !updatedFields[el].valid );
        console.log(shouldEnableCreateAccount);
        if (shouldEnableCreateAccount.length === 0) {
            this.setState({ formFields: updatedFields, disabled: false });
        } else {
            this.setState({ formFields: updatedFields, disabled: true });
        }
    }

    validationProcess = (value, validation) => {
        let valid = true;

        if (validation.minLength) {
            valid = value.length >= validation.minLength && valid;
        }

        if (validation.maxLength) {
            valid = value.length <= validation.maxLength && valid;
        }

        if (validation.isAlphanum) {         
            valid = myRegexp.alphaNum.test(value) && valid;
        }

        if (validation.isAlpha) {
            valid = myRegexp.alpha.test(value) && valid;
        }

        if (validation.isNum) {
            valid = myRegexp.num.test(value) && valid;
        }

        if (validation.isMail) {
            valid = myRegexp.mail.test(value) && valid;
        }

        if (validation.isSecondPass) {
            valid = this.state.formFields.password.value === value &&
            value.trim() !== '' && valid;
        }

        return valid;
    }

    inputValidation = (value, validation) => {
        let valid = true;
        let filled = value.trim() !== '' && valid;;

        if (validation.required) {
            valid = value.trim() !== '' && valid;
        }
        
        if (valid && validation.required) {
            return this.validationProcess(value, validation); 
        } else if (valid && filled) {
            return this.optionalInputValidation(value, validation);
        } else {
            return valid;
        }   
    }

    optionalInputValidation = (value, validation) => {
        return this.validationProcess(value, validation);
    }

    createAccountHandler = async (e) => {
        e.preventDefault();
        const data = {};
        for (let field in this.state.formFields) {
            if(field !== 'secondPass' && this.state.formFields[field].value.trim() !== "") {
                data[field] = this.state.formFields[field].value;
            }
        }
        console.log(data);
        this.props.onCreateAccount(data);
    }

    render() {
        let btnValidationClass = '';
        if (this.state.disabled) {
            btnValidationClass = classes["btn-validation-class"];
        };
        const btnClasses = [classes["ca--button"], btnValidationClass].join(' ');

        const inputsArray = [];
        for (let key in this.state.formFields) {
            inputsArray.push({
                id: key,
                config: this.state.formFields[key]
            });
        }

        let inputs = inputsArray.map( inputEl => (
            <div className={classes["ca--form-row"]} key={"rowFor"+inputEl.id}>
                <div className="ca--input-row">
                    <span> { inputEl.config.validation.required ? '*' : '' } </span>
                    <Input 
                        key={inputEl.id}
                        elementType={inputEl.config.fieldType}
                        elementConfig={inputEl.config.fieldConfig}
                        changed={(event) => this.inputGetValue(event, inputEl.id)}
                        elClass={inputEl.config.inputclass} />
                    <div className={classes["ca--check"]}>
                        {inputEl.config.validMark 
                            ? <img src={inputEl.config.validMark} alt={'ok'} width={25}/> 
                            : '' }
                    </div>    
                </div>    
            </div>
        ));
        console.log(this.props.errorMsg);
        return(
            <Aux>
                <main className={classes.login}>
                    <p>{ this.props.errorMsg ? 'this.props.errorMsg' : '' }</p>
                    <section className={classes["ca--section"]}>
                        <form className={classes["ca--form"]}>
                            { inputs }
                            <div className={classes["ca--form-row"]}>
                                <input 
                                    disabled={this.state.disabled}
                                    type="submit" 
                                    onClick={(e) => this.createAccountHandler(e)} 
                                    role="button"
                                    className={btnClasses}
                                    value="Zaloguj!"/>
                            </div>
                        </form>
                    </section>
                    <p className={classes["ca--error"]}>{this.props.errorMsg.message}</p>
                </main>
            </Aux>
        )
    }
}

const passReduxStateToComponentProps = (state) => {
    return {
        errorMsg: state.homePage.msg
    }
}

const passReduxDispatchToComponentProps = (dispatch) => {
    return {
        onCreateAccount: (userData) => dispatch(actions.getCreateAccount(userData))
    }
}

export default connect(passReduxStateToComponentProps, passReduxDispatchToComponentProps)(CreateAccount);