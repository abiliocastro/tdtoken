// import react from 'react';
import axios from 'axios';


const host = import.meta.env.PROD ? 'https://calangobank.onrender.com' :  'http://localhost:3000'

export default axios.create({
    baseURL: host
});