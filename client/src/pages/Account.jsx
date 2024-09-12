import React from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../features/users/usersApiSlice";
import FormInput from "../components/inputs/FormInput";
import { selectCurrentToken } from "../features/auth/authSlice";
const Account = () => {
  const token = useSelector(selectCurrentToken);
  const { userId } = jwtDecode(token);

  const { data, isLoading, isError, error } = useGetUserByIdQuery({ userId });
  console.log(data);
  const handleChange = () => {
    console.log("salom");
  };
  return (
    <div>
      <form>
        <div className="grid grid-cols-2 gap-2">
          <FormInput
            type={"text"}
            name="username"
            value={data?.username || ""}
            handleChange={handleChange}
          />
          <FormInput
            type={"text"}
            name="roles"
            value={data?.roles.join(",") || ""}
            handleChange={handleChange}
          />
        </div>
        <div>Favourites</div>
        <div>owned Restaurants</div>
        <div>profile Images</div>
        <div>reservations</div>
      </form>
    </div>
  );
};

export default Account;
