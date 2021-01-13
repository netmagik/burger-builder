import React, { Fragment} from 'react';
import Modal from '../components/UI/Modal/Modal';
import useHttpErrorHandler from '../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Fragment>
                {/* Only show Modal when Error state is NOT null */}
                <Modal 
                    show={error}
                    modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
            <WrappedComponent {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;