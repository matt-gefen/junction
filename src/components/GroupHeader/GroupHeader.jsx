import React from "react";
import styles from "./GroupHeader.module.css";

// Components
import GroupActions from "../GroupCard/GroupActions";
import { Link } from "react-router-dom";

// import { useNavigate } from "react-router-dom"

const GroupHeader = (props) => {
  // const navigate = useNavigate()

  return (

      <div className={styles.header}>
        <Link to={`/groups/${props.group._id}`}>
        <h1>{props.group.title}</h1>
        </Link>
        <GroupActions {...props} />
      </div>

  );
};

export default GroupHeader;
