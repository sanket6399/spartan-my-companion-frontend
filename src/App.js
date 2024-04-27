import Content from "./components/Content";
import CreateButton from "./components/CreateButton";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Askquestion from "./components/Askquestion";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Chat from "./pages/Chat";
import Myanswers from "./pages/Myanswers";
import Explore from "./pages/Explore";
import Notfound from "./components/Notfound";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addUsers } from "./context/onlineSlice";
const queryClient = new QueryClient();

export const socket = io("http://localhost:8080", {
  withCredentials: true,
  secure: true,
});

const Layout = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/login";
    }

    socket.connect();
    socket.on("connect", () => {
    });
    socket.auth = user;

    socket.on("user-connected", (users) => {
      dispatch(addUsers(users));
    });

    socket.on("user-disconnected", (users) => {
      dispatch(addUsers(users));
    });

    const getUsers = async () => {
      const res = await axios.get(
        "https://x6scf9otx8.execute-api.us-east-1.amazonaws.com/spartan-v1/spartan-get-allUsers"
      );
      setUsers(res.data.body);
    };
    getUsers();
  }, [socket]);

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div
        className="relative w-screen flex flex-col justify-center items-center 
      overflow-x-hidden bg-white dark:bg-[#32353F]"
      >
        <Navbar />
        <div
          className="w-full h-screen flex justify-center items-start px-4 
        md:px-12 pt-12 dark:bg-[#32353F]"
        >
          <Sidebar />
          <Outlet />
          <div
            className="right-section
          hidden md:block
          h-80 fixed z-10 top-24 right-28"
          >
            <CreateButton />
            <div
              className="mt-8  py-4 px-3 rounded-md flex
         flex-col items-start gap-5"
            >
              <h2 className="text-gray-600 font-bold text-start">Top Users</h2>
              {users.length > 0 &&
                users.slice(0, 5).map((user, index) => {
                  return (
                    <div className="flex items-center cursor-pointer">
                      <img
                        src={user?.profileImage}
                        alt="profile"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <h3 className="text-xs">{user.name}</h3>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Content />,
      },
      {
        path: "/ask",
        element: <Askquestion />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/explore/:topic",
        element: <Content />,
      },
      {
        path: "/myqna",
        element: <Myanswers />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default function App() {
  const theme = useSelector((state) => state.theme.isDark);

  return (
    <div className={`h-screen ${theme ? "dark" : ""}`}>
      <RouterProvider router={router} />
    </div>
  );
}
