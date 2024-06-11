import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Nilai = () => {
  const [nilai, setNilai] = useState([]);

  const getIdUsers = () => localStorage.getItem("id");
  const getTokens = () => localStorage.getItem("token");

  useEffect(() => {
    getNilaiUsers();
  }, []);

  const getNilaiUsers = async () => {
    try {
      const tokens = getTokens();
      const response = await axios.get(
        `http://localhost:8000/api/nilai/${getIdUsers()}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      console.log(response.data);
      const data = response.data.nilai;

      // Periksa apakah data yang diterima adalah array atau objek tunggal
      if (Array.isArray(data)) {
        setNilai(data);
      } else if (typeof data === "object" && data !== null) {
        // Jika data adalah objek tunggal, tempatkan ke dalam array
        setNilai([data]);
      } else {
        // Handle jika data bukan array atau objek tunggal
        console.error("Data yang diterima bukan array atau objek tunggal");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="py-20 px-36">
      <div className="bg-white shadow-md border-2 rounded-md w-full h-full py-6 px-10">
        <div className="flex gap-2 px-3 flex-col">
          <h1 className="font-bold text-xl cursor-pointer">Nilai Ujian</h1>
          <hr className="w-full border-2" />
        </div>
        <div className="py-8">
          <div className="py-4 px-6 bg-slate-200 rounded-lg flex gap-2">
            <div className="flex gap-2 items-center z-20 bg-white px-4 w-full py-4 rounded-lg border-4 border-gray-300">
              <FontAwesomeIcon
                icon={faCalendar}
                className="text-xl text-orange-400"
              />
              <select className="w-full outline-none">
                <option selected>2024</option>
                <option>2023</option>
              </select>
            </div>
            <div className="flex gap-2 items-center z-20 bg-white px-4 w-full py-4 rounded-lg border-4 border-gray-300">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-xl text-orange-400"
              />
              <input
                type="text"
                placeholder="Cari nama ujian"
                className="w-full outline-none"
              />
            </div>
          </div>
        </div>
        <div className="py-2 flex items-center gap-2">
          <p>Urutkan : </p>
          <div className="bg-white w-32 px-2 py-2 rounded-lg border-4 border-gray-300">
            <select className="w-full outline-none">
              <option selected>Terbaru</option>
              <option>Terlama</option>
              <option>Terendah</option>
              <option>Tertinggi</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {nilai.length !== 0 ? (
            Object.values(nilai).map((item, i) => (
              <div className="py-4 flex gap-3 flex-wrap items-center" key={i}>
                <div className="bg-white relative rounded-lg shadow-lg border-2 flex flex-col px-4 py-4 min-w-72 w-auto h-48">
                  <div className="h-16">
                    <p className="text-base font-medium w-full">
                      {item.ujian.nama_ujian}
                      {item.tugas.judul}
                    </p>
                    <p className="text-sm">
                      {item.ujian.jenis_ujian} - {item.ujian.mapel}
                      {item.tugas.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className={`${
                        item.total_nilai > 75
                          ? "text-green-600 text-4xl"
                          : "text-[#CACACA]"
                      } text-center text-xl w-full font-bold`}
                    >
                      {item.total_nilai}
                    </p>
                  </div>

                  <p className="absolute bottom-3 right-3 text-sm text-[#666666]">
                    {item.ujian.waktu_pelaksanaan
                      ? new Date(item.ujian.waktu_pelaksanaan).toDateString()
                      : new Date(item.tugas.created_at).toDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>Anda belum mengikuti ujian</h1>
          )}
        </div>
        <hr className="w-full border-2 mt-16" />
        <div className="mt-8 flex items-center justify-between">
          <div>
            <p>Menampilkan 1 sampai 12 dari total 30 data</p>
          </div>
          <div>
            <div className="join">
              <button className="join-item btn">«</button>
              <button className="join-item btn">Page 22</button>
              <button className="join-item btn">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nilai;
