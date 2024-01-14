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
  Avatar,
} from "@material-tailwind/react";
import { RemoveUser } from "./RemoveUser";

export const Currentmembers = ({
  userId,
  groupId,
  removeUserHandler,
  userData,
}) => {
  const [user, setUser] = useState(undefined);

  async function fetchUser() {
    try {
      const response = await axios.get(
        "https://fair-red-goshawk-gown.cyclic.app/getuser",
        {
          params: { userId: userId },
        }
      );
      console.log("----------------------");
      console.log(response.data.pfp);
      // console.log("response ID: ", response.data.userId);

      setUser(response.data);
    } catch (error) {
      console.log("ERROR WHILE FETCHING USER", error);
    }
  }

  useEffect(() => {
    userId && fetchUser();
  }, [userId]);

  return (
    <Card
      className={`flex flex-row justify-between gap-1 bg-white text-black  py-3 pl-6 pr-3 rounded-md text-start`}
    >
      <div className="flex flex-row justify-center items-center gap-2 ">
        <Avatar src={user && user.pfp} />
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <Typography variant="h5" className="font-bold">
              {user && user.name}
            </Typography>
            <Typography variant="paragraph">
              {userId === userData.userId && " (you)"}
            </Typography>
          </div>
          <Typography variant="lead" className="font-thin">
            {user && user.email}
          </Typography>
        </div>
      </div>
      <RemoveUser
        userData={userData}
        userId={userId}
        groupId={groupId}
        removeUserHandler={removeUserHandler}
      />
    </Card>
  );
};
