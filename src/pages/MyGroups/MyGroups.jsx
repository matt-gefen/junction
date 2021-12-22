import React, { useState, useEffect } from "react";

// Services
import { getAllGroups, deleteGroup } from "../../services/groupService";
import { updateProfile, getProfileById } from "../../services/profileService";

// Components
import GroupCard from "../../components/GroupCard/GroupCard";

const MyGroups = (props) => {
  const [groups, setGroups] = useState([]);
  const [profile, setProfile] = useState();
  const [myGroups, setMyGroups] = useState();
  const [click, setClick] = useState (false)

  const handleDeleteGroup = async (groupId) => {
    try {
      console.log('DELETING GROUP!!!!!')
      await deleteGroup(groupId);
      const filteredGroups =groups.filter((group) => group._id !== groupId)
      setGroups(filteredGroups);
    } catch (error) {
      throw error;
    }
  };

  const beenClicked = () => {
      setClick(!click)
  }

  useEffect(() => {
    const fetchAllGroups = async () => {
      const groupData = await getAllGroups();
      setGroups(groupData);
      const profileData = await getProfileById(props.user?.profile);
      setProfile(profileData);
      const userGroups= []
      groupData.forEach((element) => {
        element.members.forEach((member) => {
          if (member._id === profileData._id) {
            userGroups.push(element);
          }
        });
      })
      setMyGroups(userGroups)
    };
    fetchAllGroups();
  }, [click]);

  console.log("hello", myGroups);
  return (
    <div className="layout">
        <h1>My Groups</h1>
      {myGroups?.map((joinedGroup) => (
        <GroupCard
          beenClicked = {beenClicked}
          group={joinedGroup}
          key={joinedGroup._id}
          user={props.user}
          profile={profile}
          handleDeleteGroup={handleDeleteGroup}
        />
      ))}
    </div>
  );
};

export default MyGroups;
