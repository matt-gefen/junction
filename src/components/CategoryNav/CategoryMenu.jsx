import React, { useState, useEffect } from "react";
import categories from "../../data/categories";
import styles from "./CategoryNav.module.css";

// Services
import { updateProfile, getProfileById } from "../../services/profileService";

// Components
import CategoryFilter from "./CategoryFilter";

const CategoryMenu = (props) => {
  const [profile, setProfile] = useState([]);
  const [categoryPref, setCategoryPref] = useState([]);

  let groupCategories = new Set(
    categories.map((element, index) => {
      return element;
    })
  );

  let categoryOptions = [];
  let profilCategories = [];

  const handleAddCategory = async (category) => {
    try {
      updateProfile(profile._id, {
        ...profile,
        category_prefs: [...profile.category_prefs, category]
      });
      setCategoryPref(profile.category_prefs);
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveCategory = async (category) => {
    try {
      let newCategoryPref = categoryPref.filter((pref) => pref !== category);
      updateProfile(profile._id, {
        ...profile,
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
        profilCategories = profileData.category_prefs;
      } catch (error) {
        throw error;
      }
    };
    fetchCategories();
  }, [props.user.profile, categoryPref]);

  groupCategories.forEach((category, index) => {
    categoryOptions.push(
      <CategoryFilter
        beenClicked={profilCategories.includes(category)}
        handleAddCategory={handleAddCategory}
        handleRemoveCategory={handleRemoveCategory}
        category={category}
        key={index}
      />
    );
  });

  return (
  <> 
  <div className={styles.categorySelection}><div onClick={props.usersJoinedGroups} className={styles.categoryName}>user groups</div>{categoryOptions}</div>
  </>)
};

export default CategoryMenu;
