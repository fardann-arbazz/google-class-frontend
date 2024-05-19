import React from "react";
import imgContent from "../assets/buku.jpg";

const Content = () => {
  return (
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
