"use client";

import { routes } from "@/routes";
import { disconnectWallet } from "@/store/features/wallet/walletSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

function Navigation() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { address } = useSelector((state: any) => state.wallet);

  const disconnect = async () => {
    dispatch(disconnectWallet());
  };

  return (
    <div className="navigation__wrap">
      <Link href="/">
        <Image className="logo" src="/images/logo.png" alt="" width={40} height={40} />
      </Link>
      <div className="navigation-menu">
        {routes.map((route: any, index: number) => (
          <Link key={index} href={route?.path || "#"}>
            <div className={`navigation-item ${route?.path === pathname ? "bar-active" : ""}`}>
              {<route.icon size={24} color="#6ad2ebff" />}
            </div>
          </Link>
        ))}
        {address && (
          <div className="navigation-item" onClick={disconnect}>
            <BiLogOut size={24} color="#6ad2ebff" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;