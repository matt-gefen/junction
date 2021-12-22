import React, { useEffect, useState } from 'react'

// Services
import { getProfileById } from '../../services/profileService'

// Components
import BasicButton from '../MaterialUI/BasicButton'
import ImageAvatar from '../MaterialUI/ImageAvatar'

const Registration = ({ eventDate, attendees, isAttending, handleClick }) => {
  const [attendingAvatars, setAttendingAvatars] = useState([])
  useEffect(() => {
    attendees.forEach(async attendee => {
      const profileData = await getProfileById(attendee)
      console.log('Attendee profile data:', profileData.avatar)
      setAttendingAvatars([...attendingAvatars, profileData.avatar])
    })
  }, [])

  return (
    <div className="registration-card">
      <div className="date-time-info">
        {eventDate}
      </div>
      <div className="attendees">
        {attendingAvatars?.map(avatar => <ImageAvatar image={avatar}/>)}
      </div>
      <BasicButton text={"Going"} isActive={isAttending} handleClick={handleClick}/>
    </div>
  )
}

export default Registration