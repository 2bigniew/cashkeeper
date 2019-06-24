import React from 'react';
import classes from './Navbar.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import BlackBoard from '../../UI/BlackBoard/BlackBoard';

const Navbar = (props) => {
    let mobileNav = null;
    let menu = 'MENU';
    if (props.showMobileNav) {
        menu = 'X';
        mobileNav = (
            <BlackBoard left={0} top={'80px'} width={'80vw'} closeBlackBoard={props.closeNav}>
                <ul className={classes["nav-mobile__list"]}>
                    <NavigationItem navClass={classes["nav-mobile__listitem"]} link={"/partner"} >Partnerzy</NavigationItem>
                    <NavigationItem navClass={classes["nav-mobile__listitem"]} link={"/borrow"} >Pożyczenia</NavigationItem>
                    <NavigationItem navClass={classes["nav-mobile__listitem"]} link={"/loan"} >Zobowiązania</NavigationItem>
                    <NavigationItem navClass={classes["nav-mobile__listitem"]} link={"/payment"} >Płatności</NavigationItem>
                </ul>
            </BlackBoard>
        );
    }
    return (
        <nav>
            <ul className={classes["nav__list"]}>
                <NavigationItem navClass={classes["nav__listitem"]} link={"/partner"} >Partnerzy</NavigationItem>
                <NavigationItem navClass={classes["nav__listitem"]} link={"/borrow"} >Pożyczenia</NavigationItem>
                <NavigationItem navClass={classes["nav__listitem"]} link={"/loan"} >Zobowiązania</NavigationItem>
                <NavigationItem navClass={classes["nav__listitem"]} link={"/payment"} >Płatności</NavigationItem>
                <li className={classes["nav__listitem-last"]}>
                    <button 
                    onClick={props.mobileNavAction}
                    className={classes["nav__listitem--btn"]}>
                        {menu}
                    </button>
                </li>
            </ul>
            { mobileNav }
        </nav>
    )
}

export default Navbar;