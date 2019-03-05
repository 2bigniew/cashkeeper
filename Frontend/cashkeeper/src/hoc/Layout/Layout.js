import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';

class Layout extends Component {
    render() {
        return(
            <Aux>
                <div className={classes["layout--container"]}>
                    <header className={classes["layout--header"]}>
                        <button>Cofnij</button>
                        <h1 className={classes["layout--logo"]}>#Cashkeeper</h1>
                        <button>Wyloguj</button>
                    </header>
                    <div className={classes["layout--content"]}>
                        { this.props.children }
                    </div>    
                    <footer className={classes["layout--footer"]}>
                        <p>Created by 2bigniew</p>
                        <a href="https://github.com/2bigniew">Github</a>
                        <a href="https://www.linkedin.com/in/zbigniew-stasiak/">LinkedIn</a>
                    </footer>
                </div>
            </Aux>
        )
    }
}

export default Layout;