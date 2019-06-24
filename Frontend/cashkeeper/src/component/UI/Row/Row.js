import React from 'react';
import classes from './Row.css';
import Button from '../Button/Button';
import arrow from '../../../assets/bottom_arrow.png'

const row = (props) => {

    const columnsOn = props.columnsOn
    const columnsHide =  props.columnsHide

    const rowInfoListItemsOn = columnsOn.map( (col, i) => {
        return (<li className={classes['row__info__li']} key={i+col}>
            { col }
        </li>)
    });

    const rowInfoListItemsHide = columnsHide.map( (col, i) => {
        return (<li className={classes['row__info__li-hide']} key={i+col}>
            { col }
        </li>)
    });

    const showClasses = {
        1: classes['row__hide'],
        2: classes['row__show']
    };

    let ii = 1;
    if(props.showHiddenRow) {
        ii = 2;
    } else {
        ii = 1;
    }
  

    const hiddenRowClass = [classes['row__section-hide'], showClasses[ii]];
    const arrowStyle = {
        transition: 'all .2s linear',
        transform: 'rotate('+props.rotateValue+'deg)',
    }

    let rowClasses;
    switch (props.rowType) {
        case 'HEADER': rowClasses = 'row__header'; break;
        case 'BODY': rowClasses = 'row__body'; break;
        case 'FOOTER': rowClasses = 'row__footer'; break;
        default: rowClasses = ''; 
    };

    return (
    <div className={[classes['row'], classes[rowClasses]].join(' ')}>
        <div className={classes['row__section-on']}>
            <span className={classes['row__num']}>{props.rowNum}</span>
            <ul className={classes['row__info']}>
                { rowInfoListItemsOn }
            </ul>
            <ul className={classes['row__actions']}>
                <li className={classes['row__actions__li']}><Button clicked={props.firstAction} parentClass={classes['row__btn']}>{props.firstBtn}</Button></li>
                <li className={classes['row__actions__li']}><Button clicked={props.secondAction} parentClass={classes['row__btn']}>{props.secondBtn}</Button></li>
            </ul>
        </div>
        <div className={classes['row__arrow']} onClick={props.clicked}>
            <img width="20" src={arrow} alt="down" style={arrowStyle}/>
        </div>
        <div className={hiddenRowClass.join(' ')}>
            <ul className={classes['row__info-hide']}>
                { rowInfoListItemsHide }
            </ul>
        </div>
    </div>
    )
};

export default row;