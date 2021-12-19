import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GroupUpdateForm from "../../components/GroupUpdateForm/GroupUpdateForm";
import styles from './UpdateGroup.module.css'

const UpdateGroup = (props) => {
  const { id } = useParams();
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <main className={styles.container}>
      <h1>Update Group</h1>
      <p>{message}</p>
      <GroupUpdateForm {...props} updateMessage={updateMessage} groupId={id}/>
    </main>
  );
};

export default UpdateGroup;
