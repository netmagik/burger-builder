import React, { useState, useEffect } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

const checkout = (props) => {

        const initial = [];

        const [ingredients, setIngredients] = useState(initial);
        const [price, setPrice] = useState(0)
       
        useEffect(() => {
            const query = new URLSearchParams(props.location.search);
            const ing = {};
            let pr = 0;
            for (let param of query.entries()) {
                // 'salad', '1'
                if (param[0] === 'price') {
                  pr = param[1];
                } else {
                ing[param[0]] = +param[1]
                }
            }
            setIngredients(ing);
            setPrice(pr);
        }, [])
 

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    return (
        <div>
            <CheckoutSummary 
                ingredients={ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}/>
            <Route 
                path={props.match.path + '/contact-data'} 
                render={(props) => (<ContactData ingredients={ingredients} price={price} {...props}/>)} />
        </div>
    )

}
export default checkout;