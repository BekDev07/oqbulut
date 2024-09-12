import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../features/users/usersApiSlice";
const SingleUser = () => {
  const { id: userId } = useParams();

  const user = useSelector((state) => selectUserById(state, userId));

  return (
    <div>
      <form>
        <FormInput type={"text"} name="username" />
      </form>
    </div>
  );
};

export default SingleUser;
