import {
  TemplateBox as TemplateImage,
  TemplateBanner as TemplateBannerImage,
} from "../assets/images/main";
import Constants from "../constants";
import api from "./api";

class Box {
  async getByGameId(id) {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + `game/${id}/box`
    );

    return response.data.data;
  }

  async getInventory(id) {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + `box/${id}/inventory`
    );

    return response.data.data;
  }

  async getById(id) {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + "box/id/" + id
    );

    return response.data.data;
  }

  async getByIdBanner(id) {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + `box/${id}/banner`
    );

    return response.data.data;
  }

  async getByName(name) {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + "box/name/" + name
    );

    return response.data.data;
  }

  async getGroupsByGameId(id) {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + `box/group/game/${id}`
    );

    return response.data.data;
  }

  async getBannerById(id) {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + `box/banner/id/${id}`
    );

    return response.data.data;
  }

  async getBanners() {
    const response = await api.get(Constants.GATE_AWAY_API_URL + `box/banner`);

    return response.data.data;
  }

  async getBannersByIsActive(isActive) {
    const response = await api.get(
      Constants.GATE_AWAY_API_URL + `box/banner/active/${isActive}`
    );

    return response.data.data;
  }

  async post(box) {
    const response = await api.post(Constants.GATE_AWAY_API_URL + "box", box);

    return response.data.data;
  }

  async postInventory(data) {
    const response = await api.post(
      Constants.GATE_AWAY_API_URL + `box/inventory`,
      data
    );

    return response.data.data;
  }

  async putInventory(data) {
    const response = await api.put(
      Constants.GATE_AWAY_API_URL + `box/inventory`,
      data
    );

    return response.data.data;
  }

  async deleteInventory(id) {
    const response = await api.delete(
      Constants.GATE_AWAY_API_URL + `box/inventory/${id}`
    );

    return response.data.data;
  }

  async postBanner(banner) {
    const response = await api.post(
      Constants.GATE_AWAY_API_URL + "box/banner",
      banner
    );

    return response.data.data;
  }

  async put(box) {
    const response = await api.put(Constants.GATE_AWAY_API_URL + "box", box);

    return response.data.data;
  }

  async putBanner(banner) {
    const response = await api.put(
      Constants.GATE_AWAY_API_URL + "box/banner",
      banner
    );

    return response.data.data;
  }

  async delete(id) {
    const response = await api.delete(
      Constants.GATE_AWAY_API_URL + `box/id/${id}`
    );

    return response.data.data;
  }

  async deleteBanner(id) {
    const response = await api.delete(
      Constants.GATE_AWAY_API_URL + `box/banner/${id}`
    );

    return response.data.data;
  }

  async pushImage(box) {
    try {
      await api.get(
        Constants.FILE_SERVER_URL + `loot-boxes/${box.id}/${box.id}.png`
      );
      box.image =
        Constants.FILE_SERVER_URL + `/loot-boxes/${box.id}/${box.id}.png`;
    } catch (err) {
      box.image = TemplateImage;
    }

    return box;
  }

  async bannerPushImage(banner) {
    try {
      await api.get(
        Constants.FILE_SERVER_URL +
          `loot-box-banners/${banner.box.id}/${banner.id}.png`
      );
      banner.image =
        Constants.FILE_SERVER_URL +
        `loot-box-banners/${banner.box.id}/${banner.id}.png`;
    } catch (err) {
      try {
        try {
          await api.get(
            Constants.FILE_SERVER_URL +
              `loot-box-banners/${banner.box.id}/${banner.id}.jpg`
          );
          banner.image =
            Constants.FILE_SERVER_URL +
            `loot-box-banners/${banner.box.id}/${banner.id}.jpg`;
        } catch (err) {
          await api.get(
            Constants.FILE_SERVER_URL +
              `loot-box-banners/${banner.box.id}/${banner.id}.jpeg`
          );
          banner.image =
            Constants.FILE_SERVER_URL +
            `loot-box-banners/${banner.box.id}/${banner.id}.jpeg`;
        }
      } catch (err) {
        banner.image = TemplateBannerImage;
      }
    }

    return banner;
  }
}

export default Box;
