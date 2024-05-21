import React, { useEffect, useState } from "react";
import imgRead from "../assets/img_read.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faRetweet,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import bookImg from '../assets/book.png'
import axios from "axios";

const Kelas = () => {
  const { id } = useParams();
  const [kelas, setKelas] = useState({});
  const [isCardClicked, setIsCardClicked] = useState(false);
  const [isLaoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  function getTokens() {
    return localStorage.getItem("token");
  }

  useEffect(() => {
    getDataKelasById();
  }, []);

  const getDataKelasById = async () => {
    try {
      const tokens = getTokens();
      const response = await axios.get(
        `http://localhost:8000/api/kelas/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      setKelas(response.data.kelas);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const getDataPosts = async () => {
     try {
        const tokens = getTokens()
        const response = await axios.get(`http://localhost:8000/api/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${tokens}`
            }
        })
        setPosts(response.data.posts);
     } catch (error) {
        if(error.response) {
            console.log(error.response.data.message);
        }
     }
  }

  useEffect(() => {
    getDataPosts()
   }, [])

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const tokens = getTokens();
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/posts",
        {
          content,
          kelas_id: id
        },
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      console.log(response);
      setContent("");
      getDataKelasById();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    setIsCardClicked(true);
  };

  const handleFalse = () => {
    setIsCardClicked(false);
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center border-slate-200 border px-5 gap-4 font-medium z-30 shadow-md border-b-2 border-t-0 py-2 text-sm">
        <div className="hover:bg-slate-100 py-2 px-2 h-full cursor-pointer">
          Forum
        </div>
        <div className="hover:bg-slate-100 py-2 px-2 h-full cursor-pointer">
          Tugas kelas
        </div>
        <div className="hover:bg-slate-100 py-2 px-2 h-full cursor-pointer">
          Orang
        </div>
        <div className="hover:bg-slate-100 py-2 px-2 h-full cursor-pointer">
          Nilai
        </div>
      </div>

      {kelas && (
        <div className="flex flex-col justify-center items-center py-6">
          <div className="relative">
            <img src={imgRead} alt="background" className="rounded-md" />
            <p className="text-gray-100 text-3xl absolute font-medium bottom-5 left-4">
              {kelas.nama_kelas}
            </p>
          </div>
          <div className="flex mt-6 gap-8">
            <div className="flex flex-col gap-4">
              <div className="card w-56 h-26 bg-base-100 border-2">
                <div className="card-body p-4">
                  <div className="flex justify-between">
                    <span className="card-title text-sm leading-none">
                      Kode kelas
                    </span>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      tabIndex={0}
                      role="button"
                      className="text-black text-base"
                    />
                  </div>
                  <span className="font-medium text-sm leading-none">
                    {kelas.kode_kelas}
                  </span>
                </div>
              </div>
              <div className="card w-56 h-26 bg-base-100 border-2">
                <div className="card-body p-4">
                  <span className="card-title text-base leading-none">
                    Mendatang
                  </span>
                  <span className="text-gray-400 py-3 text-sm">
                    Tidak ada tugas yang perlu segera diselesaikan
                  </span>
                  <div className="card-actions justify-end">
                    <button className="btn btn-sm btn-ghost">
                      Lihat semua
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              {isCardClicked ? (
                <div className="bg-base-100 shadow-lg rounded-md w-[700px] h-auto p-5 flex flex-col gap-3">
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Umumkan sesuatu kepada kelas anda"
                    rows="4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleFalse}
                      className="py-2 px-5 rounded-sm font-medium hover:bg-slate-100 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      disabled={!content || isLaoading}
                      onClick={handlePost}
                      className={`py-2 px-10 ${
                        !content
                          ? "bg-gray-300 text-gray-500"
                          : "bg-black text-white"
                      } font-medium text-sm rounded-md`}
                    >
                      {isLaoading ? "Loading..." : "Posting"}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="bg-base-100 shadow-lg rounded-md w-[700px] h-16 flex justify-between px-5 items-center gap-5 cursor-pointer"
                  onClick={handleCardClick}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                      />
                    </div>
                    <div className="text-sm text-gray-400">
                      Umumkan sesuatu kepada kelas anda
                    </div>
                  </div>
                  <div className="btn btn-ghost btn-circle">
                    <FontAwesomeIcon icon={faRetweet} className="text-base" />
                  </div>
                </div>
              )}

              <div className="flex flex-col pt-10">
                {posts.length === 0 ? (
                   <div className="bg-base-100 relative shadow-lg rounded-md w-[700px] h-44 border-2 flex justify-between px-5 items-center gap-5 cursor-pointer">
                       <div className="flex gap-4 items-center">
                            <img src={bookImg} alt="BOOK IMAGESSS" className=" w-32 h-28" />
                            <div className="flex flex-col">
                              <h1 className="text-base font-medium">Di sinilah Anda dapat berbicara dengan kelas Anda</h1>
                              <p className="text-sm">Gunakan forum untuk membagikan pengumuman, memposting tugas, dan menjawab pertanyaan siswa</p>
                            </div>
                       </div>
                       <div className="absolute bottom-2 right-2">
                          <button className="py-1 px-8 border-2 text-gray-400 text-base rounded-md cursor-pointer font-medium">Setelan</button>
                       </div>
                   </div>
                ) : (
                <div className="bg-base-100 card card-compact flex-col flex shadow-lg gap-3 w-auto h-auto min-h-40 min-w-[700px] border-2 rounded-lg py-3 px-3">
                    {posts.map((post, i) => (
                    <div key={i}>
                  <div className="flex gap-2">
                    <div className="w-12 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-base">{post.users.username}</p>
                      <span className="text-sm text-gray-400">17 Mei</span>
                    </div>
                  </div>
                  <div className="flex items-center pb-4 py-1">
                    <p className="text-base px-6 pt-3">{post.content}</p>
                  </div>
                  <div className="flex flex-col w-full items-center card-actions mt-5">
                    <hr className="w-full" />
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-2">
                        <div className="w-11 rounded-full">
                          <img
                            alt="Tailwind CSS Navbar component"
                            src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Tambahkan komentar kelas.."
                          className="py-1 px-10 w-full text-sm outline-none border-2 focus:border-4 rounded-full"
                        />
                      </div>
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="text-2xl text-gray-500 cursor-pointer"
                      />
                    </div>
                  </div>
              </div>
              ))}
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kelas;
