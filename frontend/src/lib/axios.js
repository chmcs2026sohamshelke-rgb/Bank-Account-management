import axios from 'axios';

const api=axios.create({
    baseURL:'https://bank-account-management-1-rrdt.onrender.com'
})

export default api;
