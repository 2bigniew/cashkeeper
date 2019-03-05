import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input onChange={props.changed}
                            { ...props.elementConfig }
                            className = {props.elClass}
                            value={ props.value } />
            break;
        case ('textarea'):
            inputElement = <textarea onChange={props.changed}
                            { ...props.elementConfig }
                            className={props.elClass}
                            value={ props.value } />
            break;
    }

    return inputElement;
}

export default input;