import React from "react";

import { FaUser } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
const Card = () => {
  return (
    <div className="not-last flex flex-col items-center rounded border md:flex md:flex-row md:justify-center md:border-customBlue xl:h-[277px] xl:w-[803px]">
      <div className="mb-4 flex h-[277px] w-[300px] items-center justify-center rounded border border-blue-300 md:mb-0">
        image
      </div>
      <div className="w-full p-6 md:h-[277px] md:border-customBlueLight">
        <div className="flex items-center">
          <div className="flex items-center text-customBlue">
            <FaUser />
            <h4 className="ml-2">Posted By</h4>
          </div>
          <div className="ml-2 flex items-center text-customBlue">
            <FaCommentAlt />
            <h4 className="ml-2">Posted By</h4>
          </div>
        </div>
        <h3 className="drop-shadow- text-2xl font-bold text-customDarkGrayish decoration-purple-500">
          How can you make cash management easier?
        </h3>
        <p className="mt-4 text-base text-customBrown">
          Nostrud tem exrcitation duis laboris nisi ut aliquip sed duis aute
          cupidata lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="group mt-4 flex cursor-pointer items-center p-1 text-xl hover:drop-shadow">
          <button className="mr-2 font-bold text-customBlue">
            More Details
          </button>
          <span className="transform font-extrabold text-customBlue transition-transform group-hover:translate-x-2">
            <GoArrowRight className="text-2xl font-extrabold" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
