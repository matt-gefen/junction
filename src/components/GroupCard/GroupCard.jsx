import React from 'react'
import { Link } from "react-router-dom";
import styles from './Card.module.css'

// Components
import GroupActions from './GroupActions'

const GroupCard = (props) => {
// console.log("GroupCardProps",props)
  return (
  <>
    <div className={styles.groupCard}>

      <div className={styles.cardHeader}>
      {props.user &&
      <> 
      <GroupActions {...props} />
      </>}
      </div>

      <div className={styles.groupTitle}>
        <Link to={`/groups/${props.group._id}`}><h2>{props.group.title}</h2></Link>
      </div>

      <div className={styles.groupAvatar}>
        <Link to={`/groups/${props.group._id}`}>
          <img className={styles.image} src={props.group.avatar} alt="group avatar"/>
        </Link>
      </div>

      <div className={styles.groupMembers}>

      </div>
        {/* {props.group.members} */}
    </div>
  </>
  )
}

export default GroupCard