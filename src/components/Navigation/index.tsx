import Image from "next/image";
import { BsGrid } from "react-icons/bs";
import { CartIcon, LogoutIcon, SettingIcon, WalletIcon } from "../../../public/svgs";

function Navigation() {
  return (
    <div className="navigation__wrap">
      <Image src="/images/logo.png" alt="" width={40} height={40} />
      <div className="navigation-menu">
        <div className="navigation-item bar-active">
          <BsGrid size={20} />
        </div>
        <div className="navigation-item">
          <CartIcon />
        </div>
        <div className="navigation-item">
          <WalletIcon />
        </div>
        <div className="navigation-item">
          <SettingIcon />
        </div>
        <div className="navigation-item">
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
