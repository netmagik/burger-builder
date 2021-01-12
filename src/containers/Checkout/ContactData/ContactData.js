import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


const contactData = (props) => {

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false, 
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false, 
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true,
            touched: false
        }
    })

    const [formIsValid, setFormIsValid] = useState(true);

    const [loading, setLoading] = useState(false);

    // Send the order data to the server
    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for (let i in orderForm) {
            formData[i] = orderForm[i].value
        }

        setLoading(true)
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData
        }
           
        axios.post('/orders.json', order)
            .then(response => {
                // setData(data)
                setLoading(false)
                props.history.push('/orders');
            })
            .catch(error => {
                setLoading(false)
            })
    }

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }


    // Check validation of the form entries
   const checkValidity = (value, rules) => {
       let isValid = true;

       if (!rules) {
        return true;
    }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            isValid = pattern.test(value) && isValid;
        }
   
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
   

        return isValid;
    }

    // Get Data from Inputs
    const inputChangedHandler = (event, inputIdentifier) => {
        event.preventDefault();
        const updatedOrderForm = {
            ...orderForm
        }
        // Create a DEEP clone for nested objects
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        // Check if Form is valid
        let checkFormIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            checkFormIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm)
        setFormIsValid(checkFormIsValid)
    }



    let form = (
        <form onSubmit={orderHandler}>
        {formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                // Validation is not set for Dropdown-select
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id)}
            />

        ))}
    
        <Button 
            btnType="Success"
            disabled={!formIsValid}>
            ORDER
        </Button>
    </form>
    );

    if (loading === true) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
}

export default contactData;