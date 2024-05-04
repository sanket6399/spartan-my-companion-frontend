import React from "react";
import Search from "../icons/Search";
import { useNavigate } from "react-router-dom";
import Hamburger from "../icons/Hamburger";
import Cancel from "../icons/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../context/sidebarSlice";
import Logout from "../icons/Logout";
import Dark from "../icons/Dark";
import Light from "../icons/Light";
import main_icon from "../assets/main_icon.png";

const Navbar = () => {
  const open = useSelector((state) => state.sidebar.open);
  const dark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const handleChange = (e) => {};
  const user = JSON.parse(localStorage.getItem("user"));
  
  const handleReload = () => {
    window.location.href = 'https://main.d2xbt2bm4byqng.amplifyapp.com/';
  };
  const navigate = useNavigate();
  return (
    <div
      className="fixed bg-[#0055a2] dark:bg-[#1E212A]
     top-0 left-0 right-0 z-10 h-14  shadow-md  flex items-center justify-between
     px-4
     md:px-20"
    >
      <div className="text-sm md:text-base font-bold text-white cursor-pointer flex items-center gap-4">
        <div
          onClick={() => dispatch(toggle())}
          className="
          transition-transform   ease-linear
        duration-700 cursor-pointer
        "
        >
          {!open ? <Hamburger /> : <Cancel />}
        </div>
        <img src={main_icon} alt="icon" className="w-7 h-7 md:w-9 md:h-9 rounded-full" onClick={handleReload}/>  
        <div onClick={handleReload}>SPARTAN MyCompanion</div>
      </div>

      {/* // Search Bar */}
      {/* <div
        className="searchbar hidden border-none outline-none rounded-md py-1 h-8 px-4 w-96 
      bg-gray-100 md:flex items-center"
      >
        <Search />
        <input
          onChange={handleChange}
          type="text"
          className="border-none outline-none rounded-md py-1 px-2 w-96 bg-gray-100"
          placeholder="Search for Topics"
        />
      </div> */}

      <div className="flex items-center gap-3">
        {dark ? <Light /> : <Dark />}

        {/* // Logout */}
        <Logout />
        <div className="hidden md:flex items-center gap-5">
          <div
            className="cursor-pointer text-sm 
          md:text-base text-white dark:text-white"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </div>
          <img
            //onClick={() => navigate("/login")}
            src={
              user?.profileImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFY677t7F_8Epm50xo5OfqI882l5OBOPKRDxDWeGo7OQ&s"
            }
            alt="profile"
            className="
          w-6 h-6
          md:w-7 md:h-7 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
