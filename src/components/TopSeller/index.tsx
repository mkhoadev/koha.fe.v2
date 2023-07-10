import Image from "next/image";
import React from "react";
import { VerifyIcon } from "../../../public/svgs";

function TopSeller() {
  return (
    <div className="top-seller__wrap">
      <h2>Top Sellers</h2>
      <div className="sellers">
        {[3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <div className="seller-item">
            <Image width={60} height={60} src={`/images/nfts/${item}.png`} alt="" />
            <div className="seller-info">
              <p>
                @Khoadev <VerifyIcon />
              </p>
              <p>$1.000</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSeller;
