export const getBalances = async (axios, address, params = {}) => {
    const response = await axios.get(`/address/${address}/balances_v2/`, {params});
    return response.data.data;
  };