import React, { useState, Fragment } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/SideDrawer/Sidedrawer';

const layout = (props) => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false)
    }

    const sideDrawerToggleHandler = () => {
       setSideDrawerIsVisible(!sideDrawerIsVisible)
    }

    return (
    <Fragment>
        <Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
        <Sidedrawer open={sideDrawerIsVisible} closed={sideDrawerClosedHandler}/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>
    )
}

export default layout;