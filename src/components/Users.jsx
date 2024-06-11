import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getTokens = () => localStorage.getItem("token");

  const getUsers = async () => {
    try {
      const tokens = getTokens();
      const response = await axios.get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      });
      setUser(response.data.users);
      console.log(response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  const handleUsers = async () => {
    if (!username || !email || !password || !role) {
      alert("Please fill in all fields");
      return;
    }
    try {
      setIsLoading(true);
      const tokens = getTokens();
      const response = await axios.post(
        "http://localhost:8000/api/register",
        {
          username,
          email,
          password,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      getUsers();
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="p-20">
        <div className="bg-white border-2 shadow-md rounded-md w-auto h-auto py-2 px-4 relative">
          <div className="flex justify-between items-center px-4">
            <h1 className="font-medium mt-4 mb-2 text-xl">Users</h1>
            <div>
              <button
                onClick={() =>
                  document.getElementById("modal_users").showModal()
                }
                className="py-2 px-4 bg-black text-white rounded-md font-medium"
              >
                Tambah
              </button>
            </div>
          </div>
          {user.length !== 0 ? (
            <div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.map((users, i) => (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{users.username}</td>
                        <td>{users.email}</td>
                        <td>{users.role}</td>
                        <td className="gap-2">
                          <button className="w-24 py-2 bg-red-600 text-white font-medium rounded-md">
                            Delete
                          </button>
                          <button className="w-24 py-2 bg-orange-600 text-white font-medium rounded-md ml-2">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h1>Tidak Ada Users...</h1>
            </div>
          )}

          {/* Modal add users */}
          <dialog id="modal_users" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-md text-xl btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Tambah Users</h3>
              <div className="mt-3">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Username</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Password</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Password"
                    className="input input-bordered"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Role</span>
                  </div>
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value="">Select a role</option>
                    <option value="Admin">Admin</option>
                    <option value="Guru">Guru</option>
                    <option value="Siswa">Siswa</option>
                  </select>
                </label>

                <div className="flex justify-end items-end mt-6">
                  <button
                    onClick={handleUsers}
                    disabled={isLoading}
                    className="btn px-6 bg-black text-white hover:bg-black w-full rounded-lg"
                  >
                    {isLoading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Users;
