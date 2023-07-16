import { BsGridFill } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { GiCardJoker } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";

export const routes: any = [
  { key: "collections", path: "/collections", name: "Collections", icon: BsGridFill },
  { key: "cart", path: "", name: "Cart", icon: FaCartShopping },
  { key: "nfts", path: "/nfts", name: "Nfts", icon: GiCardJoker },
  { key: "setting", path: "/setting", name: "Setting", icon: IoMdSettings },
];
