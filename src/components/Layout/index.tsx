"use client";

import configAxios from "@/global/axiosConfig";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Navigation from "./Navigation";

configAxios();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  );
}

export default Layout;
