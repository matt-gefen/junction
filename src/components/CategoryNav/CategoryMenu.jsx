import React, { useState, useEffect } from "react";
import categories from "../../data/categories";
import styles from "./CategoryNav.module.css";

// Services
import { updateProfile, getProfileById } from "../../services/profileService";

// Components
import CategoryFilter from "./CategoryFilter";
import ChipBar from "../MaterialUI/ChipBar";


const CategoryMenu = (props) => {
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
      <ChipBar />
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
