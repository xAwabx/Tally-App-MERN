import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Textarea,
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Spinner,
  useSelect,
} from "@material-tailwind/react";

export const TotalHours = ({ totalHours, userId }) => {
  const [userData, setUserData] = useState({});

  async function fetchUser() {
    try {
      const response = await axios.get(
        "https://fair-red-goshawk-gown.cyclic.app/getuser",
        {
          params: { userId: userId },
        }
      );
      setUserData(response.data);
    } catch (error) {
      console.log("ERROR WHILE FETCHING USER", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <Card
      color="gray"
      className="w-[33%] shadow-lg shadow-black bg-[#01284A] hover:cursor-default flex flex-col items-center justify-center"
    >
      <div className="flex flex-col gap-4 p-5">
        <div>
          <Typography variant="h3" className="text-center">
            {userData ? userData.name : <Spinner />}
          </Typography>
          <Typography variant="lead" className="text-center">
            {userData && userData.email}
          </Typography>
        </div>
        <Typography
          variant="h1"
          className="text-center text-[#01CBA6] drop-shadow-glow"
        >
          {totalHours ? `${totalHours} Hrs` : "0 Hrs"}
        </Typography>
      </div>
    </Card>
  );
};
