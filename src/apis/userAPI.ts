import axios from "axios";

const userAPI = {
  getUser: () => {
    return axios.post("/auth/me");
  },
  getNonce: (data: any) => {
    return axios.post("/users/nonce", { address: data });
  },
  getUserByAddress: (address: string) => {
    return axios.get("/users/address/" + address);
  },
  getTokenByWalletConnect: (address: string, sign: string) => {
    return axios.post("/auth/wallet_login", {
      address,
      sign,
    });
  },
};

export default userAPI;
