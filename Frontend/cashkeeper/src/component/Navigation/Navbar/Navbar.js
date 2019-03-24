import React from 'react';
import classes from './Navbar.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const Navbar = (props) => {
    return (
        <nav>
            <ul className={classes["nav__list"]}>
                <NavigationItem navClass={classes["nav__listitem"]} link={"/partner"} >Partner</NavigationItem>
                <NavigationItem navClass={classes["nav__listitem"]} link={"/borrow"} >Borrow</NavigationItem>
                <NavigationItem navClass={classes["nav__listitem"]} link={"/loan"} >Loan</NavigationItem>
                <NavigationItem navClass={classes["nav__listitem"]} link={"/payment"} >Payment</NavigationItem>
            </ul>
        </nav>
    )
}

export default Navbar;