import React from 'react'
import { Link } from "react-router-dom";
import styles from './Card.module.css'

// Components
import GroupActions from './GroupActions'
import GroupHeader from '../GroupHeader/GroupHeader'

const GroupCard = (props) => {
// console.log("GroupCardProps",props)
  return (
  <>
    <div className={styles.groupCard}>

      <div className={styles.cardHeader}>
      {props.user &&
      <> 
      <GroupHeader {...props} />
      </>}
      </div>

        <div claseName="link-div">
        <Link to={`/groups/${props.group._id}`}>

        
      <div className={styles.groupAvatar}>
        
          <img className={styles.image} src={props.group.avatar} alt="group avatar"/>
        
      </div>

      <div>
        <h4 className={styles.groupCategory}>Category:  {props.group.category}</h4>
      </div>

      <div className={styles.groupMembers}>
      </div>
      <div className={styles.groupMembers}>
        <p><bold>Posts: {props.group.posts.length}</bold><br/>
        <bold>Members: {props.group.members.length}</bold>
        </p>
      </div>
      </Link>
      </div>
    </div>
  </>
  )
}

export default GroupCard