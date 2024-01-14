import React, { useState, useEffect } from "react";
import { auth, provider } from "../authconfig";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { MdLogout } from "react-icons/md";
import { Maincontainer } from "../components/MainContainer/Maincontainer";
import { SignIn } from "./SignIn";
import {
  Navbar,
  Avatar,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

export default function Home() {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
    } catch (error) {
      console.log("ERROR WHILE SIGNIN", error);
    }
  };

  useEffect(() => {
    if (user) {
      const data = {
        pfp: user.photoURL,
        username: user.displayName,
        email: user.email,
        userId: user.uid,
      };
      async function fetchdata() {
        try {
          const response = await axios.post(
            "http://localhost:4000/createuser",
            data
          );
          console.log(response.data);
          const response1 = await axios.get("http://localhost:4000/getuser", {
            params: { userId: user.uid },
          });
          // console.log(response1.data);
          setUserData(response1.data);
        } catch (error) {
          console.log("ERROR CREATING USER: ", error);
        }
      }
      fetchdata();
    }
  }, [user]);

  return (
    <div className="bg_image">
      {user == null ? (
        <SignIn handleLogin={handleLogin} />
      ) : (
        <div className="flex flex-col h-[100vh] gap-4 justify-center items-center ">
          <Navbar
            variant="gradient"
            className="flex flex-row justify-between items-center bg-black mx-auto max-w-screen-xl p-2 lg:rounded-full lg:px-6"
          >
            <div className="flex flex-row items-center gap-4 justify-center">
              <Typography variant="h5" color="white">
                Tally App
              </Typography>
              <Typography variant="h5" color="white" className="font-thin">
                |
              </Typography>
              <Typography variant="h6" color="white" className="mt-[4px]">
                Hi, {user && user.displayName}
              </Typography>
            </div>

            <div className="flex flex-row justify-center items-center gap-2">
              <Menu>
                <MenuHandler>
                  <Avatar
                    src={user.photoURL}
                    alt="PFP"
                    className=" hover:cursor-pointer"
                    size="sm"
                  />
                </MenuHandler>
                <MenuList>
                  <MenuItem className=" pointer-events-none">
                    {user && user.email}
                  </MenuItem>
                  <MenuItem
                    className="flex flex-row  gap-2"
                    onClick={() => {
                      setUser(null);
                      localStorage.setItem("user", null);
                      window.location.reload();
                    }}
                  >
                    <MdLogout />
                    LOGOUT
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </Navbar>

          {userData && <Maincontainer userData={userData} />}
        </div>
      )}
    </div>
  );
}
