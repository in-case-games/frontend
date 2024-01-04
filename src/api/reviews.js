import { TemplateLoadImage } from "../assets/images/main";
import Constants from "../constants";
import api from "./api";

class Reviews {
  async getAll() {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + "user/review/all"
    );

    return response.data.data;
  }

  async get() {
    const response = await api.get(Constants.GATE_AWAY_API_URL + "user/review");

    return response.data.data;
  }

  async getById(id) {
    try {
      const response = await api.get(
        Constants.GATE_AWAY_API_URL + `user/review/id/${id}`
      );

      return response.data.data;
    } catch (ex) {
      return undefined;
    }
  }

  async getImageReview(reviewId, imageId) {
    try {
      try {
        await api.get(
          Constants.FILE_SERVER_URL +
            `reviews/${reviewId}/${imageId}/${imageId}.jpg`
        );
        return (
          Constants.FILE_SERVER_URL +
          `reviews/${reviewId}/${imageId}/${imageId}.jpg`
        );
      } catch (err) {
        await api.get(
          Constants.FILE_SERVER_URL +
            `reviews/${reviewId}/${imageId}/${imageId}.jpeg`
        );
        return (
          Constants.FILE_SERVER_URL +
          `reviews/${reviewId}/${imageId}/${imageId}.jpeg`
        );
      }
    } catch (err) {
      return TemplateLoadImage;
    }
  }

  async getByIdAdmin(id) {
    try {
      const response = await api.get(
        Constants.GATE_AWAY_API_URL + `admin/review/id/${id}`
      );

      return response.data.data;
    } catch (ex) {
      return undefined;
    }
  }

  async getAllByAdmin() {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + "admin/review"
    );

    return response.data.data;
  }

  async post(data) {
    const response = await api.post(
      Constants.GATE_AWAY_API_URL + "user/review",
      data
    );

    return response.data.data;
  }

  async postImage(data) {
    const response = await api.post(
      Constants.GATE_AWAY_API_URL + "user/review/image",
      data
    );

    return response.data.data;
  }

  async put(data) {
    const response = await api.put(
      Constants.GATE_AWAY_API_URL + "user/review",
      data
    );

    return response.data.data;
  }

  async delete(id) {
    const response = await api.delete(
      Constants.GATE_AWAY_API_URL + `user/review/${id}`
    );

    return response.data.data;
  }

  async deleteImage(id) {
    const response = await api.delete(
      Constants.GATE_AWAY_API_URL + `user/review/image/${id}`
    );

    return response.data.data;
  }

  async deleteImageByAdmin(id) {
    const response = await api.delete(
      Constants.GATE_AWAY_API_URL + `admin/review/image/id/${id}`
    );

    return response.data.data;
  }

  async approve(id) {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + `user/review/${id}/approve`
    );

    return response.data.data;
  }

  async denied(id) {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + `user/review/${id}/denied`
    );

    return response.data.data;
  }
}

export default Reviews;
