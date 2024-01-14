import { React, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Popup from "reactjs-popup";
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
} from "@material-tailwind/react";

export const Creategroup = ({
  submitHandle,
  setGroupFormData,
  groupFormData,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  return (
    <div>
      <Button
        className="flex flex-row gap-3 items-center bg-lightblue bg-opacity-90"
        onClick={() => setOpen(!open)}
      >
        <IoMdAdd size={20} /> Create Group
      </Button>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem] ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Create Group
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Group Name
            </Typography>
            <Input
              label="Name"
              size="lg"
              value={groupFormData.name}
              onChange={(e) => {
                setGroupFormData((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
            />
            <Typography className="-mb-2" variant="h6">
              Description
            </Typography>
            <Textarea
              label="Description"
              value={groupFormData.desc}
              onChange={(e) => {
                setGroupFormData((prev) => {
                  return { ...prev, desc: e.target.value };
                });
              }}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-lightblue" onClick={submitHandle} fullWidth>
              Create
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>

    // <Popup
    //   trigger={
    //     <div className="flex flex-row items-center justify-center gap-1 pl-3 p-2 bg-black bg-opacity-70 rounded-lg  hover:cursor-pointer hover:scale-[1.01] transform duration-200">
    //       <h1 className="font-bold hover:cursor-pointer hover:scale-[1.01] transform duration-200">
    //         Create Group
    //       </h1>
    //       <IoMdAdd
    //         className="hover:cursor-pointer hover:scale-[1.01] transform duration-200"
    //         size={25}
    //       />
    //     </div>
    //   }
    //   modal
    //   nested
    // >
    //   <span>
    //     <div className="bg-black h-[50vh] rounded-lg flex flex-col justify-between items-center p-10 backdrop-blur-md bg-opacity-80">
    //       <h1 className="text-white text-3xl font-bold">CREATE GROUP</h1>

    // <input

    //   type="text"
    //   placeholder="Name"
    //   className="bg-transparent text-white text-center outline-none text-xl"
    // />
    //       <textarea
    // value={groupFormData.desc}
    // onChange={(e) => {
    //   setGroupFormData((prev) => {
    //     return { ...prev, desc: e.target.value };
    //   });
    // }}
    //         type="text"
    //         placeholder="Description"
    //         className="bg-transparent text-white text-center outline-none text-xl min-h-[20vh] "
    //       />

    //       <button
    //         onClick={submitHandle}
    //         className="text-xl text-black font-mono bg-white px-10 rounded-xl"
    //       >
    //         Create
    //       </button>
    //     </div>
    //   </span>
    // </Popup>
  );
};
