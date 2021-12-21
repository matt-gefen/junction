import React, { useState, useEffect } from "react";

// Services
import { getAllGroups, deleteGroup } from "../../services/groupService";

import { updateProfile, getProfileById } from "../../services/profileService";

// Components
import GroupCard from "../../components/GroupCard/GroupCard";
import CategoryMenu from "../../components/CategoryNav/CategoryMenu";

const GroupList = (props) => {
  const [groups, setGroups] = useState([]);
  const [publicGroups, setPublicGroups] = useState([]);
  const [profile, setProfile] = useState();
  const [catPrefs, setCatPrefs] = useState([]);
  const [userGroupPref, setUserGroupPref] = useState([]);
  const [notUserGroupPref, setNotUserGroupPref] = useState([]);
  const [usersGroups, setUserGroups] = useState([]);
  const [userGroupFilter, setUserGroupFilter] = useState(false);

  const usersJoinedGroups = () => setUserGroupFilter(!userGroupFilter);

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroup(groupId);
      setGroups(groups.filter((group) => group._id !== groupId));
    } catch (error) {
      throw error;
    }
  };

  const nonLoggedin = async () => {
    const publicGroupData = await getAllGroups();
    setPublicGroups(publicGroupData);
  };

  const profileCategories = profile?.category_prefs;

 

  useEffect(() => {
    const fetchAllGroups = async () => {
      const groupData = await getAllGroups();
      setGroups(groupData);
      const profileData = await getProfileById(props.user?.profile);

      
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
        element.members.forEach((member) => {
          if (member._id === profileData._id) {
            joinedGroups.push(element);
          }
        });
        setUserGroups(joinedGroups);
      });

      return () => {
        setGroups([]);
      };
    };
    fetchAllGroups();
    nonLoggedin();

    const fetchCategories = async () => {
      try {
        const profileData = await getProfileById(props.user?.profile);
        setCatPrefs(profileData.category_prefs);
      } catch (error) {
        throw error;
      }
    };

    fetchCategories();
  }, [props.user?.profile]);

  const handleAddCategory = async (category) => {
    try {
      updateProfile(profile._id, {
        category_prefs: [...catPrefs, category],
      });
      setCatPrefs([...catPrefs, category]);
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveCategory = async (category) => {
    try {
      const newCategoryPref = catPrefs.filter((pref) => pref !== category);
      updateProfile(profile._id, {
        category_prefs: newCategoryPref,
      });
      setCatPrefs(newCategoryPref);
    } catch (error) {
      throw error;
    }
  };

  return props.user ? (
    userGroupFilter ? (
      <div className="layout">
        <CategoryMenu
          handleAddCategory={handleAddCategory}
          handleRemoveCategory={handleRemoveCategory}
          usersJoinedGroups={usersJoinedGroups}
          profileCategories={profileCategories}
          user={props.user}
        />
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
        <CategoryMenu
          handleAddCategory={handleAddCategory}
          handleRemoveCategory={handleRemoveCategory}
          usersJoinedGroups={usersJoinedGroups}
          profileCategories={profileCategories}
          user={props.user}
        />
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
    )
  ) : (
    <div className="layout">
      {publicGroups.map((group) => (
        <GroupCard group={group} key={group._id} />
      ))}
    </div>
  );
};

export default GroupList;
