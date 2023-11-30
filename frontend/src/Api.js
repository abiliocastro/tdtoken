// import react from 'react';
import axios from 'axios';

export default axios.create({
    baseURL: `https://tdtoken-backend.onrender.com/`
});