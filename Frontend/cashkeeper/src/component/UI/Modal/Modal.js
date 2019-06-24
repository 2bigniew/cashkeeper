import React from 'react';
import classes from './Modal.css';

import BlackBoard from '../BlackBoard/BlackBoard';

const modal = (props) => {
    return (<BlackBoard top={'5%'} left={'10%'} width={'100vw'}>
        <div className={classes["modal"]}>
            <div className={classes["modal__header"]}>
                <button className={classes["modal__btn"]} onClick={props.closeModal}>X</button>
                <h1 className={classes["modal__h1"]}>{props.modalTitle}</h1>
            </div>
            <div className={classes["modal__body"]}>
                {props.children}
            </div>
        </div>
    </BlackBoard>)
}

export default modal;