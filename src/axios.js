// axios.js

import axios from 'axios';

const apiKey = "cqt_rQq96Gct9HMJdTGJwx894JQ88cWP";
    
const instance = axios.create({
  baseURL: 'https://api.covalenthq.com/v1/eth-mainnet', // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export default instance;