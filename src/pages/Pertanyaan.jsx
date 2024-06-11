import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

const Pertanyaan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pertanyaan, setPertanyaan] = useState([]);
  const [jawaban, setJawaban] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getTokens = () => localStorage.getItem("token");

  useEffect(() => {
    getDataPertanyaan();
  }, []);

  const getDataPertanyaan = async () => {
    try {
      const tokens = getTokens();
      const response = await axios.get(
        `http://localhost:8000/api/pertanyaan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      setPertanyaan(response.data.pertanyaan);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

    const tugasPertanyaan = pertanyaan.length > 0 ? pertanyaan[0].tugas : null;

    const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleJawabanChange = (pertanyaanId, value) => {
    setJawaban({
      ...jawaban,
      [pertanyaanId]: value,
    });
  };

  const handleSubmitJawaban = async () => {
    try {
      setIsLoading(true)
      const tokens = getTokens();
      const jawabanArray = Object.keys(jawaban).map((pertanyaanId) => ({
        pertanyaan_id: pertanyaanId,
        jawaban: jawaban[pertanyaanId],
      }));

      await Promise.all(
        jawabanArray.map(async (jwb) => {
          await axios.post(
            "http://localhost:8000/api/jawaban",
            jwb,
            {
              headers: {
                Authorization: `Bearer ${tokens}`,
              },
            }
          );
        })
      );

      Swal.fire({
        title: "Good job!",
        text: "Jawaban berhasil disubmit",
        icon: "success"
      });
      setTimeout(() => {
        navigate('/end')
      }, 3000)
    } catch (error) {
      if(error.response) {
        console.log(error.response.data);
        Swal.fire({
          icon: "error",
          title: "Errors...",
          text: "Silahkan coba lagi!",
        });
      }
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center py-20 px-36">
      {tugasPertanyaan && (
        <div className="mb-5 bg-white relative border-2 h-40 rounded-md w-[500px] min-w-[500px] max-w-[750px] shadow-md py-5 px-6 border-t-[10px] border-t-indigo-700 border-l-8 border-l-sky-500">
          <h1 className="text-xl font-medium">{tugasPertanyaan.judul}</h1>
          <hr className="w-full mb-3" />
          <p className="mt-8">{tugasPertanyaan.description}</p>
          <hr />
          <div className="absolute pt-3 pb-6 right-4">
            <p className="font-medium text-sm">Jatuh Tempo: {formatDate(tugasPertanyaan.jatuh_tempo)}</p>
          </div>
        </div>
      )}
      {pertanyaan.map((quest, i) => (
        <div key={quest.id} className="bg-white border-2 rounded-md w-[500px] min-w-[500px] max-w-[750px] shadow-md py-5 px-6">
          <h1 className="text-base font-medium">
            {i + 1}. {quest.pertanyaan}
          </h1>
          <div className="flex flex-col py-2 gap-2">
            <p>Jawab: </p>
            {quest.jenis_pertanyaan === "Essay" ? (
              <textarea
                className="textarea textarea-bordered"
                placeholder="Jawab"
                onChange={(e) => handleJawabanChange(quest.id, e.target.value)}
              ></textarea>
            ) : (
              quest.pilihan_jawaban.map((jawabanPilihan, j) => (
                <div key={j} className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name={`pertanyaan-${quest.id}`}
                    className="radio"
                    value={jawabanPilihan.teks_pilihan}
                    onChange={(e) => handleJawabanChange(quest.id, e.target.value)}
                  />
                  <p>{jawabanPilihan.teks_pilihan}</p>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
      <div className="bg-white border-2 rounded-md w-[500px] min-w-[500px] max-w-[750px] shadow-md py-5 px-6">
        <button
          className="py-2 px-6 text-white rounded-md bg-sky-400 hover:bg-sky-500 cursor-pointer w-full"
          onClick={handleSubmitJawaban}
          disabled={isLoading}
        >
          {isLoading ? <span className="loading loading-spinner loading-sm bg-black"></span> : 'Jawab'}
        </button>
      </div>
    </div>
  );
};

export default Pertanyaan;
