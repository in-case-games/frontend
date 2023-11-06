import api from "./api";

const RESOURCES_API_URL = "https://localhost:5000/api/";

class Promocode {
  async getTypes() {
    const response = await api.get(RESOURCES_API_URL + `promocode/types`);

    return response.data.data;
  }
}

export default Promocode;
