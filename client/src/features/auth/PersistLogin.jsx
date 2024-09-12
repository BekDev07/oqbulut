import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        try {
          // const response =
          await refresh().unwrap();
          // const {accessToken } = response.data
          setTrueSuccess(true); // refresh endpointda setcredentials o'z ishini bajarib bo'lgunicha useRefreshMutationdagi isSuccess true bo'lib qolishi mn. shuni oldini olish uchun alohida state e'lon qilib foydalaniladi.
        } catch (error) {
          console.log(error);
        }
      };
      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => {
      effectRan.current = true;
    };

    //eslint-disable-next-line
  }, [token, persist, refresh]);

  let content;

  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("Loading...");
    content = <p>Loading...</p>;
  } else if (isError) {
    //persist: yes, token: no
    console.log("error");
    content = (
      <p className="text-red-500">
        {error?.data?.message || "An error occurred. "}
        <Link to={"/login"}>{` `} Please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
