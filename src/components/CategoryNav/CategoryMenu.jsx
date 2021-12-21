import React, { useState, useEffect } from "react";
import categories from "../../data/categories";
import styles from "./CategoryNav.module.css";

// Services
import { updateProfile, getProfileById } from "../../services/profileService";

// Components
import CategoryFilter from "./CategoryFilter";

const CategoryMenu = (props) => {
  const [profile, setProfile] = useState();
  const [categoryPref, setCategoryPref] = useState([]);
  const profileCategories = profile?.category_prefs
  const handleAddCategory = async (category) => {

    try {
      updateProfile(profile._id, {
        category_prefs: [...categoryPref, category],
      });
      setCategoryPref([...categoryPref, category]);
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveCategory = async (category) => {

    try {
      const newCategoryPref = categoryPref.filter((pref) => pref !== category);
      updateProfile(profile._id, {
        category_prefs: newCategoryPref,
      });
      setCategoryPref(newCategoryPref);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      
      try {
        const profileData = await getProfileById(props.user.profile);
        setProfile(profileData);
        setCategoryPref(profileData.category_prefs)
      } catch (error) {
        throw error;
      }
    };
    fetchCategories();
  }, [props.user.profile]);

  const groupCategories = new Set(
    categories.map((element, index) => (

      <CategoryFilter
      profileCategories={profileCategories}
      handleAddCategory={handleAddCategory}
      handleRemoveCategory={handleRemoveCategory}
      category={element}
      key={index}
    />
    ))
  );

  return (
    <>
      <div className={styles.categorySelection}>
        <div onClick={props.usersJoinedGroups} className={styles.categoryName}>
          user groups
        </div>
        {groupCategories}
      </div>
    </>
  );
};

export default CategoryMenu;
