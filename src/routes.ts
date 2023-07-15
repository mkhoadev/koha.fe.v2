import { BsGridFill } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { GiCardJoker } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { IoWallet } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

export const routes: any = [
  { key: "collections", path: "/collections", name: "Collections", icon: BsGridFill },
  { key: "cart", path: "/cart", name: "Cart", icon: FaCartShopping },
  { key: "nfts", path: "/nfts", name: "Nfts", icon: GiCardJoker },
  { key: "wallet", path: "/wallet", name: "Wallet", icon: IoWallet },
  { key: "setting", path: "/setting", name: "Setting", icon: IoMdSettings },
  { key: "logout", path: "/logout", name: "Logout", icon: BiLogOut },
];
