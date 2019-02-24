import React, { Component } from 'react';
import Aux from '../Aux/Aux';   

class NonAuthView extends Component {

    render() {
        let nonAuthContent;
        if (!this.props.isAuth) {
            nonAuthContent = (
                <Aux>
                    { this.props.children }
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