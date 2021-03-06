import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import NavigationItem from '../../component/Navigation/NavigationItem/NavigationItem';
import classes from './Homepage.css';
import FrontHelpers from '../../FrotnHelpers/FrontHelpers';
import * as actions from '../../store/actions/indexAction';

class Homepage extends Component {
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
                        <section className={classes["homepage__links-group"]}>
                            <ul className={classes["homepage__list"]}>
                                <NavigationItem navClass={classes["homepage__list-item"]}
                                link={'/about'}>
                                    Info
                                </NavigationItem>
                                <NavigationItem navClass={classes["homepage__list-item"]}
                                link={'/create-account'}>
                                    Utwórz konto
                                </NavigationItem>
                                <NavigationItem navClass={classes["homepage__list-item"]}
                                link={'/login'}>
                                    Zaloguj
                                </NavigationItem>
                            </ul>      
                        </section>
                        <div className={classes["homepage__content"]}>
                            <h2 className={classes["homepage__catchword"]}>Oszczędzaj hajs, dzieciok</h2>
                            <h3 className={classes["homepage__quotes"]}>
                                { quotesAndAut }
                            </h3>
                            <div className={classes["homepage__diagram"]} id="diagram-homepage">
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

export default connect(passReduxStateToComponentProps, passReduxDispatchToComponentProps)(Homepage);