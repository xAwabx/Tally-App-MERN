import React from "react";
import { Adduser } from "./Adduser/Adduser";
import { Card, Typography } from "@material-tailwind/react";

export const Group = ({
  removeUserHandler,
  group,
  onClick,
  currentGroupId,
  outline,
  i,
  submitUserAddHandle,
  setUserAddData,
  userAddData,
  currentGroupData,
  userData,
}) => {
  return (
    <Card
      color="gray"
      className={`flex flex-row items-center justify-between p-4 px-5 rounded-md bg-darkblue shadow-md shadow-black text-white text-start hover:cursor-pointer  ${
        currentGroupId == group._id && outline
          ? "outline outline-[0.01px]"
          : null
      }`}
      key={i}
      onClick={() => {
        onClick(group);
      }}
    >
      <div className="flex flex-col gap-2">
        <Typography variant="h4" className="font-bold ">
          {group.name}
        </Typography>
        <Typography variant="paragraph" className="font-thin ">
          {group.desc}
        </Typography>
      </div>
      <div>
        <Adduser
          userData={userData}
          removeUserHandler={removeUserHandler}
          submitHandle={submitUserAddHandle}
          userAddData={userAddData}
          setUserAddData={setUserAddData}
          groupId={group._id}
          currentGroupData={currentGroupData}
        />
      </div>
    </Card>
  );
};
