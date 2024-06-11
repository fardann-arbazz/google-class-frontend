import React, { useEffect, useState } from "react";
import NavbarClass from "../components/NavbarClass";
import imgTugas from "../assets/educator.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'

const Tugas = () => {
  const [namaTugas, setNamaTugas] = useState("");
  const [description, setDescription] = useState("");
  const [jatuhTempo, setJatuhTempo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tugas, setTugas] = useState([]);
  const [jenisPertanyaan, setJenisPertanyaan] = useState("Essay");
  const [point, setPoint] = useState("");
  const [pertanyaan, setPertanyaan] = useState("");
  const [pilihanJawaban, setPilihanJawaban] = useState([
    { teks_pilihan: "", benar: false },
    { teks_pilihan: "", benar: false },
    { teks_pilihan: "", benar: false },
    { teks_pilihan: "", benar: false },
  ]);
  const [selectedTugasId, setSelectedTugasId] = useState(null);
  const [listPertanyaan, setListPertanyaan] = useState([]);
  const { id } = useParams();
  const [role, setRole] = useState("");

  const getTokens = () => localStorage.getItem("token");
  const getRole = () => localStorage.getItem("role");

  useEffect(() => {
    setRole(getRole())
    getDataTugas();
  }, []);

  const getDataTugas = async () => {
    try {
      const tokens = getTokens();
      const response = await axios.get(`http://localhost:8000/api/tugas/${id}`, {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      });
      setTugas(response.data.tugas);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const handleTugas = async () => {
    try {
      const tokens = getTokens();
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/tugas",
        {
          kelas_id: id,
          judul: namaTugas,
          description,
          jatuh_tempo: jatuhTempo,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      getDataTugas();
      document.getElementById("my_modal_10").close();
      Swal.fire({
        title: "Good job!",
        text: response.data.message,
        icon: "success"
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleTambahPertanyaan = () => {
    const newPertanyaan = {
      pertanyaan,
      jenis_pertanyaan: jenisPertanyaan,
      pilihan_jawaban: jenisPertanyaan === "PilihanGanda" ? pilihanJawaban : [],
      point
    };
    setListPertanyaan([...listPertanyaan, newPertanyaan]);
    setPertanyaan("");
    setJenisPertanyaan("Essay");
    setPilihanJawaban([
      { teks_pilihan: "", benar: false },
      { teks_pilihan: "", benar: false },
      { teks_pilihan: "", benar: false },
      { teks_pilihan: "", benar: false },
    ]);
  };

  const handleKirimSemuaPertanyaan = async () => {
    try {
      const tokens = getTokens();
      setIsLoading(true);
      for (const pertanyaan of listPertanyaan) {
        await axios.post(
          "http://localhost:8000/api/pertanyaan",
          {
            tugas_id: selectedTugasId,
            ...pertanyaan,
          },
          {
            headers: {
              Authorization: `Bearer ${tokens}`,
            },
          }
        );
      }
      Swal.fire({
        title: "Good job!",
        text: "Pertanyaan berhasil dibuat!",
        icon: "success"
      });
      document.getElementById("my_modal_pertanyaan").close();
      setListPertanyaan([]);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePilihanChange = (index, field, value) => {
    const newPilihanJawaban = [...pilihanJawaban];
    newPilihanJawaban[index][field] = value;
    setPilihanJawaban(newPilihanJawaban);
  };

  const openPertanyaanModal = (tugasId) => {
    setSelectedTugasId(tugasId);
    document.getElementById("my_modal_pertanyaan").showModal();
  };

  return (
    <div>
      <NavbarClass />
      <div className="flex flex-col justify-center py-36 px-56">
      {role === 'Guru' ? (
    <button
      onClick={() => document.getElementById("my_modal_10").showModal()}
      className="btn rounded-full text-start px-6 w-36 bg-sky-500 hover:bg-sky-600 text-white"
    >
      Buat
    </button>
  ) : null}
        <hr className="w-full border-2 mt-4" />
        {tugas.length !== 0 ? (
          tugas.map((quest, i) => (
            <div key={i} className="flex flex-col items-center gap-5 py-6">
              <div className="bg-white border-2 shadow-xl w-[650px] py-4 px-5 rounded-md">
                <div className="flex justify-between items-center">
                  <Link to={`/home/class/${id}/pertanyaan/${quest.id}`} className="flex cursor-pointer hover:underline gap-4 items-center">
                    <FontAwesomeIcon icon={faCircleQuestion} className="text-2xl" />
                    <p className="text-base font-medium">{quest.judul}</p>
                  </Link>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-400">Diposting mei 25</p>
                    {role === 'Guru' ? (

                      <div className="dropdown dropdown-bottom">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                      >
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          className="text-base"
                        />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li onClick={() => openPertanyaanModal(quest.id)}>
                          <a>Buat Pertanyaan</a>
                        </li>
                        <li>
                          <a>Edit</a>
                        </li>
                      </ul>
                    </div>
                    ) : (
                      null
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center pt-36">
            <div className="w-80 mb-10">
              <img src={imgTugas} alt="images tugas" className="w-full" />
            </div>
            <h1 className="text-base text-gray-700 font-medium">
              Disinilah anda akan memberikan tugas
            </h1>
            <p className="text-sm w-[400px] text-center">
              Anda dapat menambahkan tugas dan pekerjaan lain untuk kelas, lalu
              mengaturnya ke dalam topik
            </p>
          </div>
        )}
      </div>

      {/* MODAL */}
      <dialog id="my_modal_10" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-md text-xl btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Tugas</h3>
          <div className="mt-3">
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Nama Tugas <span className="text-red-600">(wajib)</span>
                </span>
              </div>
              <input
                type="text"
                placeholder="Nama Tugas"
                className="input input-bordered"
                onChange={(e) => setNamaTugas(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Jatuh Tempo
                </span>
              </div>
              <input
                type="date"
                placeholder="Jatuh Tempo"
                className="input input-bordered"
                onChange={(e) => setJatuhTempo(e.target.value)}
              />
            </label>
            <div className="flex justify-end items-end mt-3">
              <button
                disabled={isLoading}
                onClick={handleTugas}
                className="btn bg-black text-white hover:bg-black rounded-xl"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Tugaskan"
                )}
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/* MODAL UNTUK PERTANYAAN */}
      <dialog id="my_modal_pertanyaan" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-md text-xl btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Pertanyaan</h3>
          <div className="mt-3">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Jenis Pertanyaan</span>
              </div>
              <select
                className="select select-bordered"
                value={jenisPertanyaan}
                onChange={(e) => setJenisPertanyaan(e.target.value)}
              >
                <option value="Essay">Essay</option>
                <option value="PilihanGanda">Pilihan Ganda</option>
              </select>
            </label>
            <label className="form-control mt-4">
              <div className="label">
                <span className="label-text">Pertanyaan</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Pertanyaan"
                value={pertanyaan} // Tambahkan value agar textarea terikat ke state
                onChange={(e) => setPertanyaan(e.target.value)}
              ></textarea>
            </label>
            {jenisPertanyaan === "PilihanGanda" && (
              <>
                {pilihanJawaban.map((pilihan, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <input
                      type="text"
                      placeholder={`Pilihan ${index + 1}`}
                      className="input input-bordered w-full mr-2"
                      value={pilihan.teks_pilihan}
                      onChange={(e) =>
                        handlePilihanChange(
                          index,
                          "teks_pilihan",
                          e.target.value
                        )
                      }
                    />
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={pilihan.benar}
                      onChange={(e) =>
                        handlePilihanChange(index, "benar", e.target.checked)
                      }
                    />
                  </div>
                ))}
              </>
            )}
             <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Point
                </span>
              </div>
              <input
                type="text"
                placeholder="Point"
                className="input input-bordered"
                onChange={(e) => setPoint(e.target.value)}
              />
            </label>
            <div className="flex justify-between items-center mt-3">
              <button
                disabled={isLoading}
                onClick={handleTambahPertanyaan}
                className="btn bg-blue-500 text-white hover:bg-blue-600 rounded-xl"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Tambah Pertanyaan Baru"
                )}
              </button>
              <button
                disabled={isLoading}
                onClick={handleKirimSemuaPertanyaan}
                className="btn bg-black text-white hover:bg-black rounded-xl"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Kirim Semua Pertanyaan"
                )}
              </button>
            </div>
            <div className="mt-5">
              <h4 className="font-bold">Daftar Pertanyaan</h4>
              {listPertanyaan.length === 0 ? (
                <p className="text-gray-500">Belum ada pertanyaan</p>
              ) : (
                listPertanyaan.map((q, i) => (
                  <div key={i} className="border p-2 my-2 rounded">
                    <p>{i+1}. {q.pertanyaan}</p>
                    {q.jenis_pertanyaan === "PilihanGanda" && (
                      <ul className="list-disc ml-5">
                        {q.pilihan_jawaban.map((p, idx) => (
                          <li key={idx} className={p.benar ? "text-green-500" : ""}>
                            {p.teks_pilihan}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Tugas;
