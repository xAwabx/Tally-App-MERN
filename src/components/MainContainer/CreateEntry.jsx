import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
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

export const CreateEntry = ({
  submitHandle,
  setEntryFormData,
  entryFormData,
}) => {
  const [open, setOpen] = useState(false);
  const [inputErr, setInputErr] = useState(false);

  useEffect(() => {
    entryFormData.duration > 24 || entryFormData.duration < 0
      ? setInputErr(true)
      : setInputErr(false);
  }, [entryFormData.duration]);

  const handleOpen = () => setOpen((prev) => !prev);

  return (
    <div>
      <Button
        className="flex flex-row gap-3 items-center bg-lightblue bg-opacity-90"
        onClick={() => setOpen(!open)}
      >
        <IoMdAdd size={20} /> Tally Hours
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
              Tally Hours
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Duration
            </Typography>
            <Input
              type="number"
              error={inputErr}
              label="Hours"
              size="lg"
              value={entryFormData.duration}
              onChange={(e) => {
                setEntryFormData((prev) => {
                  return { ...prev, duration: e.target.value };
                });
              }}
            />
            <Typography className="-mb-2" variant="h6">
              Description
            </Typography>
            <Textarea
              label="Description"
              value={entryFormData.desc}
              onChange={(e) => {
                setEntryFormData((prev) => {
                  return { ...prev, desc: e.target.value };
                });
              }}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button className="bg-lightblue" onClick={submitHandle} fullWidth>
              Tally
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
    // <Popup
    //   trigger={
    //     <div className="flex flex-row items-center justify-center gap-1 pl-3 p-2 bg-black bg-opacity-70 rounded-lg  hover:cursor-pointer hover:scale-[1.01] transform duration-200">
    //       <h1 className="font-bold hover:cursor-pointer hover:scale-[1.01] transform duration-200">
    //         Tally Hours
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
    //     <div className="bg-black h-[50vh] w-[30vh] rounded-lg flex flex-col justify-between items-center p-10 backdrop-blur-md bg-opacity-80">
    //       <h1 className="text-white text-3xl font-bold">TALLY HOURS</h1>

    //       <input
    // value={entryFormData.duration}
    // onChange={(e) => {
    //   setEntryFormData((prev) => {
    //     return { ...prev, duration: e.target.value };
    //   });
    // }}
    //         type="text"
    //         placeholder="Duration"
    //         className="bg-transparent text-white text-center outline-none text-xl"
    //       />
    //       <textarea
    // value={entryFormData.desc}
    // onChange={(e) => {
    //   setEntryFormData((prev) => {
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
