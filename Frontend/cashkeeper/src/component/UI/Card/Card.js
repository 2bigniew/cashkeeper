import React from 'react';
import classes from './Card.css';

const card = (props) => {
    const spanClass = props.details[5].type === 'borrow' ? 'card__span_green' : 'card__span_red';
    const mark = props.details[5].type === 'borrow' ? '+' : '-';
    const cardBody = (
        <li className={classes["card__li"]}>
            <p className={classes["card__p"]}>Imię i nazwisko: <br />{props.details[3]+' '+props.details[4]}</p>
            <p className={classes["card__p"]}>Numer seryjny: <br />{props.details[0]}</p>
            <p className={classes["card__p"]}>Czy spłacone: {''+ props.details[1] === true ? 'TAK' : 'NIE'}</p>
        </li>
    )
    return (
        <div className={classes["card__container"]}>
            <div className={classes["card__header"]}>
                <h2 className={classes["card__h2"]}>
                    Z dnia:&nbsp;
                    <span className={classes["card__span"]}>{props.header}</span>
                </h2>
                <h3 className={classes["card__h3"]}>
                    Wartość:&nbsp;
                    <span className={classes[spanClass]}>
                        {mark}{props.mainValue.toFixed(2) + ' PLN'}
                    </span>
                </h3>
            </div>
            <div className={classes["card__body"]}>
                <ul>
                    {cardBody}
                </ul>
            </div>     
        </div>
    )
};

export default card;