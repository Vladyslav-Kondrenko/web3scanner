export const getTransactions = async (axios, address, params = {}) => {
    const response = await axios.get(`/address/${address}/transactions_v3/`, {params});
    return response.data.data;
    
  };