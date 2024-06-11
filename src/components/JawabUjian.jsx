import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useCountdownTimer from "./UseCountdownTimer";

const JawabUjian = () => {
  const [jawaban, setJawaban] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [answeredPages, setAnsweredPages] = useState(new Set());
  const [pertanyaan, setPertanyaan] = useState([]);
  const [page, setPage] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5);
  const [blocks, setBlocks] = useState({});
  const [isBlocked, setIsBlocked] = useState(false); // Menyimpan status blokir pengguna

  const activityCountRef = useRef(0); // Ref untuk melacak jumlah aktivitas mencurigakan

  const getTokens = () => localStorage.getItem("token");
  const getId = () => localStorage.getItem("id");
  const remainingTime = useCountdownTimer(startTime, endTime);

  useEffect(() => {
    getDataPertanyaan();
  }, [page]);

  useEffect(() => {
    getBlocks();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (blocks === "true") {
      Swal.fire({
        icon: "error",
        title: "Terblokir...",
        text: "Tunggu guru atau pengawas sampai membuka blokir anda!",
        showConfirmButton: false
      });
    }
  }, [blocks]);

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      handleSuspiciousActivity();
    }
  };

  const handleResize = () => {
    handleSuspiciousActivity();
  };

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = '';
    handleSuspiciousActivity();
  };

  // const handleSuspiciousActivity = () => {
  //   activityCountRef.current += 1;
  //   if (activityCountRef.current >= 5) {
  //     if (!isBlocked) {
  //       setIsBlocked(true); // Menandai pengguna sebagai terblokir
  //       postBlockData(); // Memanggil fungsi untuk memblokir pengguna
  //     } else {
  //       updateBlocks(getId()); // Memanggil fungsi untuk memperbarui status blokir
  //     }
  //   }
  // };

  const postBlockData = async () => {
    try {
      const id = getId();
      const tokens = getTokens();
      await axios.post(`http://localhost:8000/api/blocks`, {
        blocks: 'true',
        user_id: getId(),
        ujian_id: id
      }, {
        headers: {
          'Authorization': `Bearer ${tokens}`
        }
      });
      Swal.fire({
        icon: "error",
        title: "Terblokir...",
        text: "Anda telah diblokir karena aktivitas yang mencurigakan!",
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Failed to post block data", error);
    }
  };

  const updateBlocks = async (id) => {
    try {
      setIsLoading(true);
      const tokens = getTokens();
      const response = await axios.put(
        `http://localhost:8000/api/blocks/${id}/update`,
        {
          blocks: 'true',
        },
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      Swal.fire({
        title: "Good job!",
        text: `${response.data.message}`,
        icon: "success"
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    } finally {
      setIsLoading(false);
      document.getElementById("my_modal_5").close();
    }
  };

  const getBlocks = async () => {
    try {
      const id = getId();
      const tokens = getTokens();
      const response = await axios.get(`http://localhost:8000/api/blocks/${id}`, {
        headers: {
          'Authorization': `Bearer ${tokens}`
        }
      })
      setBlocks(response.data.blocks)
      console.log(response.data.blocks);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  }

  const getDataPertanyaan = async () => {
    try {
      setIsLoading(true);
      const tokens = getTokens();
      const response = await axios.get(
        `http://localhost:8000/api/pertanyaan/ujian/${id}?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      setPertanyaan(response.data.pertanyaan);

      const data = response.data.pertanyaan.data;

      if (data.length > 0 && data[0].ujian) {
        const { ujian } = data[0];

        const startTimeString = `${
          ujian.waktu_pelaksanaan
        }T${ujian.dimulai.replace(".", ":")}:00`;
        const endTimeString = `${
          ujian.waktu_pelaksanaan
        }T${ujian.selesai.replace(".", ":")}:00`;

        setStartTime(new Date(startTimeString));
        setEndTime(new Date(endTimeString));
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleJawabanChange = (ujianId, value) => {
    setJawaban({
      ...jawaban,
      [ujianId]: value,
    });

    setAnsweredPages((prev) => {
      const newSet = new Set(prev);
      newSet.add(page);
      return newSet;
    });
  };

  const handleSubmitJawaban = async () => {
    try {
      setIsLoading(true);
      const tokens = getTokens();
      const jawabanArray = Object.keys(jawaban).map((ujianId) => ({
        pertanyaan_id: ujianId,
        jawaban: jawaban[ujianId],
      }));

      console.log(jawabanArray);

      await Promise.all(
        jawabanArray.map(async (jwb) => {
          await axios.post("http://localhost:8000/api/jawaban", jwb, {
            headers: {
              Authorization: `Bearer ${tokens}`,
            },
          });
        })
      );

      Swal.fire({
        title: "Good job!",
        text: "Jawaban berhasil disubmit",
        icon: "success",
      });
      navigate("/end");
    } catch (error) {
      if(error.response) {
        console.log(error.response.data);
      };
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const openModal = () => {
    setTimeLeft(5); // Reset countdown
    setModalOpen(true);
    document.getElementById("my_modal_1").showModal();
  };

  const closeModal = () => {
    setModalOpen(false);
    document.getElementById("my_modal_1").close();
  };
  return (
    <div className="px-6 py-8 ">
      {pertanyaan.data &&
        pertanyaan.data.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-8 px-8">
            <div className="max-w-full w-[100%] min-h-56 relative bg-white border-2 rounded-md h-full shadow-md px-8 py-6">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h1 className="font-medium text-xl">Clasroom</h1>
                  <p className="font-medium text-base text-[#666666]">
                    Soal No. {page}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="py-1 px-3 bg-sky-400 text-white rounded-md">
                    Sisa Waktu
                  </div>
                  <p className="mt-2 text-xl">{formatTime(remainingTime)}</p>
                </div>
              </div>
              <hr className="w-full my-3" />
              <div className="absolute left-5 bottom-4">
                <h2 className="font-medium text-base">Selamat Mengerjakan!</h2>
              </div>
            </div>
            <div className="flex justify-center items-stretch gap-8 h-full w-[100%]">
              {/* Sesi Soal */}
              <div className="flex flex-col flex-1">
                <div
                  className={` ${
                    isLoading
                      ? "skeleton"
                      : "w-[100%] min-h-56 relative bg-white border-2 rounded-md h-auto shadow-md px-8 py-6 flex-1"
                  }`}
                >
                  {isLoading ? (
                    <div className="skeleton w-full h-6 mb-4"></div>
                  ) : (
                    <p className="text-base select-none">{item.pertanyaan}</p>
                  )}
                  <div className="flex flex-col mt-6 gap-4">
                    {isLoading ? (
                      <>
                        <div className="skeleton w-full h-6 mb-2"></div>
                        <div className="skeleton w-full h-6 mb-2"></div>
                        <div className="skeleton w-full h-6 mb-2"></div>
                      </>
                    ) : (
                      item.pilihan_jawaban.map((pilihan, idx) => (
                        <div className="flex items-center gap-2" key={idx}>
                          <input
                            type="radio"
                            name={`radio-${item.id}`}
                            className="radio radio-success"
                            value={pilihan.teks_pilihan}
                            onChange={() =>
                              handleJawabanChange(item.id, pilihan.teks_pilihan)
                            }
                            checked={jawaban[item.id] === pilihan.teks_pilihan}
                          />
                          <p className="select-none">{pilihan.teks_pilihan}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                {/* Pagination */}
                <div className="flex mt-5 mb-2">
                  <div className="min-w-full w-auto h-auto min-h-24 bg-white rounded-md shadow-md border px-6 py-2">
                    <button
                      onClick={() => setPage(page > 1 ? page - 1 : 1)}
                      className="bg-blue-700 text-white rounded-md py-2 px-6 mr-3 mt-3"
                    >
                      Sebelumnya
                    </button>
                    <button className="bg-orange-400 text-white rounded-md py-2 px-6 mt-3">
                      Ragu Ragu
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      className="bg-blue-700 text-white rounded-md py-2 px-6 ml-3 mt-3"
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>
                {/* Sesi Kumpulkan Jawaban */}
                {page === pertanyaan.total ? (
                  <>
                    <div className="my-2">
                      <div className="min-w-full w-auto h-auto min-h-5 bg-white rounded-md shadow-md border px-6 py-4 text-center">
                        <button
                          className="w-full h-12 bg-red-500 text-white rounded-md"
                          onClick={openModal}
                        >
                          Kumpulkan Ujian
                        </button>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              {/* Sesi Jawab */}
              <div className="min-w-5 h-auto min-h-5 bg-white rounded-md shadow-md border px-3 py-2 flex flex-col">
                <p className="text-xl mb-4">Daftar Soal</p>
                <div className="flex flex-wrap items-center gap-2">
                  {pertanyaan.data && (
                    <>
                      {[...Array(pertanyaan.total).keys()].map((num) => (
                        <button
                          key={num}
                          className={`${
                            num + 1 === page
                              ? "bg-blue-600 text-white"
                              : answeredPages.has(num + 1)
                              ? "bg-green-500 text-white"
                              : "bg-white text-black"
                          } border-2 border-black py-2 px-8 rounded-sm`}
                          onClick={() => setPage(num + 1)}
                        >
                          {num + 1}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h1 className="font-bold text-lg">Kumpulkan Ujian!</h1>
          <hr className="w-full my-4" />
          <div className="flex justify-center items-center">
            <p className="text-center font-medium my-6">
              Apakah anda yakin ingin mengumpulkan jawaban anda?
            </p>
          </div>
          <div className="modal-action flex flex-col items-center w-full">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="border-2 border-orange-400 bg-white rounded-md py-2 text-black w-full mb-2">
                Saya ingin mengecek ulang
              </button>
              <button
                disabled={timeLeft > 0}
                onClick={handleSubmitJawaban}
                className={`bg-orange-400 text-white rounded-md w-full py-2 ${
                  timeLeft > 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {timeLeft > 0 ? `Tunggu selama (${timeLeft})` : "Kumpulkan ujian anda"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default JawabUjian;
