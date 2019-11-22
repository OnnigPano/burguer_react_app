import React from 'react';

import styles from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let classesAttached = [styles.SideDrawer, styles.Close];

    if(props.open) {
        classesAttached = [styles.SideDrawer, styles.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.close}/>
            <div className={classesAttached.join(' ')}>
                <Logo height="11%" marginBottom="32px" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;