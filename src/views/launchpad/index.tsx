"use client";

import React from "react";
import NftCardUpload from "@/components/NftCards/NftCardUpload";
import Image from "next/image";
import { useRef, useState } from "react";
import { uuid } from "uuidv4";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

interface CollectionProps {
  image: string;
  name: string;
  symbol: string;
  description: string;
}

const initCollection = {
  image: "",
  name: "",
  symbol: "",
  description: "",
};

function LaunchpadPage() {
  const fileAvatarRef = useRef<any>(null);
  const fileNftsRef = useRef<any>(null);
  const [collection, setCollection] = useState<CollectionProps>(initCollection);
  const [avatar, setAvatar] = useState<any>("");
  const [nfts, setNfts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address } = useSelector((state: any) => state.wallet);

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString());
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadAvatarCollection = async (files: any) => {
    const base64 = await getBase64(files[0]);
    setAvatar(base64);
  };

  const handleUploadNfts = () => {
    if (collection.symbol === "") {
      toast.error("Please enter token symbol");
      return;
    }
    fileNftsRef.current.click();
  };

  const uploadNfts = async (files: any) => {
    setIsLoading(true);
    let nfts = [];
    for (const file of files) {
      const base64 = await getBase64(file);
      nfts.push({ id: uuid(), image: base64 });
    }
    setNfts(nfts);
    setIsLoading(false);
  };

  const handleRemove = (id: string) => {
    const newNfts = nfts.filter((item: any) => item.id !== id);
    setNfts(newNfts);
  };

  if (!address) {
    return <p>Please Connect Wallet</p>;
  }

  return (
    <div className="launchpad__wrap">
      <div className="launchpad__form">
        <div className="launchpad__form--item collection__upload">
          <Image src={avatar || "/images/bg-gradient.jpg"} alt="" width={100} height={100} />
          <div className="upload__image" onClick={() => fileAvatarRef.current.click()}>
            <p>Upload Avatar Collection</p>
          </div>
          <input
            ref={fileAvatarRef}
            type="file"
            onChange={(e) => uploadAvatarCollection(e.target.files)}
          />
        </div>
        <div className="launchpad__form--item">
          <label>Display Name</label>
          <input type="text" placeholder="Enter collection name" />
        </div>
        <div className="launchpad__form--item">
          <label>Symbol</label>
          <input
            type="text"
            placeholder="Enter token symbol"
            onChange={(e) =>
              setCollection((cur: CollectionProps) => ({ ...cur, symbol: e.target.value }))
            }
          />
        </div>
        <div className="launchpad__form--item">
          <label>Description</label>
          <textarea />
        </div>
        <div className="launchpad__form--item upload__nft">
          <button className="btn" onClick={() => handleUploadNfts()}>
            Upload Nfts
          </button>
          <input
            ref={fileNftsRef}
            type="file"
            onChange={(e) => uploadNfts(e.target.files)}
            multiple
          />
        </div>
      </div>
      <div className="nfts__upload">
        <div className="nfts__grid">
          {nfts.map((item: any, idx: number) => (
            <NftCardUpload
              key={idx}
              uuid={item.id}
              image={item.image}
              name={`${collection.symbol} #${idx + 1}`}
              remove={handleRemove}
            />
          ))}
        </div>
      </div>
      {!isLoading && nfts.length > 0 && (
        <div className="launchpad__action">
          <button className="btn">Create</button>
        </div>
      )}
    </div>
  );
}

export default LaunchpadPage;
