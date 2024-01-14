import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import GoogleButton from "react-google-button";

export const SignIn = ({ handleLogin }) => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card
        color="white"
        shadow={true}
        className="p-6 drop-shadow-lg shadow-black"
      >
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you!
        </Typography>
        <GoogleButton onClick={handleLogin} className="mt-5 "></GoogleButton>
      </Card>
    </div>
  );
};
