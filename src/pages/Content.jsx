import React, { useEffect, useState } from "react";
import imgContent from "../assets/buku.jpg";
import imgRead from '../assets/img_read.jpg'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const [kelas, setKelas] = useState([])
  const navigate = useNavigate()

  function getTokens() {
    return localStorage.getItem('token')
  }

  useEffect(() => {
    getKelas()
  }, [])

  const handleKelas = (id) => {
    navigate(`class/${id}`)
  }

  const getKelas = async () => {
    try {
      const tokens = getTokens()
      const response = await axios.get('http://localhost:8000/api/kelas', {
        headers: {
          'Authorization': `Bearer ${tokens}`
        }
      })
      setKelas(response.data.kelas);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  }

  return (
    <div className="flex h-96 py-4">
      {kelas.totalElement !== 0 ? (
        kelas.map((classItem, i) => (
          <div className="flex px-10 py-2" key={i}>
            <div className="card card-compact w-72 h-72 bg-base-100 shadow-xl flex">
              <figure className="relative" onClick={() => handleKelas(classItem.id)}><img src={imgRead} alt="Shoes" className=" h-28" /></figure>
              <div className="card-body flex flex-col justify-between">
                <h2 className="card-title absolute top-3 hover:underline cursor-pointer text-xl text-gray-200">{classItem.nama_kelas}</h2>
                <div className="justify-end absolute top-3 btn-sm right-0 px-6 btn-ghost cursor-pointer btn-circle dropdown dropdown-right">
                  <FontAwesomeIcon icon={faEllipsisVertical} tabIndex={0} role="button" className="text-white text-base" />
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Salin link undangan</a></li>
                    <li><a>Edit</a></li>
                    <li><a>Salin</a></li>
                  </ul>
                </div>
              </div>
              <div className="card-actions justify-end">
                <div>

                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-screen ml-auto mr-auto">
          <div className="flex flex-col items-center justify-center gap-3">
            <img src={imgContent} alt="logooo" className="w-56" />
            <p className="font-medium text-gray-600 text-base">
              Tambahkan kelas untuk memulai
            </p>
            <div className="flex gap-2">
              <div
                onClick={() => document.getElementById("my_modal_3").showModal()}
                className="px-2 py-2 hover:bg-slate-100 rounded-md font-medium text-blue-500 cursor-pointer"
              >
                Buat Kelas
              </div>
              <div className="px-4 py-2 hover:bg-blue-700 bg-blue-600 rounded-md font-medium text-white cursor-pointer">
                Gabung Kelas
              </div>
            </div>
          </div>
        </div>
      )}

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
                <span className="label-text">
                  Nama Kelas <span className="text-red-600">(wajib)</span>
                </span>
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

export default Content;
