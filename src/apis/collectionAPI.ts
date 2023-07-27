import axios from "axios";

const collectionAPI = {
  create: (payload: any) => {
    return axios.post("/collections", payload);
  },
  getAll: () => {
    return axios.get("/collections");
  },
  getCollectionById: (id: string) => {
    return axios.get("/collections/" + id);
  },
  updateContractAddress: (id: string, contractAddress: string) => {
    return axios.patch("/collections/contract-address/" + id, { contractAddress });
  },
  update: (id: string, payload: any) => {
    return axios.patch("/collections/" + id, payload);
  },
};

export default collectionAPI;
