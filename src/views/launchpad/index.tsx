"use client";

import collectionAPI from "@/apis/collectionAPI";
import ModalWrap from "@/components/Modal";
import NftCardUpload from "@/components/NftCards/NftCardUpload";
import { uploadMultiFile, uploadSingleFile } from "@/global/ipfs";
import Image from "next/image";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import ModalCreate from "./ModalCreate";
import { getBase64 } from "@/global/global";

interface CollectionProps {
  image: string;
  name: string;
  symbol: string;
  mintFee: number;
  userLimit: number;
  description: string;
}

interface ProcessingProps {
  uploadProcessing: boolean;
  createProcessing: boolean;
}

const initCollection: CollectionProps = {
  image: "",
  name: "",
  symbol: "",
  mintFee: 0,
  userLimit: 99999,
  description: "",
};

const initProcess: ProcessingProps = {
  uploadProcessing: false,
  createProcessing: false,
};

function LaunchpadPage() {
  const fileAvatarRef = useRef<any>(null);
  const fileNftsRef = useRef<any>(null);
  const [process, setProcess] = useState<any>(initProcess);
  const [collection, setCollection] = useState<CollectionProps>(initCollection);
  const [avatar, setAvatar] = useState<any>("");
  const [fileUpload, setFileUpload] = useState<any>([]);
  const [nfts, setNfts] = useState<any>([]);
  const [filesUpload, setFilesUpload] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address } = useSelector((state: any) => state.wallet);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const uploadAvatarCollection = async (files: any) => {
    const base64 = await getBase64(files[0]);
    setFileUpload(files[0]);
    setAvatar(base64);
  };

  const handleUploadNfts = () => {
    if (collection.symbol === "") {
      toast.error("Please enter token symbol");
      return;
    }
    fileNftsRef.current.click();
  };

  const resetData = () => {
    setAvatar("");
    setNfts([]);
    setFileUpload([]);
    setFilesUpload([]);
    setCollection(initCollection);
  };

  const uploadNfts = async (files: any) => {
    setIsLoading(true);
    let nfts = [];
    for (const file of files) {
      const base64 = await getBase64(file);
      nfts.push({ id: uuidv4(), image: base64 });
    }
    setFilesUpload(files);
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

  const createLaunchpad = async () => {
    try {
      setIsOpenModal(true);
      let image: any = {};
      const { metadataHash } = await uploadMultiFile(
        filesUpload,
        collection.name,
        collection.symbol,
        collection.description,
      );
      if (fileUpload?.length > 0) {
        image = await uploadSingleFile(fileUpload, collection.symbol);
      }
      setProcess((cur: ProcessingProps) => ({
        ...cur,
        uploadProcessing: true,
      }));
      await collectionAPI.create({
        ...collection,
        image: image?.imageHash || "",
        limit: filesUpload.length,
        metadata: metadataHash,
      });
      setProcess((cur: ProcessingProps) => ({
        ...cur,
        createProcessing: true,
      }));
      resetData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
            <input
              type="text"
              placeholder="Enter collection name"
              value={collection?.name}
              onChange={(e) =>
                setCollection((cur: CollectionProps) => ({ ...cur, name: e.target.value }))
              }
            />
          </div>
          <div className="launchpad__form--item">
            <label>Symbol</label>
            <input
              type="text"
              placeholder="Enter token symbol"
              value={collection?.symbol}
              onChange={(e) =>
                setCollection((cur: CollectionProps) => ({ ...cur, symbol: e.target.value }))
              }
            />
          </div>
          <div className="launchpad__form--item">
            <label>Mint Fee</label>
            <input
              type="number"
              placeholder="Enter mint fee"
              value={collection?.mintFee}
              onChange={(e) =>
                setCollection((cur: CollectionProps) => ({ ...cur, mintFee: +e.target.value }))
              }
            />
          </div>
          <div className="launchpad__form--item">
            <label>User Limit</label>
            <input
              type="number"
              placeholder="Enter user limit"
              value={collection?.userLimit}
              onChange={(e) =>
                setCollection((cur: CollectionProps) => ({ ...cur, userLimit: +e.target.value }))
              }
            />
          </div>
          <div className="launchpad__form--item">
            <label>Description</label>
            <textarea
              value={collection?.description}
              onChange={(e) =>
                setCollection((cur: CollectionProps) => ({ ...cur, description: e.target.value }))
              }
            />
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
            <button className="btn" onClick={() => createLaunchpad()}>
              Create
            </button>
          </div>
        )}
      </div>
      <ModalWrap open={isOpenModal}>
        <ModalCreate
          name={collection?.name}
          symbol={collection?.symbol}
          processing={process}
          onClose={setIsOpenModal}
        />
      </ModalWrap>
    </>
  );
}

export default LaunchpadPage;
