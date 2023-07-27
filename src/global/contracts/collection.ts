import { ethers } from "ethers";

export const getContract = (
  contractAddress: string,
  ABI: ethers.Interface | ethers.InterfaceAbi,
  signer: ethers.JsonRpcSigner | ethers.BrowserProvider,
) => {
  return new ethers.Contract(contractAddress, ABI, signer);
};
