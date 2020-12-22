import React, { Component, Fragment } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

    // Don't unnecessarily re-render Order Summary and Modal
    // Modal controls Order Summary

    shouldComponentUpdate(nextProps, nextState) {
        //Only update when props (show) are different
       return nextProps.show !== this.props.show;
    } 

    componentWillUpdate () {
        console.log('[Modal] will update')
    }


render () {

    return (
    <Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div className={classes.Modal}
            style={{ 
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1': '0'}}>
            {this.props.children}
        </div>
    </Fragment>
    )}
 }

export default Modal;