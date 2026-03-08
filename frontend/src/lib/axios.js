import axios from 'axios';

const api=axios.create({
    baseURL:'https://bank-account-management-2.onrender.com'
})

export default api;
