import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faScroll,
  faUser,
  faRightFromBracket,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { logout } from "../services/entry";

const Sidebar: React.FC = () => {
  return (
    <aside className="h-screen w-16 flex flex-col space-y-10 items-center justify-center absolute top-0 left-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/*home*/}
      <a href="">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-white hover:text-gray-800 hover:duration-300 hover:ease-linear focus:bg-white">
          <FontAwesomeIcon icon={faHouse} />
        </div>
      </a>

      {/*add campaigns*/}
      <Link to="/create-campaign">
        <a href="">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-white hover:text-gray-800 hover:duration-300 hover:ease-linear focus:bg-white">
            <FontAwesomeIcon icon={faSquarePlus} />
          </div>
        </a>
      </Link>

      {/*campaigns*/}
      <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-white hover:text-gray-800 hover:duration-300 hover:ease-linear focus:bg-white">
        <FontAwesomeIcon icon={faScroll} />
      </div>

      {/*user*/}
      <a href="">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-white hover:text-gray-800 hover:duration-300 hover:ease-linear focus:bg-white">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </a>

      {/*logout*/}
      <div
        onClick={() => {
          logout();
          window.location.reload();
        }}
        className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-white hover:text-gray-800 hover:duration-300 hover:ease-linear focus:bg-white"
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
    </aside>
  );
};

export default Sidebar;
