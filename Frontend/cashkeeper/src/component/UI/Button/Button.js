import React from 'react';
import classes from './Button.css';

const Button = (props) => (
    <button
        onClick={(e) => props.clicked(e)}
        className={[classes["button"], props.parentClass].join(" ")}>
        {props.children}
    </button>
);

export default Button;