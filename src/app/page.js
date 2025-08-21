"use client";
import Board from "@/app/Board/page";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
export default function Home() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <div className="w-full h-full pl-5 pr-5 md:pl-14 md:pr-14 mt-10">
      <div className="w-full h-full">
        <div className="text-center text-2xl font-semibold p-3">
          Regular Show
        </div>
        <div
        className="absolute right-12 top-8"
          onClick={() =>
            setTheme((prevTheme) => (prevTheme == "light" ? "dark" : "light"))
          }
        >
          {theme == "light" ? (
            <div className="cursor-pointer">
              <IoSunnySharp color="yellow" size={36} />
            </div>
          ) : ( 
            <div className="cursor-pointer">
              <FaMoon color="grey" size={30} />
            </div>
          )}
        </div>
        <Board />
      </div>
    </div>
  );
}
