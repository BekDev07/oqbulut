import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const Navigation = () => {
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const token = useSelector(selectCurrentToken);
  const decodedToken = jwtDecode(token);

  const { roles, userId } = decodedToken;

  return (
    <div className="flex justify-between p-4 shadow-md">
      <div className="uppercase">logo</div>
      <div>
        <ul className="flex gap-2">
          <li>
            <Link to={"/"}>Asosiy</Link>
          </li>
          <li>
            <Link to={"/restaurants"}>Restoranlar</Link>
          </li>
          <li>
            <Link to={"/account"}>Account</Link>
          </li>
          {roles.includes("admin") && (
            <li>
              <Link to={"/users"}>Foydalanuvchilar</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="capitalize">
        <button onClick={sendLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navigation;
