import React, { useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";

export const DeleteGroup = ({ deleteGroupHandle }) => {
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button
        className="flex flex-row gap-3 items-center bg-opacity-90 text-white"
        color="red"
        onClick={openHandler}
      >
        <MdDelete size={20} /> Delete Group
      </Button>
      <Dialog open={open} handler={openHandler}>
        <DialogHeader>Delete Group</DialogHeader>
        <DialogBody>
          <Typography variant="lead">
            Are you sure you want to delete this group?
          </Typography>
          <Typography>
            All entries will be deleted and this action is irreversible
          </Typography>
        </DialogBody>
        <DialogFooter className="gap-4">
          <Button color="gray" onClick={openHandler}>
            No
          </Button>
          <Button color="red" onClick={deleteGroupHandle}>
            Yes
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
