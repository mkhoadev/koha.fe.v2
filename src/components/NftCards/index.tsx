import React from "react";
import { HealthyIcon } from "../../../public/svgs";
import Image from "next/image";
import { BsCartPlus } from "react-icons/bs";

interface NftsCardProps {
  image: string;
}

function NftCard({ image }: NftsCardProps) {
  return (
    <div className="card__wrap">
      <div className="card__image">
        <p className="card--like">
          99 <HealthyIcon />
        </p>
        <div className="card__action">
          <button className="btn">Buy Now</button>
          <button className="btn">
            <BsCartPlus size={20} color="#FFFFFF" />
          </button>
        </div>
        <Image src={image} alt="" width={200} height={200} />
      </div>
      <p className="card__name">Stretch Of Time</p>
      <div className="card__price">
        <p>0.45 ETH</p>
        <div></div>
      </div>
    </div>
  );
}

export default NftCard;
