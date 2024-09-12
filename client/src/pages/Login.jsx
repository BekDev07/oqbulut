import React, { useEffect, useRef, useState } from "react";
import darkBg1 from "../assets/images/wp9153536.webp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

import usePersist from "../hooks/usePersist";

const Login = () => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const errRef = useRef();
  const usernameRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
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

  // useEffect(() => {
  //   const container = containerRef.current;
  //   const circle = circleRef.current;
  //   const circleSize = 48; // Size of the circle (width and height)
  //   let x = Math.random() * (container.clientWidth - circleSize);
  //   let y = Math.random() * (container.clientHeight - circleSize);
  //   let vx = (Math.random() - 0.5) * 4; // Increased initial velocity in x-direction
  //   let vy = (Math.random() - 0.5) * 4; // Increased initial velocity in y-direction

  //   const update = () => {
  //     x += vx;
  //     y += vy;

  //     // Check for collision with container boundaries and reverse direction if needed
  //     if (x <= 0 || x >= container.clientWidth - circleSize) vx *= -1;
  //     if (y <= 0 || y >= container.clientHeight - circleSize) vy *= -1;

  //     // Ensure the circle stays fully inside the container
  //     x = Math.max(0, Math.min(x, container.clientWidth - circleSize));
  //     y = Math.max(0, Math.min(y, container.clientHeight - circleSize));

  //     // Apply the new position to the circle
  //     circle.style.transform = `translate(${x - circleSize / 2}px, ${y - circleSize / 4}px)`;

  //     // Schedule the next update
  //     requestAnimationFrame(update);
  //   };

  //   update();
  // }, []);

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  async function handleLoginFormSubmit(e) {
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
    <div
      className="flex h-screen w-screen items-center justify-center overflow-hidden"
      // style={{ backgroundImage: `url(${darkBg1})` }}
    >
      <div className="flex h-2/3 w-2/3 items-center justify-center overflow-hidden rounded bg-gradient-to-r from-cyan-500 to-customDarkGrayish text-white transition hover:bg-gradient-to-l lg:h-2/3 lg:w-2/5">
        <form
          ref={containerRef}
          className="login-form relative h-5/6 w-11/12 overflow-auto rounded bg-white p-8 pt-4 text-black"
          onSubmit={handleLoginFormSubmit}
        >
          <h1 className="bg-gradient-to-b from-customBlueLight to-customDarkGrayish bg-clip-text text-center text-2xl uppercase text-transparent">
            Tizimga Kirish
          </h1>
          <p
            ref={errRef}
            className={errMsg ? "mb-2 inline-block p-1 text-red-500" : "hidden"}
            aria-live="assertive"
            tabIndex="-1"
          >
            {errMsg}
          </p>
          <label
            htmlFor="username"
            className="flex flex-col text-customDarkGrayish"
          >
            username
            <input
              type="text"
              ref={usernameRef}
              className="rounded border border-customBlue p-2 text-customBrown outline-customBlue autofill:bg-yellow-200 focus:text-customDarkGrayish focus:ring-2 focus:ring-customBlueLight"
              id="username"
              required
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
            />
          </label>
          <label className="mt-4 flex flex-col">
            password
            <input
              type="password"
              className="rounded border border-customBlue p-2 text-customBrown outline-customBlue focus:text-customDarkGrayish focus:ring-2 focus:ring-customBlueLight"
              onChange={handlePwdInput}
              value={password}
              required
              autoComplete="off"
            />
          </label>
          <div className="mt-4 flex flex-col md:flex-row md:justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-6 w-6 outline-customBlue checked:bg-customBlue checked:ring-2 checked:ring-customBlueLight"
                value={persist}
                checked={persist}
                onChange={handleToggle}
              />
              parolni saqlash
            </label>
            <div className="mt-4 text-customBlue md:mt-0">
              <Link
                to={"/reset-password"}
                className="custom-link text-customBlue outline-customBlue"
              >
                parolni unutdim
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center rounded bg-customBlue p-2 text-white outline-customCyan hover:bg-sky-700"
          >
            Kirishni Tasdiqlash
          </button>
          <p className="mt-2">
            sizda akkount yo'qmi?{" "}
            <Link to={"/register"} className="text-customBlue underline">
              Ro'yxatdan o'tish
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
