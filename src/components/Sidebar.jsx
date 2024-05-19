import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCog,
  faUsersRectangle
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const Sidebar = () => {
  return (
    <div className="h-screen z-50 bg-base-100 shadow-md border border-y-0 border-slate-200 flex flex-col group transition-all duration-300 ease-in-out w-16 hover:w-64">
      <nav className="flex flex-col font-medium flex-grow">
        <a
          href="#"
          className="sidebar-item flex items-center px-4 py-2 hover:bg-slate-100 rounded-full w-full"
        >
          <FontAwesomeIcon icon={faHome} className="mr-3" />
          <span className="ml-3 hidden group-hover:inline">Beranda</span>
        </a>
        <a
          href="#"
          className="sidebar-item flex items-center px-4 py-2 hover:bg-slate-100 rounded-full w-full"
        >
          <FontAwesomeIcon icon={faCalendar} className="mr-3" />
          <span className="ml-3 hidden group-hover:inline">Kalender</span>
        </a>
        <hr className="my-2" />
        <div className="dropdown dropdown-bottom flex items-center px-2 py-2 hover:bg-slate-100 rounded-full w-full">
          <div tabIndex={0} role="button" className="sidebar-item m-1 flex items-center">
            <FontAwesomeIcon icon={faUsersRectangle} className="mr-3" />
            <span className="ml-3 hidden group-hover:inline">Mengajar</span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <hr className="my-2" />
        <a
          href="#"
          className="sidebar-item flex items-center px-4 py-2 hover:bg-slate-100 rounded-full w-full"
        >
          <FontAwesomeIcon icon={faCog} className="mr-3" />
          <span className="ml-3 hidden group-hover:inline">Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;