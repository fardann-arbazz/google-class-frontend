import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCog,
  faChartPie,
  faUser,
  faBookOpenReader,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(getRole());
  }, []);

  const getRole = () => localStorage.getItem("role");

  return (
    <div className="h-screen fixed px-1 top-14 mt-3 z-50 bg-base-100 shadow-md border border-y-0 border-slate-200 flex flex-col group transition-all duration-300 ease-in-out w-16 hover:w-64">
      <nav className="flex flex-col font-medium flex-grow">
        <Link
          to="/home"
          className="sidebar-item flex items-center px-4 py-2 hover:bg-slate-100 rounded-full w-full"
        >
          <FontAwesomeIcon icon={faHome} className="mr-3" />
          <span className="ml-3 hidden group-hover:inline">Beranda</span>
        </Link>
        <a
          href="#"
          className="sidebar-item flex items-center px-4 py-2 hover:bg-slate-100 rounded-full w-full"
        >
          <FontAwesomeIcon icon={faCalendar} className="mr-3" />
          <span className="ml-3 hidden group-hover:inline">Kalender</span>
        </a>
        <Link
          to="/home/nilai"
          className="sidebar-item flex items-center px-4 py-2 hover:bg-slate-100 rounded-full w-full"
        >
          <FontAwesomeIcon icon={faChartPie} className="mr-3" />
          <span className="ml-3 hidden group-hover:inline">Nilai</span>
        </Link>
        <hr className="my-2" />
        <Link
          to="/home/nilai"
          className="sidebar-item flex items-center px-4 py-2 hover:bg-slate-100 rounded-full w-full"
        >
          <FontAwesomeIcon icon={faCalendarDays} className="mr-3" />
          <span className="ml-3 hidden group-hover:inline">Jadwal</span>
        </Link>
        {role === "Siswa" ? null : (
          <div className="dropdown dropdown-right sidebar-item flex items-center px-4 py-2 hover:bg-slate-100 rounded-full w-full">
            <div tabIndex={0} role="button">
              <FontAwesomeIcon icon={faBookOpenReader} className="mr-3" />
              <span className="ml-3 hidden group-hover:inline">Ujian</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/home/ujian">Lihat Ujian</Link>
              </li>
              <li>
                <Link to="/home/ujian/pantau">Pantau Ujian</Link>
              </li>
            </ul>
          </div>
        )}
        {role === "Admin" ? (
          <div>
            <Link
              to="/home/user"
              className="sidebar-item flex items-center px-4 py-2 hover:bg-slate-100 rounded-full w-full"
            >
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              <span className="ml-3 hidden group-hover:inline">Users</span>
            </Link>
          </div>
        ) : null}
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
