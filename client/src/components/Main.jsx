import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Main = () => {
  return (
    <main className="h-full w-full">
      <Navigation />
      <div className="mb-8 mt-8 px-6 lg:px-16">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
