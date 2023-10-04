export const makeApiRequest = async (axios, baseURL) => {
    try {
      const response = await axios.get(baseURL);
      return response.data.data.items;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error to be caught by the caller
    }
  };