import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faScroll,
  faCircleUser,
  faRightFromBracket,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useActor } from "../../context/ActorContext";
import logo from "../../../public/fundchain_logo.png";
import { useDisconnect } from "wagmi";

const Sidebar: React.FC = () => {
  const { disconnect } = useDisconnect()

  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleMenuItemClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <aside className="w-50 h-screen flex flex-col justify-start fixed top-0 left-0 bg-[#FFFFFF] text-white">
      <div className="flex items-center justify-center self-center h-14 w-14 rounded-full mb-10 m-6">
        <img src={logo} alt="logo" />
      </div>

      <Link to="/">
        <div
          className={`flex items-center justify-start p-3 mr-2 h-10 rounded-tr-lg rounded-br-lg cursor-pointer text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white hover:duration-300 hover:ease-linear focus:bg-[#2D2D2D] mb-2 ${activeLink === "/" ? "bg-[#2D2D2D] text-white" : ""
            }`}
          onClick={() => handleMenuItemClick("/")}
        >
          <FontAwesomeIcon className="ml-2 text-sm" icon={faHouseChimney} />
          <p className="text-xs ml-4 p-2">Campaigns</p>
        </div>
      </Link>

      <Link to="/profile">
        <div
          className={`flex items-center justify-start p-3 mr-2 h-10 rounded-tr-lg rounded-br-lg cursor-pointer text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white hover:duration-300 hover:ease-linear focus:bg-[#2D2D2D] mb-2 ${activeLink === "/profile" ? "bg-[#2D2D2D] text-white" : ""
            }`}
          onClick={() => handleMenuItemClick("/profile")}
        >
          <FontAwesomeIcon className="ml-2 text-sm" icon={faCircleUser} />
          <p className="text-xs ml-4 p-2">Profile</p>
        </div>
      </Link>

      <div
        className={`mt-auto flex items-center justify-start p-3 mr-2 h-10 rounded-tr-lg rounded-br-lg cursor-pointer text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white hover:duration-300 hover:ease-linear focus:bg-[#2D2D2D] ${activeLink === "/auth" ? "bg-[#2D2D2D] text-white" : ""
          }`}
        onClick={() => disconnect()}
      >
        <FontAwesomeIcon className="ml-2 text-sm" icon={faRightFromBracket} />
        <p className="text-xs ml-4 p-2">Logout</p>
      </div>
    </aside>
  );
};

export default Sidebar;
