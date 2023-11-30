import api from "./api";

const RESOURCES_API_URL = "https://localhost:5000/api/";

class Reviews {
  async getAll() {
    const response = await api.get(RESOURCES_API_URL + "user/review/all");

    return response.data.data;
  }

  async get() {
    const response = await api.get(RESOURCES_API_URL + "user/review");

    return response.data.data;
  }
}

export default Reviews;
