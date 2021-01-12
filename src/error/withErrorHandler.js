import React, { Fragment, useState, useEffect } from 'react';
import Modal from '../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, setError] = useState(null);

            const reqInterceptor = axios.interceptors.request.use(req => {
                setError(null)
                return req;
            })
            const resInterceptor = axios.interceptors.response.use(res => res, err => {
                setError(err)
            })
        

        useEffect(() => {
            return (props) => {
            // console.log('Will Unmount', this.requestnterceptor, this.responseInterceptor)
            axios.interceptors.request.eject(reqInterceptor)
            axios.interceptors.request.eject(resInterceptor)
            }
        }, [reqInterceptor, resInterceptor]);


        // When Modal is clicked, clear the Error state
        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Fragment>
                {/* Only show Modal when Error state is NOT null */}
                <Modal 
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
            <WrappedComponent {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;