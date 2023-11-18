import api from "./api";

const RESOURCES_API_URL = "https://localhost:5000/api/";

class Restriction {
  async getTypes() {
    const response = await api.get(
      RESOURCES_API_URL + "user/restriction/types"
    );

    return response.data.data;
  }

  async post(restriction) {
    const response = await api.post(
      RESOURCES_API_URL + "user/restriction",
      restriction
    );

    return response.data.data;
  }

  async put(restriction) {
    const response = await api.put(
      RESOURCES_API_URL + "user/restriction",
      restriction
    );

    return response.data.data;
  }

  async delete(id) {
    const response = await api.delete(
      RESOURCES_API_URL + `user/restriction/${id}`
    );

    return response.data.data;
  }
}

export default Restriction;
