import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Tooblar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


import styles from './Layout.module.css';

class Layout extends Component 
{
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {

        return (

            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} close={this.sideDrawerClosedHandler} />
                <main  className={styles.Content}>
                    {this.props.children}
                </main>
             </Aux>
        );
    }
}


export default Layout;