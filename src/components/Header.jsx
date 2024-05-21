import React, { useState } from "react";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [namaKelas, setNamaKelas] = useState('');
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [ruang, setRuang] = useState('');
  const [msg, setMsg] = useState('');
  const [isNotif, setIsNotif] = useState('');
<<<<<<< HEAD
  const [classType, setClassType] = useState('')
=======
  const [classType, setClassType] = useState('');
  const [kodeKelas, setKodeKelas] = useState('');
>>>>>>> 965b9c63a0e61384fd41fc58d8a8b47b4477558b
  const navigate = useNavigate()

  function getTokens() {
    return localStorage.getItem("token");
  }

  const handleKelas = async () => {
    try {
      setIsLoading(true)
      const tokens = getTokens()
      const response = await axios.post('http://localhost:8000/api/kelas', {
        nama_kelas: namaKelas,
        mata_pelajaran: mataPelajaran,
        ruang
      }, {
        headers: {
          'Authorization': `Bearer ${tokens}`
        }
      })
      setIsNotif(true);
      setTimeout(() => {
        setIsNotif(false)
        navigate('/home')
      }, 2000)
      setClassType('alert-success')
      setMsg(response.data.message);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        setIsNotif(true);
        setClassType('alert-success');
        setTimeout(() => {
          setIsNotif(false)
        }, 2000)
        setMsg(error.response.data.message);
      }
    } finally {
      setIsLoading(false)
    }
  }

<<<<<<< HEAD
=======
  const handleJoinClass = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const tokens = getTokens();
      const response = await axios.post('http://localhost:8000/api/class-join', {
        kode_kelas: kodeKelas
      }, {
        headers: {
          'Authorization': `Bearer ${tokens}`
        }
      });
      navigate(`class/${response.data.kelas.kelas_id}`)
      setKodeKelas('');
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        alert('Gagal bergabung dengan kelas: ' + error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

>>>>>>> 965b9c63a0e61384fd41fc58d8a8b47b4477558b
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
      localStorage.removeItem('token')
      navigate('/login')
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
<<<<<<< HEAD
    <div className="navbar fixed top-0 bg-base-100 px-2 border border-y-2 border-slate-200 z-50">
=======
    <div className="navbar fixed top-0 bg-base-100 border border-y-2 border-slate-200 z-30">
>>>>>>> 965b9c63a0e61384fd41fc58d8a8b47b4477558b
      {isNotif && (
        <div role="alert" className={`alert ${classType}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{msg}</span>
        </div>
      )}
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
                onClick={() => document.getElementById('my_modal_1').showModal()}
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
                src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
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
                onChange={(e) => setNamaKelas(e.target.value)}
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
                onChange={(e) => setMataPelajaran(e.target.value)}
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
                onChange={(e) => setRuang(e.target.value)}
              />
            </label>

            <div className="flex justify-end items-end mt-3">
<<<<<<< HEAD
              <button disabled={isLoading} onClick={handleKelas} className="btn btn-ghost rounded-lg">{isLoading ? 'Loading...' : 'Submit'}</button>
=======
              <button onClick={handleKelas} disabled={isLoading} className="btn btn-ghost rounded-lg">{isLoading ? 'Loading...' : 'Buat'}</button>
>>>>>>> 965b9c63a0e61384fd41fc58d8a8b47b4477558b
            </div>
          </div>
        </div>
      </dialog>


      {/* Modal 2 */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Gabung Kelas</h3>
          <div className="bg-base-100 border-2 rounded-md w-full mt-8 py-4 h-auto min-h-24 px-5">
            <p className="text-sm font-medium">Kode Kelas</p>
            <p className="text-sm">Mintalah kode kepada pengajar, lalu masukkan kesini</p>
            <div className="py-4">
              <input type="text"
                className="outline-none py-3 px-3 border rounded-md border-black"
                placeholder="Kode kelas"
                value={kodeKelas}
                onChange={(e) => setKodeKelas(e.target.value)}
              />
            </div>
          </div>
          <div className="py-5 px-8 text-sm">
            <p className="font-medium text-base">Untuk login menggunakan kode kelas</p>
            <ul className="list-disc">
              <li className="my-3">Gunakan akun yang diberi otorisasi</li>
              <li className="mt-3">Gunakan kode kelas yang terdiri dari 5-7 huruf atau angka, tanpa spasi atau simbol</li>
            </ul>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn-ghost px-3 py-1 hover:bg-slate-100">Close</button>
              <button
                type="submit"
                disabled={!kodeKelas || isLoading}
                onClick={handleJoinClass}
                className={`btn-ghost px-3 py-1 ${!kodeKelas ? 'text-gray-500' : 'text-blue-500'} hover:bg-slate-100`}
              >
                {isLoading ? 'Loading..' : 'Gabung'}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Header;
