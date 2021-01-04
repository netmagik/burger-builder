import React, { Component, Fragment } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/SideDrawer/Sidedrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render () {

    return (
    <Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <Sidedrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Fragment>
    )
    }
}

export default Layout;