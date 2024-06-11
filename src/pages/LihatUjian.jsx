import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const LihatUjian = () => {
  const [data, setData] = useState([]);
  const [blocks, setBlocks] = useState("false");
  const [isLoading, setIsLoading] = useState(false);

  const getId = () => localStorage.getItem("id");
  const getTokens = () => localStorage.getItem("token");

  useEffect(() => {
    getData();
  }, [blocks]);

  const getData = async () => {
    try {
      const tokens = getTokens();
      const id = getId();
      const response = await axios.get(
        `http://localhost:8000/api/blocks/guru/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      setData(response.data.blocks);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const updateBlocks = async (id) => {
    try {
      setIsLoading(true);
      const tokens = getTokens();
      const response = await axios.put(
        `http://localhost:8000/api/blocks/${id}/update`,
        {
          blocks,
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
      getData();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    } finally {
      setIsLoading(false);
      document.getElementById("my_modal_5").close()
    }
  };

  return (
    <div className="p-20">
      <div className="bg-white min-w-72 rounded-md shadow-md min-h-40 w-auto h-auto border">
        <div className="py-3 px-3">
          <h1 className="font-medium text-xl">Pemantauan Ujian</h1>
        </div>
        <hr className="mt-2 border-2 w-full" />
        {data.length !== 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Siswa</th>
                  <th>Nama Ujian</th>
                  <th>Kelas</th>
                  <th>Mata Pelajaran</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  {data.map((items, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{items.users.username}</td>
                      <td>{items.ujian.nama_ujian}</td>
                      <td>{items.ujian.kelas}</td>
                      <td>{items.ujian.mapel}</td>
                      <td>
                        <button
                          onClick={() =>
                            document.getElementById("my_modal_5").showModal()
                          }
                          className="py-2 px-4 bg-orange-500 rounded-md text-white"
                        >
                          Buka Block
                        </button>
                      </td>


                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <h3 className="font-medium text-lg text-orange-500">Validasi Blocks</h3>
                          <hr className="w-full border-2 my-3" />
                         <p className="text-center text-base font-medium mt-6">Apakah anda yakin ingin membuka blocks {items.users.username}?</p>
                          <div className="modal-action justify-center">
                            <form method="dialog" className="w-full gap-2">
                              <button className="w-full btn bg-transparent hover:bg-transparent hover:border-orange-400 border-2 border-orange-500 text-black">Close</button>
                              <button disabled={isLoading} onClick={() => updateBlocks(items.users.id)} className="w-full btn bg-orange-500 text-white hover:bg-orange-400 mt-2">{isLoading ? 'Loading...' : 'Submit'}</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h1 className="text-center font-medium text-xl mt-8">
              Belum Ada Yang Terblokir
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default LihatUjian;
