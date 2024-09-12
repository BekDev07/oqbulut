import React from "react";
import {
  selectAllUsers,
  useGetUsersQuery,
} from "../features/users/usersApiSlice";
import { HashLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { TbUserEdit } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import User from "../components/User";
const AllUsers = () => {
  const { data, isLoading, isError, error } = useGetUsersQuery();
  if (isLoading) {
    return (
      <div>
        <HashLoader />
      </div>
    );
  }
  if (error) {
    return <div>{error.data?.message}</div>;
  }

  const tableContent =
    data.ids?.length &&
    data.ids.map((userId) => <User key={userId} userId={userId} />);
  return (
    <div>
      <table className="w-full table-fixed border-collapse border-customDarkGrayish">
        <thead className="">
          <tr className="">
            <th
              scope=""
              className="border-collapse border border-customDarkGrayish"
            >
              Username
            </th>
            <th
              scope=""
              className="border-collapse border border-customDarkGrayish"
            >
              Roles
            </th>
            <th
              scope=""
              className="border-collapse border border-customDarkGrayish"
            >
              Info
            </th>
          </tr>
        </thead>
        <tbody className="">{tableContent}</tbody>
      </table>
    </div>
  );
};

export default AllUsers;
