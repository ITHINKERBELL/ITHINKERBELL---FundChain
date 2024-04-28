import React from "react";
import { useNavigate } from "react-router-dom";
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
import { useActor } from "../context/ActorContext";

const Sidebar: React.FC = () => {

  const { resetActor } = useActor();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate("/auth");
    resetActor();
  };

  return (
    <aside className="h-screen w-16 flex flex-col space-y-10 items-center justify-center absolute top-0 left-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-tr-xl rounded-br-xl">
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
          handleLogoutClick();
          // window.location.reload();
        }}
        className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-white hover:text-gray-800 hover:duration-300 hover:ease-linear focus:bg-white"
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </div>
    </aside>
  );
};

export default Sidebar;
