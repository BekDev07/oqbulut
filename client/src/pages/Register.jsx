import React, { useEffect, useRef, useState } from "react";
import darkBg1 from "../assets/images/wp9153536.webp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { FaRegUserCircle } from "react-icons/fa";
import usePersist from "../hooks/usePersist";
import editProfileIcon from "../assets/images/noun-edit-profile.svg";
const Register = () => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const errRef = useRef();
  const usernameRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  async function handleRegisterFormSubmit(e) {
    e.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (err) {
      console.log(err);
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">Register</h2>

        {/* {error && (
          <p className="mb-4 text-red-500">
            Error: {error?.data?.message || "Registration failed"}
          </p>
        )} */}
        {/* {isSuccess && (
          <p className="mb-4 text-green-500">Registration successful!</p>
        )} */}

        <form onSubmit={handleRegisterFormSubmit} encType="multipart/form-data">
          {/* Image Upload Field */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="image">
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
            />
            <img
              src={image || editProfileIcon}
              className=""
              alt="profile image"
            />
          </div>

          {/* Username Field */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
              ref={usernameRef}
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full rounded-lg border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
