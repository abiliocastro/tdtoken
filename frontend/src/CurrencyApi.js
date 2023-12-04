// import react from 'react';
import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.coinbase.com/v2/exchange-rates?currency=DOGE'
});