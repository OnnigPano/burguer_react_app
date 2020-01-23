import React from 'react';

import styles from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem  link="/" exact>Burger Builder</NavigationItem>
        { props.isAuth ? <NavigationItem  link="/orders" >Orders</NavigationItem> : null }
        { props.isAuth ? <NavigationItem  link="/logout" >Logout</NavigationItem> : null }
        { !props.isAuth ? <NavigationItem  link="/auth" >Authentication</NavigationItem> : null }
    </ul>
);

export default navigationItems;

