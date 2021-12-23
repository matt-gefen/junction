import React from "react";
import styles from "./GroupHeader.module.css";

// Components
import GroupActions from "../GroupCard/GroupActions";

// import { useNavigate } from "react-router-dom"

const GroupHeader = (props) => {
  // const navigate = useNavigate()

  return (

      <div className={styles.header}>
        <h1>{props.group.title}</h1>
        <GroupActions {...props} />
      </div>

  );
};

export default GroupHeader;
