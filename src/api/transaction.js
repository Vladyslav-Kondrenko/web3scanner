export const getTransaction = async (axios, transactionHash, params = {}) => {
    const response = await axios.get(`/transaction_v2/${transactionHash}/`, {params});
    return response.data.data;
  };