import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { PiChatTextBold, PiGearSixBold } from "react-icons/pi";
import DigitalClock from "./DigitalClock";
import useAuth from "../hooks/useAuth";
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { username, status } = useAuth();
  return (
    <div className="sticky top-0 z-10 flex h-16 w-full min-w-full items-center justify-between border-b bg-white px-7 md:px-12">
      <div className="flex w-2/5 items-center">
        <MdOutlineMenu className="inline text-2xl text-customBlue md:hidden" />
        <input
          className="ml-3 w-11/12 rounded border-2 border-customBlue p-2 outline-customBlueLight"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="hidden h-16 items-center justify-center md:flex">
        <DigitalClock />
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <span className="relative">
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border bg-customBlue text-white">
              2
            </span>
            <MdNotificationsNone className="text-3xl text-customDarkGrayish" />
          </span>
          <span className="relative">
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border bg-customBlue text-white">
              3
            </span>
            <PiChatTextBold className="ml-5 text-3xl text-customDarkGrayish" />
          </span>
        </div>
        <div className="ml-5 hidden items-center md:flex">
          <div>
            <div>{username}</div>
            <div>{status}</div>
          </div>
          <div className="ml-5 flex h-12 w-12 items-center justify-center rounded-full border">
            image
          </div>
        </div>
        <div className="inline md:hidden">
          <PiGearSixBold className="ml-4 text-3xl font-bold" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
