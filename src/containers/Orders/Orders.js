import React, { useState, useEffect } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../error/withErrorHandler';

const orders = () => {

    const initial = [];
    
    const [orders, setOrders] = useState(initial);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = []
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            setOrders(fetchedOrders);
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
        })
    }, [])

        return (
            <div>
                {orders.map(order => (
                    <Order key={order.id} 
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))}
                
            </div>
        )
}

export default withErrorHandler(orders, axios);