import { React, useState } from "react";
import Popup from "reactjs-popup";
import { IoMdPersonAdd } from "react-icons/io";
import { Currentmembers } from "./Member";
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

export const Adduser = ({
  removeUserHandler,
  submitHandle,
  userAddData,
  setUserAddData,
  currentGroupData,
  groupId,
  userData,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  return (
    <div>
      <Button
        className=" items-center bg-lightblue bg-opacity-90"
        onClick={handleOpen}
      >
        <IoMdPersonAdd size={25} className="text-white" />
      </Button>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card>
          <CardBody className="flex flex-col gap-4 ">
            <Typography variant="h4" color="blue-gray">
              Add Members
            </Typography>

            <Typography className="-mb-2" variant="h6">
              User Email
            </Typography>
            <Input
              label="email"
              size="lg"
              value={userAddData.email}
              onChange={(e) => {
                setUserAddData((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
            <Button
              className="bg-lightblue"
              onClick={() => {
                submitHandle(groupId);
              }}
              fullWidth
            >
              Add
            </Button>
          </CardBody>
          <CardFooter className="pt-0 w-full">
            <Typography className="-mb-2" variant="h6">
              Current Members
            </Typography>
            <div className="flex flex-col gap-2 mt-3 pr-2 py-3 min-h-[10vh] max-h-[20vh] w-full mx-auto overflow-y-scroll ">
              {currentGroupData &&
                currentGroupData.users.map((userId, i) => {
                  return (
                    <Currentmembers
                      userData={userData}
                      userId={userId}
                      groupId={groupId}
                      removeUserHandler={removeUserHandler}
                      key={i}
                    />
                  );
                })}
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </div>

    // <Popup
    //   trigger={
    //     <IoMdPersonAdd
    //       className="bg-white text-black rounded-lg  hover:cursor-pointer hover:scale-[1.01] transform duration-200 p-1"
    //       size={35}
    //     />
    //   }
    //   modal
    //   nested
    // >
    //   <span>
    //     <div className=" bg-black  w-[40vw] gap-5 rounded-lg flex flex-col justify-between items-center p-10 backdrop-blur-md bg-opacity-80 ">
    //       <h1 className="text-white text-3xl font-bold">Add Member</h1>

    //       <input
    //         value={userAddData.userId}
    //         onChange={(e) => {
    //           setUserAddData((prev) => {
    //             return { ...prev, userId: e.target.value };
    //           });
    //         }}
    //         type="text"
    //         placeholder="User ID"
    //         className="bg-transparent text-white text-center outline-none text-xl w-full "
    //       />
    //       <button
    //         onClick={() => {
    //           submitHandle(groupId);
    //         }}
    //         className="text-xl text-black font-mono bg-white px-10 rounded-xl"
    //       >
    //         Add
    //       </button>
    // <div className="h-[20vh] w-[30vw] flex flex-col text-white p-4 items-center">
    //   <h1 className="text-white text-3xl font-semibold text-center">
    //     Current Members
    //   </h1>
    //   <div className="flex flex-col gap-2 mt-3 px-2 py-3 h-[30vh] w-[25vw] mx-auto overflow-y-scroll ">
    //     {currentGroupData &&
    //       currentGroupData.users.map((userId, i) => {
    //         return <Currentmembers userId={userId} key={i} />;
    //       })}
    //   </div>
    // </div>
    //     </div>
    //   </span>
    // </Popup>
  );
};
