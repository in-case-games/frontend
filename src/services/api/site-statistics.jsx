import api from "./api";

const RESOURCES_API_URL = "https://localhost:7102/api";

class SiteStatistics {
    async get() {
        const response = await api.get(RESOURCES_API_URL + "/site-statistics");

        return response.data.data;
    }
}

export default SiteStatistics;