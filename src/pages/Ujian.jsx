import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const Ujian = () => {
  const [role, setRole] = useState("");
  const [namaUjian, setNamaUjian] = useState("")
  const [mapel, setMapel] = useState("");
  const [jenisUjian, setJenisUjian] = useState("")
  const [kelas, setKelas] = useState("")
  const [waktuPelaksanaan, setWaktuPelaksanaan] = useState("")
  const [dimulai, setDimulai] = useState("")
  const [selesai, setSelesai] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [ujianByGuru, setUjianByGuru] = useState([]);
  const [jenisPertanyaan, setJenisPertanyaan] = useState("PilihanGanda");
  const [point, setPoint] = useState("");
  const [pertanyaan, setPertanyaan] = useState("");
  const [pilihanJawaban, setPilihanJawaban] = useState([
    { teks_pilihan: "", benar: false },
    { teks_pilihan: "", benar: false },
    { teks_pilihan: "", benar: false },
    { teks_pilihan: "", benar: false },
    { teks_pilihan: "", benar: false },
  ]);
  const [selectedUjianId, setSelectedUjianId] = useState(null);
  const [listPertanyaan, setListPertanyaan] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    setRole(getRole());
    getDataUjian();
  }, []);
  
  const getId = () => localStorage.getItem("id");
  const getTokens = () => localStorage.getItem("token");
  const getRole = () => localStorage.getItem("role");
  
  const getDataUjian = async () => {
    try {
      const tokens = getTokens();
      const id = getId();
      const role = getRole();
      if (role === "Guru") {
        const response = await axios.get(`http://localhost:8000/api/ujian/${id}`, {
          headers: {
            'Authorization': `Bearer ${tokens}`
          }
        });
        console.log("get data by guru",response);
        const ujianData = response.data.ujian;
        setUjianByGuru(ujianData);
        console.log(ujianData);
      } else if (role === "Siswa") {
        const response = await axios.get(`http://localhost:8000/api/ujian`, {
          headers: {
            'Authorization': `Bearer ${tokens}`
          }
        });
        console.log("get data by siswa", response);
      }
    } catch (error) {
      if(error.response) {
        console.log(error.response.data);
      }
    }
  }

  const handleUjian = async () => {
    try {
      setIsLoading(true)
      const tokens = getTokens()
      const response = await axios.post('http://localhost:8000/api/ujian', {
        nama_ujian: namaUjian,
        mapel,
        jenis_ujian: jenisUjian,
        kelas,
        waktu_pelaksanaan: waktuPelaksanaan,
        dimulai,
        selesai 
      }, {
        headers: {
          "Authorization": `Bearer ${tokens}`
        }
      })
      document.getElementById("my_modal_4").close();
      Swal.fire({
        title: "Good job!",
        text: response.data.message,
        icon: "success"
      });
      getDataUjian();
    } catch (error) {
      if(error.response) {
        console.log(error.response.data);
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleTambahPertanyaan = () => {
    const newPertanyaan = {
      pertanyaan,
      jenis_pertanyaan: jenisPertanyaan,
      pilihan_jawaban: jenisPertanyaan === "PilihanGanda" ? pilihanJawaban : [],
      point
    };
    setListPertanyaan([...listPertanyaan, newPertanyaan]);
    setPertanyaan("");
    setJenisPertanyaan("PilihanGanda");
    setPilihanJawaban([
      { teks_pilihan: "", benar: false },
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
            ujian_id: selectedUjianId,
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

  const openPertanyaanModal = (ujianId) => {
    setSelectedUjianId(ujianId);
    document.getElementById("my_modal_pertanyaan").showModal();
  };

  const handleNavigate = (id) => {
    navigate(`/ujian/${id}`)
  }

  return (
    <div className="p-20 bg-gray-100 min-h-screen">
      {role === "Admin" || role === "Guru" ? (
        <div className="bg-white rounded-md w-full max-w-full shadow-md py-4 px-4 h-full">
          <div className="px-6">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">Ujian</h1>
              <button
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
                className="bg-black text-white py-1 px-4 rounded-md font-medium"
              >
                Buat Ujian
              </button>
            </div>
            <hr className="w-full border-2 mt-2" />
            {ujianByGuru.length !== 0 ? (
              (ujianByGuru.map(((ujians, i) => (
            <div key={i} className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Waktu Pelaksanaan</th>
                    <th>Nama Ujian</th>
                    <th>Mata Pelajaran</th>
                    <th>Jenis Ujian</th>
                    <th>Kelas</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td className="flex flex-col">
                      <p>{new Date(ujians.waktu_pelaksanaan).toDateString()}</p>
                      <div>
                       <p>{ujians.dimulai} - <span>{ujians.selesai}</span></p>
                      </div>
                    </td>
                    <td>{ujians.nama_ujian}</td>
                    <td>{ujians.mapel}</td>
                    <td>{ujians.jenis_ujian}</td>
                    <td>{ujians.kelas}</td>
                    <td className="gap-2">
                      <button onClick={() => handleNavigate(ujians.id)} className="w-24 py-2 bg-blue-600 text-white font-medium rounded-md">
                        Lihat Soal
                      </button>
                      <button onClick={() => openPertanyaanModal(ujians.id)} className="w-24 py-2 bg-green-600 text-white font-medium rounded-md ml-2">
                        Buat Soal
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
              ))))
            ) : (
              <div className="py-4 px-6">
                <h1 className="font-medium">Anda belum membuat ujian</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {/* Modal ujian */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-4xl px-8">
          <h3 className="font-bold text-lg">Buat Ujian!</h3>
          <hr className="w-full my-2" />
          <div className="mt-3">
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Nama Ujian 
                </span>
              </div>
              <input
                type="text"
                placeholder="Nama Ujian"
                className="input input-bordered"
                onChange={(e) => setNamaUjian(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Mata Pelajaran 
                </span>
              </div>
              <input
                type="text"
                placeholder="Mata Pelajaran"
                className="input input-bordered"
                onChange={(e) => setMapel(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Jenis Ujian <span className="text-sm text-red-500">contoh (PSAS, PSAT, UH)</span>
                </span>
              </div>
              <input
                type="text"
                placeholder="Jenis Ujian"
                className="input input-bordered"
                onChange={(e) => setJenisUjian(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Kelas 
                </span>
              </div>
              <input
                type="text"
                placeholder="Kelas"
                className="input input-bordered"
                onChange={(e) => setKelas(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Waktu Pelaksanaan</span>
              </div>
              <input
                type="date"
                placeholder="Waktu Pelaksanaan"
                className="input input-bordered"
                onChange={(e) => setWaktuPelaksanaan(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Dimulai Pada Jam 
                </span>
              </div>
              <input
                type="text"
                placeholder="Dimulai Pada Jam"
                className="input input-bordered"
                onChange={(e) => setDimulai(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Selesai Pada Jam 
                </span>
              </div>
              <input
                type="text"
                placeholder="Selesai Pada Jam"
                className="input input-bordered"
                onChange={(e) => setSelesai(e.target.value)}
              />
            </label>
            <div className="flex justify-end items-end mt-3">
              <button
               disabled={isLoading}
               onClick={handleUjian}
               className="btn bg-black text-white w-full hover:bg-black rounded-xl">
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-md btn-circle btn-ghost absolute right-1 top-1 text-xl">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>


      {/* MODAL UNTUK PERTANYAAN */}
      <dialog id="my_modal_pertanyaan" className="modal">
        <div className="modal-box w-11/12 max-w-3xl px-8">
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
            <div className="flex justify-center gap-5 items-center mt-3">
              <button
                disabled={isLoading}
                onClick={handleTambahPertanyaan}
                className="btn bg-blue-500 px-6 text-white hover:bg-blue-600 rounded-xl"
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
                className="btn bg-black text-white px-6 hover:bg-black rounded-xl"
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

export default Ujian;
