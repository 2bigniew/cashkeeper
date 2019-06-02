import React from 'react';
import classes from './BlackBoard.css';

const blackBoard = props => {
    const blackboardMobile = props.mobile ? classes["blackboard_mobile"] : ''
    return (<div className={[classes["blackboard"], blackboardMobile].join(' ')} 
        style={{width: props.width}} 
        onClick={props.closeBlackBoard}>
        <div className={classes["blackboard_content"]} style={{top: props.top, left: props.left}}>
            {props.children}
        </div>
    </div>)
};

export default blackBoard;