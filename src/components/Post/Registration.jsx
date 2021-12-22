import React from 'react'

// Components
import BasicButton from '../MaterialUI/BasicButton'
import ImageAvatar from '../MaterialUI/ImageAvatar'
import AvatarGroup from '../MaterialUI/AvatarGroup'

const Registration = ({ eventDate, attendees, isAttending, handleClick }) => {

  const avatars = attendees?.map((avatar, idx) => <ImageAvatar image={avatar} key={idx}/>)

  return (
    <div className="registration-card">
      <div className="date-time-info">
        {eventDate}
      </div>
      <div className="attendees" style={{ display: "flex", justifyContent: "flex-start" }}>
        <AvatarGroup avatars={avatars}/>
      </div>
      <BasicButton text={"Going"} isActive={isAttending} handleClick={handleClick}/>
    </div>
  )
}

export default Registration