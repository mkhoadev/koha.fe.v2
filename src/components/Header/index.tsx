import Image from "next/image";
import React from "react";
import { BiSearch } from "react-icons/bi";

function Header() {
  return (
    <div className="header__wrap">
      <div className="search-bar">
        <div className="search-input">
          <BiSearch size={20} />
          <input type="text" placeholder="Search by creator or collection" />
        </div>
      </div>
      <div className="header__right">
        <button className="create">Create</button>
        <button className="connect-wallet">Connect Wallet</button>
        {/* <div className="user">
          <Image src="/images/avatar.png" alt="" width={56} height={56} />
          <div className="user-info">
            <p>David Dao</p>
            <p>0x4f5...D28A</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Header;
