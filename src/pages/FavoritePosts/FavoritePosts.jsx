import React, { useState, useEffect } from "react";
import PostCard from "../../components/PostCard/PostCard";

import styles from './FavoritePosts.module.css'

import { getProfileById } from "../../services/profileService";

const FavoritePosts = (props) => {
  
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchFavoritePosts = async () => {
      const profileData = await getProfileById(props.user._id)
      setPosts(profileData.favorited_posts)
      setProfile(profileData)
      console.log(profileData.favorited_posts)
    } 
    fetchFavoritePosts() 
  }, [props.user._id])

  return (
    <div className="layout">
    <div className="post-details">
        <section className={styles.container}>
          {posts?.map(post => (
            <PostCard user={props.user} post={post} profile={profile}/>
          ))}
        </section>
  
  </div>
</div>
);


}

export default FavoritePosts;