import React, { Fragment, Component } from 'react';
import Modal from '../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount () {
            this.requestnterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount() {
            // console.log('Will Unmount', this.requestnterceptor, this.responseInterceptor)
            axios.interceptors.request.eject(this.requestnterceptor)
            axios.interceptors.request.eject(this.responseInterceptor)
        }


        // When Modal is clicked, clear the Error state
        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render () {
        return (
            <Fragment>
                {/* Only show Modal when Error state is NOT null */}
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
            <WrappedComponent {...this.props} />
            </Fragment>
        )
        }
    }
}

export default withErrorHandler;