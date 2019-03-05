import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import NavigationItem from '../../component/Navigation/NavigationItem/NavigationItem';
import classes from './Homepage.css';
import FrontHelpers from '../../FrotnHelpers/FrontHelpers';
import * as actions from '../../store/actions/indexAction';

class NonAuthView extends Component {
    state = {
        integer: 0
    };

    randomQuotes = () => {
        window.setInterval(async () => {
            this.setState({
                integer: Math.floor(Math.random()*8)
            });
        }, 10000);
    }

    componentWillMount() {
        if (!this.props.isLoggedStore) {
            this.props.onGetQuotes();   
            this.randomQuotes();
        }
    }

    componentDidMount() {   
        const canvas = document.querySelector('#canvas-homepage');
        if (canvas) {
            FrontHelpers.drawNewDiagram(canvas);
        }
        // dodać wew funkcji kod z obrazkiem dla starych przeglądarek
    }

    componentWillUnmount() {
        window.clearTimeout(this.randomQuotes);
    }

    render() {
        let quotesAndAut = '"Pieniądze są dobrym sługą, ale złym panem" - przysłowie francuskie';
        if (this.state.integer  > 0) {
            quotesAndAut = `"${this.props.quotesStore[this.state.integer].quote}" - ${this.props.quotesStore[this.state.integer].author_or_source}.`;
        }

        let nonAuthContent;
        if (!this.props.isLoggedStore) {
            nonAuthContent = (
                <Aux>
                    <main className={classes.homepage}>
                        <section className={classes["homepage--links-group"]}>
                            <ul className={classes["homepage--list"]}>
                                <NavigationItem class={classes["homepage--list-item"]}
                                link={'/about'}>
                                    Info
                                </NavigationItem>
                                <NavigationItem class={classes["homepage--list-item"]}
                                link={'/create-account'}>
                                    Utwórz konto
                                </NavigationItem>
                                <NavigationItem class={classes["homepage--list-item"]}
                                link={'/login'}>
                                    Zaloguj
                                </NavigationItem>
                            </ul>      
                        </section>
                        <div className={classes["homepage--content"]}>
                            <h2 className={classes["homepage--catchword"]}>Oszczędzaj hajs, dzieciok</h2>
                            <h3 className={classes["homepage--quotes"]}>
                                { quotesAndAut }
                            </h3>
                            <div className={classes["homepage--diagram"]} id="diagram-homepage">
                            <canvas id="canvas-homepage" width="280" height="180"></canvas>
                            </div>
                        </div>
                    </main>
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

const passReduxStateToComponentProps = (state) => {
    return {
        quotesStore: state.homePage.quotes,
        isLoggedStore: state.homePage.isLogged
    }
}

const passReduxDispatchToComponentProps = (dispatch) => {
    return {
        onGetQuotes: () => dispatch(actions.getQuotes())
    }
}

export default connect(passReduxStateToComponentProps, passReduxDispatchToComponentProps)(NonAuthView);