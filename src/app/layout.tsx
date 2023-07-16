import Layout from "@/components/Layout";
import { Poppins } from "next/font/google";
import "../styles/index.scss";
import "./globals.css";

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
          <Layout>{children}</Layout>
        </main>
      </body>
    </html>
  );
}
