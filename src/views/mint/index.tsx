"use client";

import collectionAPI from "@/apis/collectionAPI";
import { getContract } from "@/global/contracts/collection";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Launchpad from "../../contracts/ERC721Launchpad/ERC721Launchpad.json";
import { ethers } from "ethers";
import nftAPI from "@/apis/nftAPI";
import { toast } from "react-toastify";

function Mint() {
  const { user } = useSelector((state: any) => state.wallet);
  const [collection, setCollection] = useState<any>({});
  const { id } = useParams();
  const [mintCount, setMintCount] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    getCollection(id);
  }, [id]);

  const getCollection = async (id: string) => {
    try {
      const { data } = await collectionAPI.getCollectionById(id);
      setCollection(data);
    } catch (error) {
      console.log(error);
    }
  };

  const mint = async () => {
    try {
      if (!mintCount) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = getContract(collection.contractAddress, Launchpad.abi, signer);
      const tx = await contract.bulkMintTo(user.address, +mintCount, {
        value: ethers.parseEther(collection.mintFee.toString()),
      });
      await tx.wait();
      if (tx.hash) {
        await nftAPI.create(tx?.hash);
      }
      setMintCount("");
      toast.success("Mint nft success");
    } catch (error) {
      console.log(error);
    }
  };

  if (Object.keys(user).length <= 0) {
    return <p>Please connect wallet</p>;
  }

  return (
    <div className="mint__wrap">
      <img className="background" src="/images/mint/background.svg" />
      <img className="moon" src="/images/mint/moon.svg" />
      <img className="earth" src="/images/mint/earth.svg" />
      <img className="castle" src="/images/mint/castle.svg" />

      <div className="mint__content">
        <h1>{collection.name}</h1>
        <div className="mint__content--body">
          <Image
            src={collection?.image || "/images/bg-gradient.jpg"}
            alt=""
            width={200}
            height={200}
          />
          <div>
            <p>Mint Fee: {collection?.mintFee}</p>
            <p>Minted: {collection?.minted}</p>
            <p>Limit: {collection?.limit}</p>
            <p>User limit: {collection?.userLimit}</p>
            <input
              type="number"
              placeholder="Quantity mint"
              value={mintCount}
              onChange={(e) => setMintCount(e.target.value)}
            />
          </div>
        </div>
        <button className="btn" onClick={mint}>
          Mint
        </button>
      </div>
    </div>
  );
}

export default Mint;
