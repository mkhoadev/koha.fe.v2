"use client";

import collectionAPI from "@/apis/collectionAPI";
import React, { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import Link from "next/link";

function Collections() {
  const [collections, setCollections] = useState<any>([]);

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    try {
      const { data } = await collectionAPI.getAll();
      setCollections(data?.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="collections__grid">
      {collections?.map((item: any, idx: number) => (
        <Link key={idx} href={`/collections/${item?._id}`}>
          <CollectionCard data={item} />
        </Link>
      ))}
    </div>
  );
}

export default Collections;
