import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotif, setIsNotif] = useState(false);
  const [classType, setClassType] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.users.tokens);
      const role = response.data.users.role;
      localStorage.setItem("role", role);
      const id = response.data.users.id;
      localStorage.setItem("id", id)
      setIsNotif(true);
      setClassType("alert-success");
      setMsg(response.data.message);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setIsNotif(true);
        setClassType("alert-error");
        setMsg("Terjadi kesalahan, silahkan coba lagi")
        console.log(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnter = (event) => {
    if(event.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div>
      {isNotif && (
        <div role="alert" className={`alert ${classType}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{msg}</span>
        </div>
      )}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-[650px] max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h1 className="font-bold text-2xl text-center">Login</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="input input-bordered"
                  required
                  onKeyPress={handleEnter}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onKeyPress={handleEnter}
                />
              </div>
              <div className="form-control mt-6">
                <button
                  disabled={isLoading}
                  onClick={handleLogin}
                  className="btn bg-sky-500 hover:bg-sky-600 text-white"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
