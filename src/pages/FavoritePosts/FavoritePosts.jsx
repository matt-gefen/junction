import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './Group.module.css'

// Services
import { updateProfile, getProfileById } from "../../services/profileService";

// Components
import PostCard from "../../components/PostCard/PostCard";

const FavoritePosts = (props) => {
  const { id } = useParams();
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
  }, [props.user.profile]);

  console.log(props.user)

  return (
    <div className="layout">
      <div className="group-details">
          <>
            <section className={styles.container}>
              {posts?.map(post => (
                <PostCard user={props.user} groupId={post.group} post={post} profile={profile}/>
              ))}
            </section>
          </>
        </div>
    </div>
  );
};

export default FavoritePosts;
