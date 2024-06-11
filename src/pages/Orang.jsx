import React, { useEffect, useState } from "react";
import NavbarClass from "../components/NavbarClass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";

const Orang = () => {
  const [orang, setOrang] = useState([]);
  const { id } = useParams();

  const getTokens = () => localStorage.getItem('token');

  useEffect(() => {
    getOrangClass();
  }, []);

  const getOrangClass = async () => {
    try {
      const tokens = getTokens();
      const response = await axios.get(`http://localhost:8000/api/class-join/${id}`, {
        headers: {
          'Authorization': `Bearer ${tokens}`
        }
      });
      setOrang(response.data.class);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const firstClass = orang.length > 0 ? orang[0] : null;

  return (
    <div>
      <NavbarClass />
      <div className="flex justify-center items-center py-40 px-20">
        {firstClass ? (
          <div className="flex flex-col w-full max-w-[720px]">
            {/* Pengajar */}
            <div className="flex justify-between items-center w-full">
              <div>
                <h1 className="leading-none text-3xl font-normal">Pengajar</h1>
              </div>
              <div className="btn btn-ghost btn-circle">
                <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
              </div>
            </div>
            <hr className="w-full border-b-2 border-black" />
            <div className="flex flex-col px-6 py-3 gap-3">
              {firstClass.kelas?.guru && (
                <div className="flex items-center gap-3">
                  <div className="w-11 rounded-full">
                    <img
                      alt="Pengajar avatar"
                      src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                    />
                  </div>
                  <p className="font-medium">{firstClass.kelas.guru.username}</p>
                </div>
              )}
            </div>

            {/* Siswa */}
            <div className="mt-20">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h1 className="leading-none text-3xl font-normal">Siswa</h1>
                </div>
                <div className="btn btn-ghost btn-circle">
                  <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
                </div>
              </div>
              <hr className="w-full border-b-2 border-black" />
              <div className="flex flex-col px-6 py-3 gap-3">
                {orang.map((classJoin, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <div className="w-11 rounded-full">
                      <img
                        alt="Siswa avatar"
                        src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                      />
                    </div>
                    <p className="font-medium">{classJoin.siswa.username}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
             Tidak Ada Data
          </div>
        )}
      </div>
    </div>
  );
};

export default Orang;
