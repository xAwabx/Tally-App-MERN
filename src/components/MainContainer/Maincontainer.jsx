import React, { useState, useEffect } from "react";
import axios from "axios";
import { Creategroup } from "./Creategroup";
import { CreateEntry } from "./CreateEntry";
import { Entry } from "./Entry";
import { Group } from "./Group";
import { Spinner, Typography } from "@material-tailwind/react";
import { DeleteGroup } from "./DeleteGroup";
import { TotalHours } from "./TotalHours";

export const Maincontainer = ({ userData }) => {
  const [outline, setOutline] = useState(true);
  const [err, setErr] = useState(null);
  const [allGroups, setAllGroups] = useState([]);
  const [groupIds, setGroupIds] = useState(userData.groups);
  const [currentGroupId, setCurrentGroupId] = useState(undefined);
  const [currentGroupData, setCurrentGroupData] = useState(undefined);
  const [groupFormData, setGroupFormData] = useState({
    name: "",
    desc: "",
    userId: userData.userId,
  });
  const [entryFormData, setEntryFormData] = useState({
    duration: "",
    desc: "",
    userId: userData.userId,
    groupId: currentGroupId,
  });
  const [userAddData, setUserAddData] = useState({
    email: "",
    groupId: "",
  });

  const [loading, setLoading] = useState(false);

  async function fetchCurrentGroupData() {
    const response = await axios.get(
      "https://fair-red-goshawk-gown.cyclic.app/getgroup",
      {
        params: { groupId: currentGroupId },
      }
    );
    // console.log(response.data);
    setCurrentGroupData(response.data);
  }

  async function fetchAllGroupData() {
    groupIds.forEach(async (groupId) => {
      const response = await axios.get(
        "https://fair-red-goshawk-gown.cyclic.app/getgroup",
        {
          params: { groupId: groupId },
        }
      );
      setAllGroups((prev) => {
        return [...prev, response.data];
      });
    });
  }
  useEffect(() => {
    // console.log("I RAN");
    fetchAllGroupData();
  }, groupIds);

  useEffect(() => {
    currentGroupId && fetchCurrentGroupData();
  }, [currentGroupId]);

  const submitGroupHandle = async () => {
    // console.log(groupFormData);
    try {
      const response = await axios.post(
        "https://fair-red-goshawk-gown.cyclic.app/creategroup",
        groupFormData
      );
      // console.log(response.data);
      if (response.data != "something went wrong") {
        setGroupFormData({
          name: "",
          desc: "",
          userId: userData.userId,
        });
        setAllGroups((prev) => {
          return [...prev, response.data];
        });
      }
    } catch (error) {
      console.log("ERROR WHILE CREATING GROUP");
    }
  };

  const submitEntryHandle = async () => {
    console.log(entryFormData);
    try {
      const response = await axios.post(
        "https://fair-red-goshawk-gown.cyclic.app/addentry",
        entryFormData
      );
      // console.log(response.data);
      if (response.data != "something went wrong") {
        setEntryFormData({
          duration: "",
          desc: "",
          userId: userData.userId,
          groupId: currentGroupId,
        });
        setCurrentGroupData(response.data);
      }
    } catch (error) {
      console.log("ERROR WHILE ADDING ENTRY", error);
    }
  };

  const submitUserAddHandle = async (groupId) => {
    const obj = {
      email: userAddData.email,
      groupId: groupId,
    };
    // console.log(obj);
    if (obj.email != "") {
      try {
        const response = await axios.post(
          "https://fair-red-goshawk-gown.cyclic.app/adduser",
          obj
        );
        if (response.data) {
          // console.log("RESPONSE ADDUSER: ", response.data);
          setUserAddData({
            email: "",
            groupId: currentGroupId,
          });
          let copy = allGroups;
          allGroups.forEach((group, i) => {
            if (group._id == response.data._id) {
              copy[i] = response.data;
            }
          });
          setAllGroups(copy);
          setCurrentGroupData((prev) => {
            return { ...prev, users: response.data.users };
          });
        }
      } catch (error) {
        console.log("ERROR WHILE ADDING USER", error);
      }
    }
  };

  const deleteGroupHandle = async () => {
    // console.log(currentGroupId);
    let data = {
      groupId: currentGroupId,
    };
    try {
      const response = await axios.post(
        "https://fair-red-goshawk-gown.cyclic.app/deletegroup",
        data
      );
      // console.log("DELETE DATA: ", response.data);
      setCurrentGroupData(undefined);
      setCurrentGroupId(undefined);

      // Handling front-end deletion
      let copy = allGroups;
      allGroups.forEach((group, i) => {
        if (group._id == response.data._id) {
          // console.log("i entered");
          copy.splice(i, 1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeUserHandler = async (groupId, userId, openHandler) => {
    const data = { userId: userId, groupId: groupId };
    console.log(data);
    try {
      const response = await axios.post(
        "https://fair-red-goshawk-gown.cyclic.app/removeuser",
        data
      );
      openHandler();
      console.log("REMOVE USER RESPONSE: ", response.data);
      setCurrentGroupData((prev) => {
        return { ...prev, users: response.data.users };
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const groupOnClick = (group) => {
    setCurrentGroupId(group._id);
    setEntryFormData((prev) => {
      return { ...prev, groupId: group._id };
    });
    setUserAddData((prev) => {
      return { ...prev, groupId: group._id };
    });
    // console.log(group._id);
  };

  const getUserTotalHours = (currentGroup, user) => {
    let totalHours = 0;
    currentGroup.Entries.forEach((entry) => {
      if (entry.userId === user) {
        totalHours += entry.duration;
      }
    });
    return totalHours;
  };

  return (
    <div className="flex flex-row backdrop-blur-lg h-[90vh] w-[90vw] mx-auto rounded-xl bg-black bg-opacity-75">
      <section className="flex-2/3 flex flex-col w-[33%] text-white p-7 py-10 gap-5">
        <div className="flex flex-col h-[100vh] gap-5 p-2  overflow-y-scroll scroll-smooth">
          {allGroups[0] != undefined ? (
            allGroups.map((group, i) => (
              <Group
                userData={userData}
                currentGroupData={currentGroupData}
                onClick={groupOnClick}
                key={i}
                group={group}
                setCurrentGroupId={setCurrentGroupData}
                currentGroupId={currentGroupId}
                outline={outline}
                i={i}
                removeUserHandler={removeUserHandler}
                submitUserAddHandle={submitUserAddHandle}
                setEntryFormData={setEntryFormData}
                setUserAddData={setUserAddData}
                userAddData={userAddData}
              />
            ))
          ) : (
            <div className="my-auto">
              <Typography
                variant="h2"
                className=" font-bold text-center my-auto "
              >
                No Groups
              </Typography>
              <Typography variant="paragraph" className=" text-center">
                Create a group by clicking the button below
              </Typography>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-5 justify-center items-center">
          <Creategroup
            submitHandle={submitGroupHandle}
            groupFormData={groupFormData}
            setGroupFormData={setGroupFormData}
          />
        </div>
      </section>

      <section className="flex-2/3 flex flex-col w-[67%] text-white p-7 py-10 ">
        <div className="h-[40vh] overflow-x-scroll overflow-y-hidden flex flex-row gap-4 justify-center pb-5 ">
          {currentGroupData &&
            currentGroupData.users.map((user, i) => {
              return (
                <TotalHours
                  key={i}
                  totalHours={getUserTotalHours(currentGroupData, user)}
                  userId={user}
                />
              );
            })}
        </div>
        <div className="h-[100vh] flex flex-col gap-5 p-2 overflow-y-scroll scroll-smooth ">
          {currentGroupData ? (
            currentGroupData.Entries[0] != undefined ? (
              !loading ? (
                <div>
                  <div className=" flex flex-col gap-5">
                    {currentGroupData.Entries.map((entry, i) => {
                      return (
                        <Entry
                          setLoading={setLoading}
                          loading={loading}
                          key={i}
                          id={i}
                          data={entry}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Spinner />
              )
            ) : (
              <div className="text-center">
                <Typography
                  variant="h2"
                  className=" font-bold text-center my-auto"
                >
                  No Entries In This Group
                </Typography>
                <Typography variant="paragraph">
                  Create an entry by clicking the button below
                </Typography>
              </div>
            )
          ) : (
            <Typography variant="h2" className="font-bold text-center ">
              No Group Selected
            </Typography>
          )}
        </div>
        {currentGroupData && (
          <div className="flex flex-row gap-5 justify-center pt-5">
            <CreateEntry
              submitHandle={submitEntryHandle}
              entryFormData={entryFormData}
              setEntryFormData={setEntryFormData}
            />
            <DeleteGroup deleteGroupHandle={deleteGroupHandle} />
          </div>
        )}
      </section>
    </div>
  );
};
