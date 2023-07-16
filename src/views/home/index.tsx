import HotBids from "@/components/HotBids";
import Popular from "@/components/Popular";
import TopSeller from "@/components/TopSeller";
import React from "react";

function HomePage() {
  return (
    <>
      <Popular />
      <TopSeller />
      <HotBids />
    </>
  );
}

export default HomePage;
