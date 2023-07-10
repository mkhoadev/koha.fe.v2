import Header from "@/components/Header";
import HotBids from "@/components/HotBids";
import Navigation from "@/components/Navigation";
import Popular from "@/components/Popular";
import TopSeller from "@/components/TopSeller";

export default function Home() {
  return (
    <main className="container">
      <div className="layout-main">
        <Navigation />
        <div className="layout-content">
          <header>
            <Header />
          </header>
          <section>
            <Popular />
            <TopSeller />
            <HotBids />
          </section>
        </div>
      </div>
    </main>
  );
}
