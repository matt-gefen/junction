import React, { useState } from 'react'

// Components
import BasicButton from '../MaterialUI/BasicButton'

const Registration = ({ eventDate, attendees, isAttending, handleClick }) => {
  return (
    <div className="registration-card">
      <div className="date-time-info">
        {eventDate}
      </div>
      <div className="attendees">
        {attendees}
      </div>
      <BasicButton text={"Going"} isAttending={isAttending} handleClick={handleClick}/>
    </div>
  )
}

export default Registration