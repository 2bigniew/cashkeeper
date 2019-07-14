import React from 'react';
import classes from './NavMobile.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const Navbar = (props) => {
    return (
        <nav>
            <ul className={classes["nav-mobile__list"]}>
                <NavigationItem navClass={classes["nav-mobile__listitem"]} link={"/partner"} >Partnerzy</NavigationItem>
                <NavigationItem navClass={classes["nav-mobile__listitem"]} link={"/borrow"} >Pożyczenia</NavigationItem>
                <NavigationItem navClass={classes["nav-mobile__listitem"]} link={"/loan"} >Zobowiązania</NavigationItem>
                <NavigationItem navClass={classes["nav-mobile__listitem"]} link={"/payment"} >Płatności</NavigationItem>
            </ul>
        </nav>
    )
}

export default Navbar;