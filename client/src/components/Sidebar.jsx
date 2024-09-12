import React, { useEffect } from "react";
import { IoExitOutline } from "react-icons/io5";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
const links = [
  { title: "Home" },
  { title: "About", sublinks: ["Team", "History", "Contact"] },
  { title: "Services", sublinks: ["Service 1", "Service 2", "Service 3"] },
  { title: "Contact Us" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

  const Sublink = ({ title }) => {
    return <li className="ml-6">{title}</li>;
  };

  // Define a component for links
  const Link = ({ title, sublinks }) => {
    return (
      <li className="py-2">
        {title}
        {sublinks && (
          <ul>
            {sublinks.map((sublink, index) => (
              <Sublink key={index} title={sublink} />
            ))}
          </ul>
        )}
      </li>
    );
  };
  return (
    <div className="sticky top-0 hidden h-screen flex-col bg-customBlue text-white lg:flex lg:w-1/5">
      <div className="flex h-16 items-center justify-center border-b text-xl font-bold">
        Logo
      </div>
      <div className="p-5">
        <ul className="p-4">
          {links.map((link, index) => (
            <Link key={index} title={link.title} sublinks={link.sublinks} />
          ))}
        </ul>
      </div>
      <div
        className="mt-auto flex cursor-pointer items-center p-5"
        onClick={sendLogout}
      >
        <IoExitOutline className="mr-4 text-2xl font-bold text-white" />
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
