import React, { Component } from 'react';

import Navbar from '../../component/Navigation/Navbar/Navbar'
import Aux from '../Aux/Aux';


class AuthView extends Component {

    render() {
        let authContent;
        if (this.props.isAuth) {
            authContent = (
                <Aux>
                    <Navbar /> 
                    { this.props.children }
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