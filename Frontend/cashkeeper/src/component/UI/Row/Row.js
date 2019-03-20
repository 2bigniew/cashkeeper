import React from 'react';
import classes from './Row.css';

const row = (props) => {

    const columnsOn = props.columnsOn
    const columnsHide =  props.columnsHide

    const rowInfoListItemsOn = columnsOn.map( col => {
        return (<li className={classes['row--info--li']}>
            { col }
        </li>)
    });

    const rowInfoListItemsHide = columnsHide.map( col => {
        return (<li className={classes['row--info--li-hide']}>
            { col }
        </li>)
    });

    let showHidenRow = false;
    const showClasses = {
        1: classes['row--hide'],
        2: classes['row--show']
    };

    let ii = 1;
    if(props.showHiddenRow) {
        ii = 2;
    } else {
        ii = 1;
    }
  

    const hiddenRowClass = [classes['row--section-hide'], showClasses[ii]];

    let rowClasses;
    switch (props.rowType) {
        case 'HEADER': rowClasses = 'row--header'; break;
        case 'BODY': rowClasses = 'row--body'; break;
        case 'FOOTER': rowClasses = 'row--footer'; break;
        default: rowClasses = ''; 
    };

    return (
    <div className={[classes['row'], classes[rowClasses]].join(' ')}>
        <div className={classes['row--section-on']} onClick={props.clicked}>
            <span className={classes['row--num']}>{props.rowNum}</span>
            <ul className={classes['row--info']}>
                { rowInfoListItemsOn }
            </ul>
            <ul className={classes['row--actions']}>
                <button>Akcja 1</button>
                <button>Akcja 2</button>
                <button>Akcja 3</button>
            </ul>
        </div>
        <div className={hiddenRowClass.join(' ')}>
            <ul className={classes['row--info-hide']}>
                { rowInfoListItemsHide }
            </ul>
        </div>
    </div>
    )
};

export default row;