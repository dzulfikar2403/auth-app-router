'use client'
import { deleteCookies } from "@/lib/auth/helper/auth";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="w-full min-h-screen  px-4 py-2 ">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-extrabold">DashboardPage</h1>
        <button type="button" className="bg-red-400 px-4 py-2 rounded text-slate-200 font-semibold" onClick={async() => await deleteCookies()}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default DashboardPage;
