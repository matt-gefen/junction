import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from './Group.module.css'

// Services
import { getGroupById, updateGroup } from "../../services/groupService";
import { updateProfile, getProfileById } from "../../services/profileService";

// Components
import PostCard from "../../components/PostCard/PostCard";

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

  function handleLeaveGroup() {
    let newMembers = []
    group.members.forEach((element) => {
      if(element._id !== profile._id) {
        newMembers.push(element)
      }
    })

    let newGroups = []
    profile.joined_groups.forEach((element) => {
      if(element._id !== group._id) {
        newGroups.push(element)
      }
    })

    updateGroup(group._id, {
      ...group,
      members: newMembers
    })
    updateProfile(profile._id, {
      ...profile,
      joined_groups: newGroups
    })
    setIsMember(false)
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
        console.log(isMember)
      } catch (error) {
        throw error;
      }
    };
    fetchGroup();
  }, [props.user.profile, isMember, id, isOwner, ownerId]);

  // console.log('Group data:', group?.posts)

  // const posts = group?.posts.map(post => (
  //   <PostCard post={post}/>
  // ))

  // console.log(posts)

  return (
    <div className="layout">
      <div className="group-details">
      {group &&
          <>
            <img src={group.avatar} alt="" style={{width:"150px"}}/>
            <h2 style={{color:"black"}}>{group.title}</h2>
            <h3>{group.category}</h3>
            <h4>{group.location}</h4>
            <section className={styles.container}>
              {group.posts?.map(post => (
                <PostCard post={post}/>
              ))}
            </section>
          </>
        }
      {!isMember &&
        <div>
          <button onClick={handleJoinGroup}>Join Group</button>
        </div>
      }
      {isMember && !isOwner &&
        <div>
          <button onClick={handleLeaveGroup}>Leave Group</button>
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
