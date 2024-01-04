import axios from "axios";

const API_BASE_URL = "/";

const LivestatsService = {
  getLivestats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}livestats`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default LivestatsService;
