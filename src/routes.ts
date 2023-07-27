import { BsGridFill } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { GiCardJoker } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { IoGameController } from "react-icons/io5";

export const routes: any = [
  { key: "collections", path: "/collections", name: "Collections", icon: BsGridFill },
  { key: "cart", path: "", name: "Cart", icon: FaCartShopping },
  { key: "nfts", path: "/nfts", name: "Nfts", icon: GiCardJoker },
  { key: "setting", path: "/setting", name: "Setting", icon: IoMdSettings },
  { key: "game", path: "/game", name: "Game", icon: IoGameController },
];
