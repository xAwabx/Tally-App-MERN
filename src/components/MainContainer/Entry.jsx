import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Typography, Avatar } from "@material-tailwind/react";

export const Entry = ({ data, id }) => {
  const [user, setUser] = useState(undefined);

  async function fetchUser() {
    try {
      const response = await axios.get(
        "https://fair-red-goshawk-gown.cyclic.app/getuser",
        {
          params: { userId: data.userId },
        }
      );
      // console.log("data ID: ", data.userId);
      // console.log("response ID: ", response.data.userId);

      setUser(response.data);
    } catch (error) {
      console.log("ERROR WHILE FETCHING USER", error);
    }
  }

  useEffect(() => {
    // console.log(id);
    data && fetchUser();
  }, [data]);

  return (
    <Card
      color="gray"
      className="flex flex-row justify-between items-center bg-[#01284A] shadow-md shadow-black rounded-lg p-5 "
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-center items-center gap-2">
          <Avatar src={user && user.pfp} size="sm" />
          <div>
            <Typography variant="h4" className="">
              {user && user.userId === data.userId ? user.name : <Spinner />}
            </Typography>
            <Typography variant="small" className="">
              {user && user.userId === data.userId && user.email}
            </Typography>
          </div>
        </div>

        <Typography variant="h5" className="font-bold">
          {data.duration} Hours
        </Typography>
        <Typography variant="paragraph" className="text-lg">
          {data.desc}
        </Typography>
      </div>
      <div>
        <Typography variant="paragraph" className="">
          {data.date}
        </Typography>
      </div>
    </Card>
  );
};
