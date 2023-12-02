"use client";

import collectionAPI from "@/apis/collectionAPI";
import Launchpad from "@/contracts/ERC721Launchpad/ERC721Launchpad.json";
import { ContractFactory, ethers } from "ethers";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CollectionInfo from "./CollectionInfo";
import { useSelector } from "react-redux";
import nftAPI from "@/apis/nftAPI";
import NftCard from "@/components/NftCards";
import { getUrl } from "@/global/ipfs";

function CollectionDetail() {
  const { user } = useSelector((state: any) => state.wallet);
  const [refresh, setRefresh] = useState(0);
  const [collection, setCollection] = useState<any>({});
  const [nfts, setNfts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getCollection(id);
  }, [id, refresh]);

  useEffect(() => {
    if (!id) return;
    getNfts(collection?.contractAddress);
  }, [collection, refresh]);

  const getCollection = async (id: string) => {
    try {
      const { data } = await collectionAPI.getCollectionById(id);
      setCollection(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNfts = async (address: string) => {
    try {
      if (!address) return;
      const { data } = await nftAPI.getAllByAddress(address);
      console.log(data);
      setNfts(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const deployCollection = async () => {
    const provider: any = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractFactory = new ContractFactory(Launchpad.abi, Launchpad.bytecode, signer);
    const contract = await contractFactory.deploy(
      collection.name,
      collection.symbol,
      collection.metadata,
      ethers.parseEther(collection.mintFee + ""),
      collection?.limit,
      collection?.userLimit,
      ethers.parseEther("0"),
      { value: ethers.parseEther("0") },
    );

    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();
    await collectionAPI.updateContractAddress(id, contractAddress);
    setRefresh((cur) => cur + 1);
  };

  return (
    <div className="collection-detail__wrap">
      <CollectionInfo collection={collection} />
      <div className="collection-detail__content">
        {user && !collection?.launchpad && (
          <button className="btn" onClick={deployCollection}>
            Deploy Collection
          </button>
        )}
      </div>
      <div className="nfts__grid">
        {nfts.map((item: any, idx: number) => (
          <NftCard key={idx} image={getUrl(item.image)} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
}

export default CollectionDetail;
