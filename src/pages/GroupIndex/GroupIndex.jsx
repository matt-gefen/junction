import React, { useState, useEffect } from "react";
import styles from "./GroupIndex.module.css"

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
  const [categories, setCategories] = useState([]);
  const [click, setClick] = useState(false);

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroup(groupId);
      setGroups(groups.filter((group) => group._id !== groupId));
    } catch (error) {
      throw error;
    }
  };

  const beenClicked = () => {
    setClick(!click);
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
  }, [categories, click]);

  const handleAddCategory = async (category) => {
    try {
      updateProfile(profile._id, {
        category_prefs: [...catPrefs, category],
      });
      setCatPrefs([...catPrefs, category]);
      setCategories([...categories, category]);
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
      setCategories(newCategoryPref);
    } catch (error) {
      throw error;
    }
  };

  return props.user ? (

    <div className={styles.layout}>
      <CategoryMenu
        handleAddCategory={handleAddCategory}
        handleRemoveCategory={handleRemoveCategory}
        profileCategories={profileCategories}
        user={props.user}
      />
      <h1>Discover Groups</h1>
      {profile &&
        userGroupPref?.map((userPref) => (
          <GroupCard
            beenClicked={beenClicked}
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
            beenClicked={beenClicked}
            group={group}
            key={group._id}
            user={props.user}
            profile={profile}
            handleDeleteGroup={handleDeleteGroup}
          />
        ))}
    </div>
  ) : (
    <div className={styles.layout}>
      <h1>Discover Groups</h1>
      {publicGroups.map((group) => (
        <GroupCard group={group} key={group._id} />
      ))}
    </div>
  );
};

export default GroupList;
