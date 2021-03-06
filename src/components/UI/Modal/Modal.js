import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';


const modal = props => {

    // Don't unnecessarily re-render Order Summary and Modal
    // Modal controls Order Summary

    // shouldComponentUpdate(nextProps, nextState) {
    //     //Only update when props (show) are different
    //     // Or when the Children Props are different (Order Summary)
    //    return nextProps.show !== props.show || nextProps.children !== props.children;
    // } 

    return (
    <Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal}
            style={{ 
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1': '0'}}>
            {props.children}
        </div>
    </Fragment>
    )}
 
export default React.memo(modal, 
    (prevProps, nextProps) => 
     nextProps.show === prevProps.show && 
     nextProps.children === prevProps.children
     );