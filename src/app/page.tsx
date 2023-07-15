import Header from "@/components/Header";
import HotBids from "@/components/HotBids";
import Navigation from "@/components/Navigation";
import Popular from "@/components/Popular";
import TopSeller from "@/components/TopSeller";

export default function Home() {
  return (
    <>
      <Popular />
      <TopSeller />
      <HotBids />
    </>
  );
}
