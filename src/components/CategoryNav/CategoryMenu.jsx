import React, { useState, useEffect } from "react";
import categories from "../../data/categories";
import styles from "./CategoryNav.module.css";

// Services
import { updateProfile, getProfileById } from "../../services/profileService";

// Components
import CategoryFilter from "./CategoryFilter";


const CategoryMenu = (props) => {
  // const [profile, setProfile] = useState();

  //   const [categoriesPrefs, setCategoriesPrefs] = useState(props.profileCategories)

  //   const handleAddCategory = async (category) => {

  //     try {
  //       updateProfile(profile._id, {
  //         category_prefs: [...categoriesPrefs, category],
  //       });
  //       setCategoriesPrefs([...categoriesPrefs, category]);
  //     } catch (error) {
  //       throw error;
  //     }
  //   };
  
  //   const handleRemoveCategory = async (category) => {
  
  //     try {
  //       const newCategoryPref = categoriesPrefs.filter((pref) => pref !== category);
  //       updateProfile(profile._id, {
  //         category_prefs: newCategoryPref,
  //       });
  //       setCategoriesPrefs(newCategoryPref);
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

  //   useEffect(() => {  
  //   const fetchCategories = async () => {
  //     const profileData = await getProfileById(props.user?.profile);
  //     setProfile(profileData);
  //     try {
  //       const profileData = await getProfileById(props.user?.profile);
  //       setCategoriesPrefs(profileData.category_prefs)
  //     } catch (error) {
  //       throw error;
  //     }
  //   };
  //   fetchCategories()
  // }, [props.profileCategories]);


console.log(props)


  const groupCategories = new Set(
    categories.map((element, index) => (

      <CategoryFilter
      profileCategories={props.profileCategories}
      handleAddCategory={props.handleAddCategory}
      handleRemoveCategory={props.handleRemoveCategory}
      category={element}
      key={index}
    />
    ))
  );

  return (
    <>
      <div className={styles.categorySelection}>
        <div onClick={props.usersJoinedGroups} className={styles.categoryName}>
          My Groups
        </div>
        {groupCategories}
      </div>
    </>
  );
};

export default CategoryMenu;
