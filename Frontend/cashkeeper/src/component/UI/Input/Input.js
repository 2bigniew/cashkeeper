import React from 'react';

import frontHelpers from '../../../FrotnHelpers/FrontHelpers';
import classes from './Input.css';

const input = (props) => {
    let inputElement;
    let inputValid = false;
    let inputClasses = classes["input"];
    if(props.touched) {
        inputValid = frontHelpers.validationInputProcess(props.value, props.validation);
        if (inputValid) {
            inputClasses = [classes["input"], classes["input__valid"]].join(' ');
        } else {
            inputClasses = [classes["input"], classes["input__not-valid"]].join(' ');
        }
    } 

    switch (props.elementType) {
        case ('input'):
            inputElement = <input onChange={(e) => props.changed(e)}
                            value={ props.value }
                            type={props.inputType}
                            placeholder={props.inputPlaceholder}
                            className = {inputClasses}
                            />
            break;
        case ('textarea'):
            inputElement = <textarea onChange={(e) => props.changed(e)}
                            value={ props.value }
                            placeholder={props.inputPlaceholder}
                            className={inputClasses}
                            />
            break;
        default:
            inputElement = null;
    }

    return inputElement;
}

export default input;