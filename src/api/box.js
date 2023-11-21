import {
  TemplateBox as TemplateImage,
  TemplateBanner as TemplateBannerImage,
} from "../assets/images/main";
import api from "./api";

const RESOURCES_API_URL = "https://localhost:5000/api/";

class Box {
  async getByGameId(id) {
    const response = await api.get(RESOURCES_API_URL + `game/${id}/box`);

    return response.data.data;
  }

  async getInventory(id) {
    const response = await api.get(RESOURCES_API_URL + `box/${id}/inventory`);

    return response.data.data;
  }

  async getById(id) {
    const response = await api.get(RESOURCES_API_URL + "box/id/" + id);

    return response.data.data;
  }

  async getByIdBanner(id) {
    const response = await api.get(RESOURCES_API_URL + `box/${id}/banner`);

    return response.data.data;
  }

  async getByName(name) {
    const response = await api.get(RESOURCES_API_URL + "box/name/" + name);

    return response.data.data;
  }

  async getGroupsByGameId(id) {
    const response = await api.get(RESOURCES_API_URL + `box/group/game/${id}`);

    return response.data.data;
  }

  async getBannerById(id) {
    const response = await api.get(RESOURCES_API_URL + `box/banner/id/${id}`);

    return response.data.data;
  }

  async getBanners() {
    const response = await api.get(RESOURCES_API_URL + `box/banner`);

    return response.data.data;
  }

  async getBannersByIsActive(isActive) {
    const response = await api.get(
      RESOURCES_API_URL + `box/banner/active/${isActive}`
    );

    return response.data.data;
  }

  async post(box) {
    const response = await api.post(RESOURCES_API_URL + "box", box);

    return response.data.data;
  }

  async postBanner(banner) {
    const response = await api.post(RESOURCES_API_URL + "box/banner", banner);

    return response.data.data;
  }

  async put(box) {
    const response = await api.put(RESOURCES_API_URL + "box", box);

    return response.data.data;
  }

  async putBanner(banner) {
    const response = await api.put(RESOURCES_API_URL + "box/banner", banner);

    return response.data.data;
  }

  async delete(id) {
    const response = await api.delete(RESOURCES_API_URL + `box/id/${id}`);

    return response.data.data;
  }

  async deleteBanner(id) {
    const response = await api.delete(RESOURCES_API_URL + `box/banner/${id}`);

    return response.data.data;
  }

  async pushImage(box) {
    try {
      await api.get(`http://localhost:8080/loot-boxes/${box.id}/${box.id}.png`);
      box.image = `http://localhost:8080/loot-boxes/${box.id}/${box.id}.png`;
    } catch (err) {
      box.image = TemplateImage;
    }

    return box;
  }

  async bannerPushImage(banner) {
    try {
      await api.get(
        `http://localhost:8080/loot-box-banners/${banner.box.id}/${banner.id}.png`
      );
      banner.image = `http://localhost:8080/loot-box-banners/${banner.box.id}/${banner.id}.png`;
    } catch (err) {
      banner.image = TemplateBannerImage;
    }

    return banner;
  }
}

export default Box;
