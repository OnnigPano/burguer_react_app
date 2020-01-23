import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                <Toolbar isAuth={this.props.isAuth} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth={this.props.isAuth} open={this.state.showSideDrawer} close={this.sideDrawerClosedHandler} />
                <main  className={styles.Content}>
                    {this.props.children}
                </main>
             </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.idToken != null
    }
}

export default connect(mapStateToProps)(Layout);