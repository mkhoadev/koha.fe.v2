"use client";

import { routes } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathname = usePathname();

  return (
    <div className="navigation__wrap">
      <Link href="/">
        <Image className="logo" src="/images/logo.png" alt="" width={40} height={40} />
      </Link>
      <div className="navigation-menu">
        {routes.map((route: any, index: number) => (
          <Link key={index} href={!route?.isLink ? route?.path : "#"}>
            <div className={`navigation-item ${route?.path === pathname ? "bar-active" : ""}`}>
              {<route.icon size={24} color="#6ad2ebff" />}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navigation;
