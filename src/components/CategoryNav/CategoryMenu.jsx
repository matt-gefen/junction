import React, { useState, useEffect } from "react";
import categories from "../../data/categories";
import styles from "./CategoryNav.module.css";

// Services
import { updateProfile, getProfileById } from "../../services/profileService";

// Components
import ChipBar from "../MaterialUI/ChipBar";
import ToggleChip from "../MaterialUI/ToggleChip";


const CategoryMenu = (props) => {

  const chipCategories = new Set(
    categories.map((category, idx) => (
      <ToggleChip 
        addCategory={props.addCategory}
        removeCategory={props.removeCategory}
        handleAddCategory={props.handleAddCategory}
        handleRemoveCategory={props.handleRemoveCategory}
        select={props.profileCategories?.includes(category)}
        label={category}
        key={idx}
      />
    ))
  )

  return (
    <>
      <ChipBar 
        labels={chipCategories}
      />
      <div className={styles.categorySelection}>
        <div onClick={props.usersJoinedGroups} className={styles.categoryName}>
          My Groups
        </div>
      </div>
    </>
  );
};

export default CategoryMenu;
