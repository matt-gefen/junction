import React, { useState, useEffect } from "react";
import categories from "../../data/categories";

// Services

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
  );

  return (
    <>
      <ChipBar labels={chipCategories} />
    </>
  );
};

export default CategoryMenu;
