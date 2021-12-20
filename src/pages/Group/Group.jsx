import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// Services
import { getGroupById } from "../../services/groupService";

// Components
import PostCard from "../../components/PostCard/PostCard";

const Group = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState();

  const [ownerId, setOwnerId] = useState('') 
  const [isOwner, setIsOwner] = useState(false)

  function handleClick() {
    navigate(`/groups/${id}/posts`)
  }

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groupData = await getGroupById(id);
        console.log("Group Details Data:", groupData);
        setGroup(groupData);
        setOwnerId(groupData.owner)
        setIsOwner(props.user.profile === ownerId)
        console.log(isOwner)
      } catch (error) {
        throw error;
      }
    };
    fetchGroup();
  }, [id, isOwner, ownerId]);

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
            {group.posts?.map(post => (
              <PostCard post={post}/>
            ))}
          </>
        }
        {isOwner &&
          <>
            <Link to={`/groups/${id}/edit`}>Edit Group</Link>
          </>
        }
      </div>
      <button onClick={handleClick}>Create Post</button>
    </div>
  );
};

export default Group;
