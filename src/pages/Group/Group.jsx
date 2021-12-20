import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// Services
import { getGroupById, updateGroup } from "../../services/groupService";
import { updateProfile, getProfileById } from "../../services/profileService";

// Components

const Group = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState();
  const [profile, setProfile] = useState()

  const [ownerId, setOwnerId] = useState('') 
  const [isOwner, setIsOwner] = useState(false)
  const [isMember, setIsMember] = useState(false)


  function handleClick() {
    navigate(`/groups/${id}/posts`)
  }

  function handleJoinGroup() {
    updateGroup(group._id, {
      ...group,
      members: [...group.members, profile]
    })
    updateProfile(profile._id, {
      ...profile,
      joined_groups: [...profile.joined_groups, group._id]
    })
    setIsMember(true)
  }

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groupData = await getGroupById(id);
        const profileData = await getProfileById(props.user.profile)
        console.log("Group Details Data:", groupData);
        setGroup(groupData);
        setProfile(profileData)
        setOwnerId(groupData.owner)
        setIsOwner(props.user.profile === ownerId)
        let members = groupData.members.map((member) => {
          return member._id
        })
        setIsMember(members.includes(props.user.profile))
        
      } catch (error) {
        throw error;
      }
    };
    fetchGroup();
  }, [props.user.profile, isMember, id, isOwner, ownerId]);

  return (
    <div className="layout">
      <div className="group-details">
      {group &&
          <>
            <img src={group.avatar} alt="" style={{width:"150px"}}/>
            <h2 style={{color:"black"}}>{group.title}</h2>
            <h3>{group.category}</h3>
            <h4>{group.location}</h4>
          </>
        }
      {!isMember &&
        <div>
          <button onClick={handleJoinGroup}>Join Group</button>
        </div>
      }


        {isOwner &&
          <>
            <button><Link to={`/groups/${id}/edit`}>Edit Group</Link></button>
          </>
        }
      </div>
      {isMember &&
        <>
          <button onClick={handleClick}>Create Post</button>
        </>
      }
      
    </div>
  );
};

export default Group;
