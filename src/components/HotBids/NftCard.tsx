import Image from "next/image";
import React from "react";
import { HealthyIcon } from "../../../public/svgs";

interface NftsCardProps {
  image: string;
}

function NftCard({ image }: NftsCardProps) {
  return (
    <div className="card__wrap--auction">
      <div className="card__title">
        <p className="card__title--auction">12:00:00</p>
        <p>
          999 <HealthyIcon />
        </p>
      </div>
      <div className="card__image">
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
