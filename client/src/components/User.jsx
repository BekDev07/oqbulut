import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../features/users/usersApiSlice";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();
  const handleEdit = () => {
    // navigate(`/users/${userId}`);
  };

  if (user) {
    return (
      <tr className="">
        <td className="border-collapse border border-customDarkGrayish">
          {user.username}
        </td>
        <td className="border-collapse border border-customDarkGrayish">
          {user.roles.join(", ")}
        </td>
        <td className="border-collapse border border-customDarkGrayish">
          <div className="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              name="isUserActive"
              checked={user.active ? true : false}
              readOnly
            />
            <button onClick={handleEdit}>
              <FaUserEdit size={22} />
            </button>
          </div>
        </td>
      </tr>
    );
  } else return null;
};

export default User;
