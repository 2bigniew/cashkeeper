import React from 'react';
import classes from './Navbar.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const Navbar = (props) => {
    return (
        <nav>
            <ul class={classes["nav--list"]}>
                <NavigationItem navClass={classes["nav--listitem"]} link={"/partner"} >Partner</NavigationItem>
                <NavigationItem navClass={classes["nav--listitem"]} link={"/borrow"} >Borrow</NavigationItem>
                <NavigationItem navClass={classes["nav--listitem"]} link={"/loan"} >Loan</NavigationItem>
                <NavigationItem navClass={classes["nav--listitem"]} link={"/payment"} >Payment</NavigationItem>
            </ul>
        </nav>
    )
}

export default Navbar;