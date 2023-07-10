import React from "react";
import NftCard from "./NftCard";

function HotBids() {
  return (
    <div className="hot-bid__wrap">
      {[4, 5, 79, 82, 83, 84, 85, 86, 87, 88, 89, 90].map((item, idx) => (
        <NftCard key={idx} image={`/images/nfts/${item}.png`} />
      ))}
    </div>
  );
}

export default HotBids;
