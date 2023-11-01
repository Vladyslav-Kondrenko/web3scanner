# web3scanner

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## API Reference

#### Preparing before usage

Generate API key on [covalenthq.com](https://www.covalenthq.com/).

Replace API key in file axios.js

```js

import axios from 'axios';

const apiKey = "INPUT YOUR API KEY HERE";
    
const instance = axios.create({
  baseURL: 'https://api.covalenthq.com/v1/eth-mainnet', // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export default instance;

```

API docs [here](https://www.covalenthq.com/docs/unified-api/catalog/)