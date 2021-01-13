import React, { useState, useEffect, Fragment } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../error/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const burgerBuilder = props => {

    const initial = null;
    
    const [ingredients, setIngredients] = useState(initial)
    const [totalPrice, setTotalPrice] = useState(4)
    const [purchasable, setPurchasable] = useState(false)
    const [orderingNow, setOrderingNow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    // Fetch Data - GET from Firebase

    useEffect(() => {
        axios.get('https://react-my-burger-6a5b6-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => {
            setIngredients(response.data)
        })
        .catch(error => {
            setError(true)
        })
    },[])

    const orderingNowHandler = () => {
        setOrderingNow(true)
    }

    const updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
                .map(igKey => {
                    return ingredients[igKey];
                })
                .reduce((sum, el) => {
                    return sum + el;
                }, 0)
        setPurchasable(sum > 0);
    }



    const addIngredientHandler = (type) => {
        const oldCount = ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice + priceAddition;
        setTotalPrice(newPrice);
        setIngredients(updatedIngredients);
        
        updatePurchaseState(updatedIngredients);
    }

    const removeIngredientHandler = (type) => {
        const oldCount = ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice - priceDeduction;
        setTotalPrice(newPrice);
        setIngredients(updatedIngredients);

        updatePurchaseState(updatedIngredients);
    }


    const purchaseHandler = () => {
        setOrderingNow(true);
    }

    const purchaseCancelHandler = () => {
        setOrderingNow(false);
    }

    const purchaseContinueHandler = () => {
       
        const queryParams = [];
        for (let i in ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]))
        }
        queryParams.push('price=' + totalPrice);

        const queryString = queryParams.join('&');
        props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

        const disabledInfo = {
            ...ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // Check to see if still loading... then show spinner

        let orderSummary = null;

        let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (ingredients) {
            burger =  ( 
                <Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls 
                ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                disabled={disabledInfo}
                price={totalPrice}
                purchasable={purchasable}
                orderingNow={orderingNowHandler}
                />
                </Fragment>
            );
            orderSummary =  <OrderSummary 
            ingredients={ingredients}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            price={totalPrice}
            />
        }

        if (loading) {
            orderSummary = <Spinner />
        }
       
        // {salad: true, meat: false, ...}
        return (
                <Fragment>
                <Modal show={orderingNow} 
                        modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                </Fragment>
        )}



export default withErrorHandler(burgerBuilder, axios);