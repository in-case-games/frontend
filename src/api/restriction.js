import api from "./api";
import Constants from "../constants";

class Restriction {
  async getTypes() {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + "user/restriction/types"
    );

    return response.data.data;
  }

  async post(restriction) {
    const response = await api.post(
      Constants.GATE_AWAY_API_URL + "user/restriction",
      restriction
    );

    return response.data.data;
  }

  async put(restriction) {
    const response = await api.put(
      Constants.GATE_AWAY_API_URL + "user/restriction",
      restriction
    );

    return response.data.data;
  }

  async delete(id) {
    const response = await api.delete(
      Constants.GATE_AWAY_API_URL + `user/restriction/${id}`
    );

    return response.data.data;
  }
}

export default Restriction;
