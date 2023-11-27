import { bake_cookie } from "sfcookies";
import { TemplateUser } from "../assets/images/main";
import TokenService from "../services/token";
import api from "./api";

const RESOURCES_API_URL = "https://localhost:5000/api/";

class User {
  async getById(id) {
    const response = await api.get(RESOURCES_API_URL + `user/id/${id}`);

    return response.data.data;
  }
  async get() {
    const response = await api.get(RESOURCES_API_URL + "user");

    return response.data.data;
  }
  async getByLogin(login) {
    const response = await api.get(RESOURCES_API_URL + `user/login/${login}`);

    return response.data.data;
  }
  async getInventoryById(id) {
    const response = await api.get(
      RESOURCES_API_URL + `user/inventory/id/${id}`
    );

    return response.data.data;
  }
  async getInventory() {
    const response = await api.get(RESOURCES_API_URL + "user/inventory");

    return response.data.data;
  }
  async getInventoryByUserId(id) {
    const response = await api.get(RESOURCES_API_URL + `user/${id}/inventory`);

    return response.data.data;
  }
  async getBalance() {
    const response = await api.get(RESOURCES_API_URL + "user/balance");
    const balance = response.data.data.balance;

    bake_cookie("user-balance", balance);

    return balance;
  }
  async getRoles() {
    const response = await api.get(RESOURCES_API_URL + `user/role`);

    return response.data.data;
  }
  async getPromocodes() {
    const response = await api.get(RESOURCES_API_URL + `user/promocode`);

    return response.data.data;
  }
  async getReviewLast(count) {
    const response = await api.get(
      RESOURCES_API_URL + "user/review/last/" + count
    );

    return response.data.data;
  }

  async getRouletteOpenings() {
    const response = await api.get(
      RESOURCES_API_URL + "user/history/opening/roulette"
    );

    return response.data.data;
  }
  async getRouletteOpeningsByBoxId(id) {
    const response = await api.get(
      RESOURCES_API_URL + `user/history/opening/roulette/box/${id}`
    );

    return response.data.data;
  }
  async getOpeningsByUserId(id) {
    const response = await api.get(
      RESOURCES_API_URL + `user/${id}/history/opening`
    );

    return response.data.data;
  }
  async getOpenings() {
    const response = await api.get(RESOURCES_API_URL + "user/history/opening");

    return response.data.data;
  }
  async getPayments() {
    const response = await api.get(RESOURCES_API_URL + "user/history/payment");

    return response.data.data;
  }
  async getWithdrawn100Last() {
    const response = await api.get(
      RESOURCES_API_URL + "user/history/withdraw/100/last"
    );

    return response.data.data;
  }
  async transferWithdrawn(id) {
    const response = await api.get(
      RESOURCES_API_URL + `user/history/withdraw/${id}/transfer`
    );

    return response.data.data;
  }

  async openBox(id) {
    const response = await api.get(
      RESOURCES_API_URL + `user/opening/box/${id}`
    );

    return response.data.data;
  }

  async getRestrictions() {
    const response = await api.get(RESOURCES_API_URL + `user/restriction`);

    return response.data.data;
  }

  async getRestrictionsByUserId(id) {
    const response = await api.get(
      RESOURCES_API_URL + `user/${id}/restriction`
    );

    return response.data.data;
  }

  async getRestrictionsByOwner() {
    const response = await api.get(
      RESOURCES_API_URL + `user/restriction/owner`
    );

    return response.data.data;
  }

  async getPathBannerByBoxId(id) {
    const response = await api.get(
      RESOURCES_API_URL + `user/path/banner/box/${id}`
    );

    return response.data.data;
  }

  async getRestrictionsByOwnerId(id) {
    const response = await api.get(
      RESOURCES_API_URL + `user/restriction/owner/${id}`
    );

    return response.data.data;
  }

  async getBalanceByUserId(id) {
    const response = await api.get(RESOURCES_API_URL + `user/${id}/balance`);

    return response.data.data.balance;
  }

  async getImage() {
    const user = TokenService.getUser();
    try {
      await api.get(`http://localhost:8080/users/${user.id}/${user.id}.png`);
      return `http://localhost:8080/users/${user.id}/${user.id}.png`;
    } catch (err) {
      return TemplateUser;
    }
  }

  async getImageByUserId(id) {
    try {
      await api.get(`http://localhost:8080/users/${id}/${id}.png`);
      return `http://localhost:8080/users/${id}/${id}.png`;
    } catch (err) {
      return TemplateUser;
    }
  }

  async updateImage(image) {
    const body = {
      image: image,
    };
    const response = await api.put(RESOURCES_API_URL + `user/info/image`, body);

    return response.data.data;
  }

  async updateImageByAdmin(userId, image) {
    const body = {
      userId: userId,
      image: image,
    };
    const response = await api.put(
      RESOURCES_API_URL + `admin/info/image`,
      body
    );

    return response.data.data;
  }

  async updateEmailByAdmin(userId, email) {
    const response = await api.get(
      RESOURCES_API_URL + `authentication/confirm/${userId}/email/${email}`
    );

    return response.data.data;
  }

  async updateLoginByAdmin(userId, login) {
    const response = await api.get(
      RESOURCES_API_URL + `authentication/confirm/${userId}/login/${login}`
    );

    return response.data.data;
  }

  async updateRoleByAdmin(userId, roleId) {
    const response = await api.get(
      RESOURCES_API_URL + `user/${userId}/info/role/${roleId}`
    );

    return response.data.data;
  }

  async updateBalanceByAdmin(userId, balance) {
    const response = await api.get(
      RESOURCES_API_URL + `user/${userId}/balance/${balance}/owner`
    );

    return response.data.data;
  }

  async deleteUserInventoryByAdmin(id) {
    const response = await api.delete(
      RESOURCES_API_URL + `user/inventory/${id}`
    );

    return response.data.data;
  }

  async activatePromocode(name) {
    const response = await api.get(
      RESOURCES_API_URL + `user/promocode/activate/${name}`
    );

    return response.data.data;
  }

  async postPathBanner(data) {
    const response = await api.post(
      RESOURCES_API_URL + `user/path/banner`,
      data
    );

    return response.data.data;
  }

  async putPathBanner(data) {
    const response = await api.put(
      RESOURCES_API_URL + `user/path/banner`,
      data
    );

    return response.data.data;
  }

  async deletePathBannerById(id) {
    const response = await api.delete(
      RESOURCES_API_URL + `user/path/banner/${id}`
    );

    return response.data.data;
  }

  async exchangePromocode(name) {
    const response = await api.get(
      RESOURCES_API_URL + `user/promocode/exchange/${name}`
    );

    return response.data.data;
  }
}

export default User;
