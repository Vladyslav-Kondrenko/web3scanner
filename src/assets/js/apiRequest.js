export const makeApiRequest = async (axios, baseURL, params = {}) => {
    try {
      const response = await axios.get(baseURL, {params});
      return response.data.data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error to be caught by the caller
    }
  };