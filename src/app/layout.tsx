import { Poppins } from "next/font/google";
import "./globals.css";
import "../styles/index.scss";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";

const poppins = Poppins({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Koa",
  description: "Koa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="container">
          <div className="layout-main">
            <Navigation />
            <div className="layout-content">
              <header>
                <Header />
              </header>
              <section>{children}</section>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
