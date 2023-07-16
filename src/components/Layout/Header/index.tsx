"use client";

import { connectWallet, disconnectWallet } from "@/store/features/wallet/walletSlice";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const { address } = useSelector((state: any) => state.wallet);

  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts: any) => {
      if (accounts.length > 1) {
        dispatch(disconnectWallet());
      }
    });
  }, []);

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        signer
          .signMessage("Welcome to KoHa, the NFT marketplace for the people. 🎉")
          .then(() => {
            dispatch(
              connectWallet({
                address: signer.address,
              }),
            );
          })
          .catch((error) => {
            console.error("Failed to sign the message:", error);
          });
      } catch (error) {
        console.error("Error connecting to Wallet:", error);
        dispatch(disconnectWallet());
      }
    } else {
      console.error("Wallet not found");
      dispatch(disconnectWallet());
    }
  };

  return (
    <div className="header__wrap">
      <div className="search-bar">
        <div className="search-input">
          <BiSearch size={20} />
          <input type="text" placeholder="Search by creator or collection" />
        </div>
      </div>
      <div className="header__right">
        <Link href="/launchpad">
          <button className="launchpad">Launchpad</button>
        </Link>
        {address ? (
          <div className="user">
            <Image src="/images/avatar.png" alt="" width={56} height={56} />
            <div className="user-info">
              <p>David Dao</p>
              <p>{`${address.slice(0, 6)}...${address.slice(
                address.length - 4,
                address.length,
              )}`}</p>
            </div>
          </div>
        ) : (
          <button className="connect-wallet" onClick={connect}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
