import React from 'react';

import classes from './Form.css';
import Input from '../Input/Input';
import Button from '../Button/Button';

const Form = (props) => {
    console.log(props);
    
    const formInputs = props.inputsArr.map( (input, i) => {
        return (<div className={classes["form__div"]} key={input.id+i}>
            <label className={classes["form__label"]}>
                {input.label}
            </label>
            <Input  
                elementType={input.elementType}
                value={input.value}
                validation={input.validation}
                inputType={input.inputType}
                inputPlaceholder={input.placeholder} 
                touched={input.touched}
                changed={(e) => props.inputChange(input.id, e.target.value)}/>
        </div>)
    });
    
    return (
        <form className={classes["form"]}>
            { formInputs }
            <Button
                parentClass={classes["form--btn"]}
                clicked={(e) => props.formAction(e)}>Wyślij</Button>
        </form>
    )
};

export default Form;
