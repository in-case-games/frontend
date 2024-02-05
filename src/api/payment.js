import Constants from "../constants";
import api from "./api";

class Payment {
  async createInvoice(amount) {
    var body = { amount: amount };
    const response = await api.post(
      Constants.GATE_AWAY_API_URL + `payments/invoice`,
      body
    );

    return response;
  }
}

export default Payment;
