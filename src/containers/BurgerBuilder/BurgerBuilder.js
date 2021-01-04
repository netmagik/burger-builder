import React, { Component, Fragment } from 'react';
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

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        orderingNow: false,
        loading: false,
        error: false
    }

    // Fetch Data - GET from Firebase
    componentDidMount () {
        axios.get('https://react-my-burger-6a5b6-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    orderingNowHandler = () => {
        this.setState({orderingNow: true})
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
                .map(igKey => {
                    return ingredients[igKey];
                })
                .reduce((sum, el) => {
                    return sum + el;
                }, 0)
        this.setState({purchasable: sum > 0});
    }



    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }


    purchaseHandler = () => {
        this.setState({orderingNow: true});
    }

    purchaseCancelHandler = () => {
        this.setState({orderingNow: false})
    }

    purchaseContinueHandler = () => {
       
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }


    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // Check to see if still loading... then show spinner

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger =  ( 
                <Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                orderingNow={this.orderingNowHandler}
                />
                </Fragment>
            );
            orderSummary =  <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
       
        // {salad: true, meat: false, ...}
        return (
                <Fragment>
                <Modal show={this.state.orderingNow} 
                        modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                </Fragment>
        )}
}



export default withErrorHandler(BurgerBuilder, axios);