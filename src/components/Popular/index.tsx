import React from "react";
import { ArrowRightIcon } from "../../../public/svgs";
import Image from "next/image";

function Popular() {
  return (
    <div className="popular__wrap">
      <div className="popular__top">
        <h1>Popular NFT’s Live Auction</h1>
        <p>
          Show more <ArrowRightIcon />
        </p>
      </div>
      <div className="popular__content">
        <div className="popular__content--item">
          <div className="info">
            <div className="info--item">
              <div className="count-down">
                <p>18h : 17m : 29s</p>
                <p>Time Remaining</p>
              </div>
              <div className="price">
                <p>100 ETH</p>
                <p>Highest Bid</p>
              </div>
            </div>
            <button>Place A Bid</button>
          </div>
          <Image src="/images/12.png" alt="" width={650} height={305} />
        </div>
        <div className="popular__content--item">
          <div className="info">
            <div className="info--item">
              <div className="count-down">
                <p>18h : 17m : 29s</p>
                <p>Time Remaining</p>
              </div>
              <div className="price">
                <p>100 ETH</p>
                <p>Highest Bid</p>
              </div>
            </div>
            <button>Place A Bid</button>
          </div>
          <Image src="/images/5.png" alt="" width={650} height={305} />
        </div>
      </div>
    </div>
  );
}

export default Popular;
