import React, { useState } from "react";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);

  function getTokens() {
    return localStorage.getItem("token");
  }

  const handleLogout = async () => {
    try {
      const tokens = getTokens();
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="navbar bg-base-100 px-5 border border-y-2 border-slate-200 z-30">
      <div className="flex-1 gap-1">
        <div className="btn btn-ghost btn-circle">
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </div>
        <a className="hover:underline font-medium cursor-pointer hover:text-green-700 text-xl">
          Classroom
        </a>
      </div>
      <div className="flex-none gap-3">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <FontAwesomeIcon icon={faPlus} className="text-2xl" />
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body m-0">
              <span 
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                } className="text-base font-medium cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-lg">
                Buat Kelas
              </span>
              <span
                className="text-base font-medium cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-lg"
              >
                Gabung Kelas
              </span>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={handleLogout}>
              <a>{isLoading ? "Loading..." : "Logout"}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* MODAL */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-md text-xl btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Buat Kelas</h3>
          <div className="mt-3">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Nama Kelas <span className="text-red-600">(wajib)</span></span>
              </div>
              <input
                type="text"
                placeholder="Nama Kelas"
                className="input input-bordered"
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Mata Pelajaran</span>
              </div>
              <input
                type="text"
                placeholder="Mata Pelajaran"
                className="input input-bordered"
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Ruang</span>
              </div>
              <input
                type="text"
                placeholder="Ruang"
                className="input input-bordered"
              />
            </label>

            <div className="flex justify-end items-end mt-3">
              <button className="btn btn-ghost rounded-lg">Buat</button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Header;
