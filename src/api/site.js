import api from "./api";

const RESOURCES_API_URL = "https://localhost:5000/api/";

class Site {
  async getStatistics() {
    const response = await api.get(RESOURCES_API_URL + "site/statistics");
    return response.data.data;
  }
  async getAdminStatistics() {
    const response = await api.get(RESOURCES_API_URL + "admin/site/statistics");
    return response.data.data;
  }
}

export default Site;
