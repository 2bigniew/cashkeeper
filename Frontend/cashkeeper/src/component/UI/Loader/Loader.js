import React from 'react';
import classes from './Loader.css';

const Loader = (props) => (
    <div className={classes["loader-container"]}>
        <div className={classes["parent-loader"]}>
            <div className={[classes["loader"], classes["ld1"]].join(' ')}></div>
            <div className={[classes["loader"], classes["ld2"]].join(' ')}></div>
            <div className={[classes["loader"], classes["ld3"]].join(' ')}></div>
        </div>
    </div>
);

export default Loader;