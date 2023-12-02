"use client";

import configAxios from "@/global/axiosConfig";
import { jwtManager } from "@/global/jwtManager";
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
  const { user } = useSelector((state: any) => state.wallet);

  const disconnect = async () => {
    window.localStorage.clear();
    jwtManager?.clear();
    configAxios();
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
              {<route.icon size={24} color={route?.path === pathname ? "#8FFF00" : "#393939"} />}
            </div>
          </Link>
        ))}
        {Object.keys(user).length > 0 && (
          <div className="navigation-item" onClick={disconnect}>
            <BiLogOut size={24} color="#393939" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
