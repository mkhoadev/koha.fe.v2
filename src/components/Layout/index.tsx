"use client";

import ProviderStore from "@/store/ProviderStore";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Navigation from "./Navigation";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProviderStore>
      <div className="layout-main">
        <Navigation />
        <div className="layout-content">
          <header>
            <Header />
          </header>
          <section>{children}</section>
        </div>
      </div>
      <ToastContainer />
    </ProviderStore>
  );
}

export default Layout;
