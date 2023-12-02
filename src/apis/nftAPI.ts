import axios from "axios";

const nftAPI = {
  create: (txHash: string) => {
    return axios.post("/nfts", { txHash });
  },
  getAllByAddress: (address: string) => {
    return axios.get("/nfts/" + address);
  },
};

export default nftAPI;
