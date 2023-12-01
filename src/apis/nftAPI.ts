import axios from "axios";

const nftAPI = {
  create: (txHash: string) => {
    return axios.post("/nfts", { txHash });
  },
};

export default nftAPI;
