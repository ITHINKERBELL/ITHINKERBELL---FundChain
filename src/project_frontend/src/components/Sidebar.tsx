import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faScroll, faUser, faRightFromBracket, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  return (
    <aside className="h-screen w-16 flex flex-col space-y-10 items-center justify-center absolute top-0 left-0 bg-white text-gray-800">
      {/*home*/}
      <a href="">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-800 hover:text-white hover:duration-300 hover:ease-linear focus:bg-gray-800">
            <FontAwesomeIcon icon={faHouse} />
        </div>
      </a>

      {/*add campaigns*/}
      <a href="">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-800 hover:text-white hover:duration-300 hover:ease-linear focus:bg-gray-800">
          <FontAwesomeIcon icon={faSquarePlus} />
        </div>
      </a>

      {/*campaigns*/}
      <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-800 hover:text-white hover:duration-300 hover:ease-linear focus:bg-gray-800">
         <FontAwesomeIcon icon={faScroll} />
      </div>

      {/*user*/}
      <a href="">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-800 hover:text-white hover:duration-300 hover:ease-linear focus:bg-gray-800">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </a>

      {/*logout*/}
      <a href="">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-800 hover:text-white hover:duration-300 hover:ease-linear focus:bg-gray-800">
            <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </a>
 
    </aside>
  );
};

export default Sidebar;
