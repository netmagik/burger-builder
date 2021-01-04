import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-6a5b6-default-rtdb.firebaseio.com/'
})

export default instance;