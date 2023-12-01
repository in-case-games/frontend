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

  async getAllByAdmin() {
    const response = await api.get(RESOURCES_API_URL + "admin/review");

    return response.data.data;
  }

  async post(data) {
    const response = await api.post(RESOURCES_API_URL + "user/review", data);

    return response.data.data;
  }

  async put(data) {
    const response = await api.put(RESOURCES_API_URL + "user/review", data);

    return response.data.data;
  }

  async delete(id) {
    const response = await api.delete(RESOURCES_API_URL + `user/review/${id}`);

    return response.data.data;
  }

  async approve(id) {
    const response = await api.get(
      RESOURCES_API_URL + `user/review/${id}/approve`
    );

    return response.data.data;
  }

  async denied(id) {
    const response = await api.get(
      RESOURCES_API_URL + `user/review/${id}/denied`
    );

    return response.data.data;
  }
}

export default Reviews;
