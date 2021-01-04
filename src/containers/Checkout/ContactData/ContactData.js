import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


const contactData = (props) => {

    // const initial = {
    //     name: '',
    //     email: '',
    //     address: {
    //         street: '',
    //         postalCode: ''
    //     }
    // }

    // const [data, setData] = useState(initial);
    const [loading, setLoading] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        
        setLoading(true)
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            customer:  {
                name: 'Irina Blumenfeld',
                address: {
                    street: 'Test Street',
                    zipCode: '32751',
                    country: 'US'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
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

    let form = (
        <form className={classes.Form}>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button 
            btnType="Success"
            clicked={orderHandler}>
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