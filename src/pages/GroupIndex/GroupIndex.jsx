import React, { useState, useEffect } from "react";

// Services
import { getAllGroups, deleteGroup } from "../../services/groupService";

import { getProfileById } from "../../services/profileService";

// Components
import GroupCard from "../../components/GroupCard/GroupCard";
import CategoryMenu from "../../components/CategoryNav/CategoryMenu";

const GroupList = (props) => {
  const [groups, setGroups] = useState([]);
  const [profile, setProfile] = useState();
  const [catPrefs, setCatPrefs] = useState([]);
  const [userGroupPref, setUserGroupPref] = useState([]);
  const [notUserGroupPref, setNotUserGroupPref] = useState([]);

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroup(groupId);
      setGroups(groups.filter((group) => group._id !== groupId));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchAllGroups = async () => {
      const groupData = await getAllGroups();
      const profileData = await getProfileById(props.user.profile);
      setGroups(groupData);
      setProfile(profileData);
      const filteredGroups = [];
      const remainingGroups = [];
      groupData.forEach((element) => {
        if (profileData.category_prefs.includes(element.category)) {
          filteredGroups.push(element);
        } else {
          remainingGroups.push(element);
        }
      });
      setUserGroupPref(filteredGroups);
      setNotUserGroupPref(remainingGroups);
      const joinedGroups = [];
      groupData.forEach((element) => {
        if (profileData.category_prefs.includes(element.category)){
    filteredGroups.push(element) } else { 
      remainingGroups.push(element)
    }})
      setUserGroupPref(filteredGroups)
      setNotUserGroupPref(remainingGroups)
    };
    fetchAllGroups();
    return () => {
      setGroups([]);
    };
  }, [props.user.profile, ]);
  console.log(catPrefs)
  return !userGroupFilter ? (
    <div className="layout">
      <CategoryMenu usersJoinedGroups={usersJoinedGroups} user={props.user} />
      {profile &&
        usersGroups?.map((joinedGroup) => (
          <GroupCard
            group={joinedGroup}
            key={joinedGroup._id}
            user={props.user}
            profile={profile}
            handleDeleteGroup={handleDeleteGroup}
          />
        ))}
    </div>
  ) : (
    <div className="layout">
      <CategoryMenu user={props.user} />
      {profile &&
        userGroupPref?.map((userPref) => (
          <GroupCard
            group={userPref}
            key={userPref._id}
            user={props.user}
            profile={profile}
            handleDeleteGroup={handleDeleteGroup}
          />
        ))}
      {profile &&
        notUserGroupPref?.map((group) => (
          <GroupCard
            group={group}
            key={group._id}
            user={props.user}
            profile={profile}
            handleDeleteGroup={handleDeleteGroup}
          />
        ))}
    </div>
  );
};

export default GroupList;
