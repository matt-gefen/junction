import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './FavoritePosts.module.css'

// Services
import {getProfileById } from "../../services/profileService";

// Components
import PostCard from "../../components/PostCard/PostCard";

const FavoritePosts = (props) => {
  const [profile, setProfile] = useState()
  const [posts, setPosts] = useState()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const profileData = await getProfileById(props.user.profile)
        setProfile(profileData)
        setPosts(profileData.favorited_posts)
      } catch (error) {
        throw error;
      }
    };
    fetchPosts();
  }, [props.user.profile, posts]);

  return (
    <div className={styles.layout}>
        <h1>Favorite Posts</h1>
            <section className={styles.container}>
              {posts?.map(post => (
                <PostCard user={props.user} groupId={post.group} post={post} profile={profile}/>
              ))}
            </section> :
    </div>
  );
};

export default FavoritePosts;
