import collectionAPI from "@/apis/collectionAPI";
import { getBase64, getEllipsisTxt } from "@/global/global";
import { uploadSingleFile } from "@/global/ipfs";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

const TypeUpload = {
  COVER: "COVER",
  IMAGE: "IMAGE",
};

function CollectionInfo(props: any) {
  const { collection } = props;
  const { user } = useSelector((state: any) => state.wallet);
  const [coverFile, setCoverFile] = useState<any>("");
  const [imageFile, setImageFile] = useState<any>("");
  const coverRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const handleChangeFile = async (file: any, type: string) => {
    const image = await getBase64(file[0]);
    const { imageHash } = await uploadSingleFile(file[0], collection?.symbol);
    if (TypeUpload.IMAGE === type) {
      setImageFile(image);
      updateCollection(collection?._id, { image: imageHash });
    } else {
      setCoverFile(image);
      updateCollection(collection?._id, { cover: imageHash });
    }
  };

  const updateCollection = async (id: string, payload: any) => {
    try {
      await collectionAPI.update(id, payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="collection-info__wrap">
      <div className="collection__thumbnail">
        <div className="collection--cover">
          {(coverFile || collection?.cover) && (
            <Image src={coverFile || collection?.cover} alt="" width={1000} height={400} />
          )}
          {user._id === collection.creator && (
            <>
              <input
                ref={coverRef}
                type="file"
                alt=""
                onChange={(e) => handleChangeFile(e.target.files, TypeUpload.COVER)}
                style={{ display: "none" }}
              />
              <button className="btn" onClick={() => coverRef.current.click()}>
                Edit
              </button>
            </>
          )}
        </div>
        <div
          className="collection--image"
          onClick={() => {
            if (user._id !== collection.creator) return;
            imageRef.current.click();
          }}
        >
          {(imageFile || collection?.image) && (
            <Image src={imageFile || collection?.image} alt="" width={100} height={100} />
          )}
          {user._id === collection.creator && (
            <input
              ref={imageRef}
              type="file"
              alt=""
              onChange={(e) => handleChangeFile(e.target.files, TypeUpload.IMAGE)}
              style={{ display: "none" }}
            />
          )}
        </div>
      </div>
      <div className="collection__title">
        <h1>{collection?.name}</h1>
        <p>{getEllipsisTxt(collection?.contractAddress)}</p>
      </div>
      {collection.launchpad && (
        <div className="collection__mint">
          <Link href={`/mint/${collection?._id}`}>
            <button className="btn">Mint Nfts</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CollectionInfo;
