import React from "react";
import { HealthyIcon } from "../../../public/svgs";
import Image from "next/image";
import { BsCartPlus } from "react-icons/bs";

interface NftsCardProps {
  image: any;
  name?: string;
  price?: string;
}

function NftCard({ image, name, price }: NftsCardProps) {
  return (
    <div className="card__wrap">
      <div className="card__image">
        <div className="card__action">
          <button className="btn">Buy Now</button>
          <button className="btn">
            <BsCartPlus size={20} color="#000000" />
          </button>
        </div>
        <Image src={image} alt="" width={200} height={200} />
      </div>
      <p className="card__name">{name || ""}</p>
      <div className="card__price">
        <p>{price && `${price} ETH`}</p>
        <div></div>
      </div>
    </div>
  );
}

export default NftCard;
