import Constants from "../constants";
import api from "./api";

class BoxGroup {
  async get() {
    const response = await api.get(Constants.GATE_AWAY_API_URL + "group-box");

    return response.data.data;
  }
  async getByGroupId(id) {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + `box/group/${id}`
    );

    return response.data.data;
  }
  async post(request) {
    const response = await api.post(
      Constants.GATE_AWAY_API_URL + "group-box",
      request
    );

    return response.data.data;
  }
  async postItem(request) {
    const response = await api.post(
      Constants.GATE_AWAY_API_URL + "box/group",
      request
    );

    return response.data.data;
  }
  async put(request) {
    const response = await api.put(
      Constants.GATE_AWAY_API_URL + "group-box",
      request
    );

    return response.data.data;
  }
  async putItem(request) {
    const response = await api.put(
      Constants.GATE_AWAY_API_URL + "box/group",
      request
    );

    return response.data.data;
  }
  async delete(id) {
    const response = await api.delete(
      Constants.GATE_AWAY_API_URL + `group-box/${id}`
    );

    return response.data.data;
  }
  async deleteItem(id) {
    const response = await api.delete(
      Constants.GATE_AWAY_API_URL + `box/group/${id}`
    );

    return response.data.data;
  }
}

export default BoxGroup;
