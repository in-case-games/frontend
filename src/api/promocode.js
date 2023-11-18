import api from "./api";

const RESOURCES_API_URL = "https://localhost:5000/api/";

class Promocode {
  async get() {
    const response = await api.get(RESOURCES_API_URL + `promocode`);

    return response.data.data;
  }
  async post(promo) {
    const response = await api.post(RESOURCES_API_URL + `promocode`, promo);

    return response.data.data;
  }
  async put(promo) {
    const response = await api.put(RESOURCES_API_URL + `promocode`, promo);

    return response.data.data;
  }
  async delete(id) {
    const response = await api.delete(RESOURCES_API_URL + `promocode/${id}`);

    return response.data.data;
  }
  async getByName(name) {
    const response = await api.get(
      RESOURCES_API_URL + `promocode/name/${name}`
    );

    return response.data.data;
  }
  async getTypes() {
    const response = await api.get(RESOURCES_API_URL + `promocode/types`);

    return response.data.data;
  }
}

export default Promocode;
