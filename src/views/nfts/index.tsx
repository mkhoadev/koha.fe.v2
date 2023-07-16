import NftCard from "@/components/NftCards";
import React from "react";

const nfts = [
  4, 5, 79, 82, 83, 84, 85, 86, 87, 88, 89, 90, 4, 5, 79, 82, 83, 84, 85, 86, 87, 88, 89, 90,
];

function NftsPage() {
  return (
    <div className="nfts__wrap">
      <div className="nfts__filter"></div>
      <div className="nfts__grid">
        {nfts.map((item, idx) => (
          <NftCard key={idx} image={`/images/nfts/${item}.png`} />
        ))}
      </div>
    </div>
  );
}

export default NftsPage;
