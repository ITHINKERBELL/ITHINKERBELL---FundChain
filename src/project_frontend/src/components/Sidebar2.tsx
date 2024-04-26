import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCalendar, faUser, faBook, faSquarePlus, faScroll, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Sidebar2 = () => {
    return (
        <div className="sidebar">
          <ul className="nav_list">
            <li>
              <Link to="/student/home"  className="list-leftbar">
                <FontAwesomeIcon icon={faHouse} />
                <span className="links_name">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/student/calendar"  className="list-leftbar">
                <FontAwesomeIcon icon={faSquarePlus} />
                <span className="links_name">Create Campaign</span>
              </Link>
            </li>
            <li >
              <Link to="/student/inventory"  className="list-leftbar">
                <FontAwesomeIcon icon={faScroll} />
                <span className="links_name">Campaigns</span>
              </Link>
            </li>
            <li>
              <Link to="/student/profile"  className="list-leftbar">
                <FontAwesomeIcon icon={faUser} />
                <span className="links_name">Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/student/profile"  className="list-leftbar">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className="links_name">Log out</span>
              </Link>
            </li>
          </ul>
        </div>
      );
    };

export default Sidebar2
