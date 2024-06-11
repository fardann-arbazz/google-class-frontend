import React, { useEffect, useState } from "react";
import imgRead from "../assets/img_read.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faRetweet,
  faPaperPlane,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import bookImg from "../assets/book.png";
import axios from "axios";
import NavbarClass from "../components/NavbarClass";

const Kelas = () => {
  const { id } = useParams();
  const [kelas, setKelas] = useState({});
  const [isCardClicked, setIsCardClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [contentId, setContentId] = useState({ content: "" });
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [isNotif, setIsNotif] = useState(false);
  const [msg, setMsg] = useState("");
  const [comments, setComments] = useState({});
  const [contentComment, setContentComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [idUsers, setIdUsers] = useState(0);
  const [role, setRole] = useState("");

  useEffect(() => {
    const userId = getIdUsers();
    setIdUsers(parseInt(userId, 10));
    getDataKelasById();
    getDataPosts();
    setRole(getRole());
  }, []);

  const getTokens = () => localStorage.getItem("token");

  const getIdUsers = () => localStorage.getItem("id");

  const getRole = () => localStorage.getItem("role");

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
      console.log(error.response?.data.message);
    }
  };

  const getDataPosts = async () => {
    try {
      const tokens = getTokens();
      const response = await axios.get(
        `http://localhost:8000/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      const postsData = response.data.posts;
      setPosts(postsData);

      postsData.forEach((post) => {
        getDataComment(post.id);
      });
    } catch (error) {
      console.log(error.response?.data.message);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const tokens = getTokens();
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/posts",
        {
          content,
          kelas_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      setContent("");
      getDataPosts();
    } catch (error) {
      console.log(error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => setIsCardClicked(true);

  const handleFalse = () => setIsCardClicked(false);

  const getDataPostsById = async (postId) => {
    try {
      const tokens = getTokens();
      const response = await axios.get(
        `http://localhost:8000/api/posts/${postId}/show`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      setContentId(response.data.posts);
      setEditPostId(postId);
    } catch (error) {
      console.log(error.response?.data.message);
    }
  };

  const handleUpdatePost = async () => {
    try {
      setIsLoading(true);
      const tokens = getTokens();
      const response = await axios.post(
        `http://localhost:8000/api/posts/${editPostId}`,
        {
          content: contentId.content,
          kelas_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      setIsNotif(true);
      setMsg(response.data.message);
      getDataPosts();
      setTimeout(() => setIsNotif(false), 5000);
    } catch (error) {
      console.log(error.response?.data.message);
    } finally {
      setIsLoading(false);
      setEditPostId(null);
    }
  };

  const getDataComment = async (postId) => {
    try {
      const tokens = getTokens();
      const response = await axios.get(
        `http://localhost:8000/api/comment/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response.data.comments,
      }));
      setCommentCount(response.data.totalComment);
    } catch (error) {
      console.log(error.response?.data.message);
    }
  };

  const handleComment = async (postId) => {
    try {
      setIsLoading(true);
      const tokens = getTokens();
      const response = await axios.post(
        "http://localhost:8000/api/comment",
        {
          content: contentComment,
          post_id: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      setContentComment("");
      getDataComment(postId);
    } catch (error) {
      console.log(error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isNotif && (
        <div className="toast toast-start z-30 px-20">
          <div className="bg-black py-3 px-8 w-72 text-center text-white rounded-lg z-50">
            <span>{msg}</span>
          </div>
        </div>
      )}
      <div className="w-full mt-16">
       <NavbarClass />

        {kelas && (
          <div className="flex flex-col justify-center items-center py-6 mt-28">
            <div className="relative">
              <img src={imgRead} alt="background" className="rounded-md" />
              <p className="text-gray-100 text-3xl absolute font-medium bottom-5 left-4">
                {kelas.nama_kelas}
              </p>
            </div>
            <div className="flex mt-6 gap-8">
              <div className="flex flex-col gap-4">
                {role === "Guru" ? (
                 <div>
                  <div className="card mb-4 w-56 h-26 bg-base-100 border-2">
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
                ) : (
                <div>
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
                )}
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
                        disabled={!content || isLoading}
                        onClick={handlePost}
                        className={`py-2 px-10 ${
                          !content
                            ? "bg-gray-300 text-gray-500"
                            : "bg-black text-white"
                        } font-medium text-sm rounded-md`}
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          "Posting"
                        )}
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
                        <img
                          src={bookImg}
                          alt="BOOK IMAGESSS"
                          className=" w-32 h-28"
                        />
                        <div className="flex flex-col">
                          <h1 className="text-base font-medium">
                            Di sinilah Anda dapat berbicara dengan kelas Anda
                          </h1>
                          <p className="text-sm">
                            Gunakan forum untuk membagikan pengumuman,
                            memposting tugas, dan menjawab pertanyaan siswa
                          </p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <button className="py-1 px-8 border-2 text-gray-400 text-base rounded-md cursor-pointer font-medium">
                          Setelan
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {posts.map((post, i) => (
                        <div
                          key={i}
                          className="bg-base-100 card card-compact flex-col flex shadow-lg mb-6 w-auto h-auto min-h-40 min-w-[700px] border-2 rounded-lg py-3 px-3"
                        >
                          <div>
                            <div className="flex gap-2 justify-between px-3">
                              <div className="flex gap-2">
                                <div className="w-12 rounded-full">
                                  <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <p className="font-medium text-base">
                                    {post.users.username}
                                  </p>
                                  <span className="text-sm text-gray-400">
                                    {new Date(post.created_at).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle flex justify-center items-center dropdown dropdown-end"
                              >
                                <FontAwesomeIcon
                                  icon={faEllipsisVertical}
                                  className="text-black text-base"
                                />
                                <ul
                                  tabIndex={0}
                                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                  { idUsers === post.user_id ? (
                                    <>
                                      <li>
                                        <button
                                          onClick={() =>
                                            getDataPostsById(post.id)
                                          }
                                        >
                                          Edit
                                        </button>
                                      </li>
                                      <li>
                                        <button>Delete</button>
                                      </li>
                                    </>
                                  ) : (
                                    <>
                                      <li>
                                        <p>Laporkan</p>
                                      </li>
                                    </>
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="flex items-center pb-4 py-1">
                              <p className="text-base px-6 pt-3">
                                {post.content}
                              </p>
                            </div>
                            <div className="flex flex-col w-full card-actions mt-3">
                              <hr className="w-full" />
                              <div className="flex justify-start items-start flex-col gap-2 my-2 px-5">
                                {comments[post.id] &&
                                  comments[post.id].map((comment) => (
                                    <div key={comment.id}>
                                      <div className="flex gap-2 mb-5 items-center text-gray-500 font-medium">
                                        <FontAwesomeIcon
                                          icon={faUsers}
                                          className="text-xl"
                                        />
                                        <p className="text-sm">
                                          {commentCount} Komentar kelas
                                        </p>
                                      </div>
                                      <div className="flex gap-2 items-start">
                                        <div className="w-12 rounded-full">
                                          <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                                          />
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="font-medium text-base">
                                            {comment.users.username}
                                          </span>
                                          <span className="text-gray-400 text-sm">
                                            {new Date(
                                              comment.created_at
                                            ).toLocaleString()}
                                          </span>
                                          <p className="text-sm mt-2 mb-0">
                                            {comment.content}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                              <div className="flex items-center gap-5 w-full px-6">
                                <div className="flex items-center gap-2 w-full">
                                  <div className="w-11 rounded-full">
                                    <img
                                      alt="Tailwind CSS Navbar component"
                                      src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Tambahkan komentar kelas.."
                                    value={contentComment}
                                    onChange={(e) =>
                                      setContentComment(e.target.value)
                                    }
                                    className="py-1 w-full text-sm outline-none border-2 focus:border-4 rounded-full px-4"
                                  />
                                </div>
                                <FontAwesomeIcon
                                  icon={faPaperPlane}
                                  className="text-2xl text-gray-500 cursor-pointer"
                                  onClick={() => handleComment(post.id)}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Modal Edit */}
                          <dialog id="my_modal_4" className="modal">
                            <div className="modal-box">
                              <form method="dialog">
                                <button className="btn btn-md text-base btn-circle btn-ghost absolute right-2 top-2">
                                  ✕
                                </button>
                              </form>
                              <h3 className="font-bold text-lg border-b-2 mb-3">
                                Edit Posts
                              </h3>
                              <div className="mt-4">
                                <textarea
                                  className="textarea textarea-bordered w-full text-base"
                                  placeholder="Umumkan sesuatu kepada kelas anda"
                                  rows="4"
                                  value={contentId.content}
                                  onChange={(e) =>
                                    setContentId({
                                      ...contentId,
                                      content: e.target.value,
                                    })
                                  }
                                ></textarea>
                                <div className="flex justify-end mt-4 gap-2">
                                  <form method="dialog">
                                    <button
                                      disabled={isLoading}
                                      onClick={handleUpdatePost}
                                      className={`py-2 px-10 bg-black text-white font-medium text-sm rounded-md`}
                                    >
                                      {isLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                      ) : (
                                        "Update"
                                      )}
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </dialog>
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
    </div>
  );
};

export default Kelas;
