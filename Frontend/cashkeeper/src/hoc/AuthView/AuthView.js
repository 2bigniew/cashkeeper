import React, { Component } from 'react';

import Aux from '../Aux/Aux';

class AuthView extends Component {

    render() {
        let authContent;
        if (this.props.isAuth) {
            authContent = (
                <Aux>
                    <p>Tu będzie widok zalogowanego użytkownika</p>
                    <section>
                        <p>Partnerzy</p>
                        <p>Moje zobowiązania</p>
                        <p>Moje pożyczki</p>
                        <p>Historia Transkacji</p>
                        <p>--</p>
                        <p>Moje konto</p>
                        <p>Wyloguj</p>
                    </section>
                </Aux>
            )
        } else {
            authContent = null;
        }

        return(
            <div>
                {authContent}
            </div>  
        )
    }
};

export default AuthView;