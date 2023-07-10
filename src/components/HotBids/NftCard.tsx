import Image from "next/image";
import React from "react";
import { HealthyIcon } from "../../../public/svgs";

interface NftsCardProps {
  image: string;
}

function NftCard({ image }: NftsCardProps) {
  return (
    <div className="card__wrap">
      <div className="card--top">
        <p className="auction">12:00:00</p>
        <p>
          999 <HealthyIcon />
        </p>
      </div>
      <div className="card--image">
        <Image src={image} alt="" width={200} height={200} />
      </div>
      <p className="card--name">Stretch Of Time</p>
      <div className="card--price">
        <p>0.45 ETH</p>
        <div></div>
      </div>
    </div>
  );
}

export default NftCard;
