import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import classes from './NonAuthView.css';
import FrontHelpers from '../../FrotnHelpers/FrontHelpers';
import axios from '../../axios_cashkeeper';

class NonAuthView extends Component {
    state = {
        quotes: [
            {
                quotes: '',
                author_or_source: '',
            }
        ],
        integer: 0
    };

    randomQuotes = () => {
        window.setInterval(async () => {
            this.setState({
                integer: Math.floor(Math.random()*8)
            });
        }, 10000);
    }

    async componentWillMount() {
        try {
            const quotes = await axios.get('/quotes');
            this.setState({
                quotes: quotes.data.quotes
            });
            this.randomQuotes();
            // ogarnąć CORS
        } catch {

        }
    }

    componentDidMount() {   
        const canvas = document.querySelector('#canvas-nac');
        FrontHelpers.drawNewDiagram(canvas);
        window.clearTimeout(this.randomQuotes);
        // dodać wew funkcji kod z obrazkiem dla starych przeglądarek
    }

    render() {
        let quotesAndAut = '"Pieniądze są dobrym sługą, ale złym panem" - przysłowie francuskie';
        if (this.state.integer  > 0) {
            quotesAndAut = `"${this.state.quotes[this.state.integer].quote}" - ${this.state.quotes[this.state.integer].author_or_source}.`;
        }

        let nonAuthContent;
        if (!this.props.isAuth) {
            nonAuthContent = (
                <Aux>
                    <main className={classes.nac} onClick={this.checkState}>
                        <h1 className={classes["nac--logo"]}>#Cashkeeper</h1>
                        <section className={classes["nac--links-group"]}>
                            <ul className={classes["nac--list"]}>
                                <li className={classes["nac--list-item"]}>Info</li>
                                <li className={classes["nac--list-item"]}>Utwórz konto</li>
                                <li className={classes["nac--list-item"]}>Zaloguj</li>
                            </ul>      
                        </section>
                        <div className={classes["nac--content"]}>
                            <h2 className={classes["nac--catchword"]}>Oszczędzaj hajs, dzieciok</h2>
                            <h3 className={classes["nac--quotes"]}>
                                { quotesAndAut }
                            </h3>
                            <div className={classes["nac--diagram"]} id="diagram-nac">
                            <canvas id="canvas-nac" width="280" height="180"></canvas>
                            </div>
                        </div>
                    </main>
                    <footer className={classes["nac--footer"]}>
                        <p>Created by 2bigniew</p>
                        <a href="https://github.com/2bigniew">Github</a>
                        <a href="https://www.linkedin.com/in/zbigniew-stasiak/">LinkedIn</a>
                    </footer>
                </Aux>
            )
        } else {
            nonAuthContent = null;
        }

        return(
            <div>
               {nonAuthContent} 
            </div>
        )
    }
};

export default NonAuthView;