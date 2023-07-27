"use client";

import Image from "next/image";

function CollectionCard(props: any) {
  const { data } = props;
  return (
    <div className="collection__card">
      <Image src={data?.image || "/images/bg-gradient.jpg"} alt="" width={180} height={180} />
      <p>{data?.name}</p>
    </div>
  );
}

export default CollectionCard;
