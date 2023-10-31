export const getBlock = async (axios, blockID, params = {}) => {
    const response = await axios.get(`/block/${blockID}/transactions_v3/`, {params});
    return response.data.data;
  };