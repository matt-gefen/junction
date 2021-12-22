import React from 'react'

// Components
import BasicButton from '../MaterialUI/BasicButton'
import ImageAvatar from '../MaterialUI/ImageAvatar'

const Registration = ({ eventDate, attendees, isAttending, handleClick }) => {

  return (
    <div className="registration-card">
      <div className="date-time-info">
        {eventDate}
      </div>
      <div className="attendees">
        {attendees?.map((avatar, idx) => {
          console.log(`Attendee ${idx}`)
        return <ImageAvatar image={avatar} key={idx}/>}
        )}
      </div>
      <BasicButton text={"Going"} isActive={isAttending} handleClick={handleClick}/>
    </div>
  )
}

export default Registration