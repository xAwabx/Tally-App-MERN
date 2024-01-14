import React, { useState } from "react";
import { HiUserRemove } from "react-icons/hi";
import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export const RemoveUser = ({
  userId,
  groupId,
  removeUserHandler,
  userData,
}) => {
  const [open, setOpen] = useState(false);
  let visible = false;

  const openHandler = () => {
    setOpen(!open);
  };

  userId !== userData.userId ? (visible = true) : (visible = false);

  return (
    <div
      className={`flex justify-center items-center ${
        visible ? "inline" : "hidden"
      } `}
    >
      <Button className="bg-lightblue" onClick={openHandler}>
        <HiUserRemove size={25} />
      </Button>
      <Dialog open={open} handler={openHandler}>
        <DialogHeader>Remove User</DialogHeader>
        <DialogBody>
          <Typography variant="lead">
            Are you sure you want to remove this user?
          </Typography>
        </DialogBody>
        <DialogFooter className="gap-4">
          <Button color="gray" onClick={openHandler}>
            No
          </Button>
          <Button
            color="red"
            onClick={() => {
              removeUserHandler(groupId, userId, openHandler);
            }}
          >
            Yes
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
