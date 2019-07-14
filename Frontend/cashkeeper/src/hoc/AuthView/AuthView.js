import React, { Component } from 'react';

import Navbar from '../../component/Navigation/Navbar/Navbar'
import Aux from '../Aux/Aux';


class AuthView extends Component {
    state = {
        mobileNav: false,
    }

    showMobileNavHandler = () => {
        const showMobileNav = this.state.mobileNav;
        this.setState({mobileNav: !showMobileNav});
    }

    closeMobileNavHandler = () => {
        this.setState({mobileNav: false});
    }

    render() {
        let authContent;
        if (this.props.isAuth) {
            authContent = (
                <Aux>
                    <Navbar 
                        showMobileNav={this.state.mobileNav} 
                        closeNav={this.closeMobileNavHandler}
                        mobileNavAction={this.showMobileNavHandler} /> 
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