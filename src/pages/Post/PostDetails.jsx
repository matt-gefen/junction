import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PostDetails.module.css";

// Services
import {
  getPostById,
  updatePost,
  deletePost,
} from "../../services/groupService";
import { updateProfile, getProfileById } from "../../services/profileService";

// Components
import AlertDialogue from "../../components/MaterialUI/AlertDialogue";
import CommentList from "../../components/Comment/CommentList";
import BasicButton from "../../components/MaterialUI/BasicButton";
import ImageAvatar from '../../components/MaterialUI/ImageAvatar'
import Registration from "../../components/Post/Registration";

const PostDetails = (props) => {
  const { id, postId } = useParams();
  const [post, setPost] = useState({
    group: "",
    title: "",
    createdAt: "",
    owner: "",
    thumbnail: "",
    description: "",
    link: "",
    location: "",
    date: "",
    hasRegistration: false,
    registration: [],
    comments: [],
  });
  const [profile, setProfile] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAttending, setIsAttending] = useState(false);
  const [attendingMembers, setAttendingMembers] = useState([]);
  const navigate = useNavigate();

  function routeToEditPost() {
    navigate(`/groups/${id}/posts/${postId}/edit`);
  }

  function handleFavoritePost() {
    updateProfile(profile._id, {
      ...profile,
      favorited_posts: [...profile.favorited_posts, post._id],
    });

    if (isFavorite === false) {
      setIsFavorite(true);
    }
  }

  function handleUnfavorite() {
    let newFavorites = [];
    profile.favorited_posts.forEach((element) => {
      if (element._id !== post._id) {
        newFavorites.push(element);
      }
    });
    updateProfile(profile._id, {
      ...profile,
      favorited_posts: newFavorites,
    });
    setIsFavorite(false);
  }

  function handleRegistration() {
    isAttending ? handleUnattendEvent() : handleAttendEvent();
  }

  const handleAttendEvent = async () => {
    console.log(`${profile._id} is attending this event ${profile.avatar}`);
    await updateProfile(profile._id, {
      ...profile,
      registered_events: [...profile.registered_events, post._id],
    });
    await updatePost(id, postId, {
      ...post,
      registration: [...post.registration, profile._id],
      registeredAvatars: [...post.registeredAvatars, profile.avatar],
    });
    setPost({
      ...post,
      registration: [...post.registration, profile._id],
      registeredAvatars: [...post.registeredAvatars, profile.avatar],
    });
    setIsAttending(true);
  };

  function handleUnattendEvent() {
    let newRegisteredEvents = profile.registered_events.filter(
      (event) => event !== post._id
    );
    updateProfile(profile._id, {
      ...profile,
      registered_events: newRegisteredEvents,
    });
    let memberAvatarIdx = 0;
    const newMemberRegistration = post.registration.filter((member, idx) => {
      if (member === profile._id) {
        memberAvatarIdx = idx;
      }
      return member !== profile._id;
    });
    const newRegisteredAvatars = post.registeredAvatars.filter(
      (avatar, idx) => idx !== memberAvatarIdx
    );
    updatePost(id, postId, {
      ...post,
      registration: newMemberRegistration,
      registeredAvatars: newRegisteredAvatars,
    });
    setPost({
      ...post,
      registration: newMemberRegistration,
      registeredAvatars: newRegisteredAvatars,
    });
    setIsAttending(false);
  }

  function confirmDeletePost() {
    deletePost(id, postId);
    navigate(-1);
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(id, postId);
        const profileData = await getProfileById(props.user.profile);
        console.log("Post data:", postData);
        setPost(postData);
        setProfile(profileData);
        setIsOwner(props.user.profile === postData.owner);
        let favorites = profileData.favorited_posts.map((element) => {
          return element._id;
        });
        setIsFavorite(favorites.includes(postData._id));
        setIsAttending(
          profileData.registered_events.some((event) => event._id === postId)
        );
        setAttendingMembers(postData.registration);
      } catch (error) {
        throw error;
      }
    };
    fetchPost();
  }, []);

  let date = new Date(post.createdAt);
  let eventDate = new Date(post.date);

  console.log(eventDate.toLocaleDateString() === 'Invalid Date' ? false : true)

  return (
    <div className="post-layout">
      <div className={styles.groupDetailButtons}>
        {!isFavorite && (
          <button className={styles.hiddenButton} onClick={handleFavoritePost}>
            <BasicButton text={"Favorite Post"} />
          </button>
        )}
        {isFavorite && (
          <button className={styles.hiddenButton} onClick={handleUnfavorite}>
            <BasicButton text={"Unfavorite Post"} />
          </button>
        )}
        {isOwner && (
          <>
            {/* <button onClick={routeToEditPost}>Edit Post</button> */}
            <button className={styles.hiddenButton} onClick={routeToEditPost}>
              <BasicButton text={"Edit Post"} />
            </button>
            <AlertDialogue
              handleConfirm={confirmDeletePost}
              buttonText="Delete Post"
              content="Are you sure you want to delete this post? This action cannot be undone!"
              confirmOption="Delete Post"
              cancelOption="Cancel"
            />
          </>
        )}
      </div>
      <div className={styles.postDetails}>
        <div className={styles.header}>
          <ImageAvatar image={profile?.avatar}/>
          <div className={styles.headerInfo}>
            <h3 className={styles.headerTitle}>{post.title}</h3>
            <div className={styles.date}>
              {`${date.toLocaleDateString()} at ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes() > 0 ? date.getMinutes() : date.getMinutes() + "0"}${date.getHours() > 12 ? "pm" : "am"}`}
            </div>
          </div>
        </div>
        <div className="post-thumbnail">
          <img
            className={styles.thumbnail}
            src={post.thumbnail}
            alt="Post thumbnail"
          />
        </div>
        <div className={styles.container}>
          {post.description}
        </div>
        <div className={styles.container}>
          {/* <a href={post.link} target="_blank"> */}
            {post.link}
          {/* </a> */}
        </div>
        {post.location && 
          <div className={styles.container}>
            <h3>Location</h3>
            {post.location}
          </div>
        }
        {post.hasRegistration && 
          <div className={eventDate.toLocaleDateString() === 'Invalid Date' ? styles.hidden : ''}>
            <h3>Event Date</h3>
            <div className="post-event-date">
              {`${eventDate.toLocaleDateString()} at ${
                eventDate.getHours() > 12
                  ? eventDate.getHours() - 12
                  : eventDate.getHours()
              }:${eventDate.getMinutes() > 0 ? eventDate.getMinutes() : eventDate.getMinutes() + "0"}${
                eventDate.getHours() > 12 ? "pm" : "am"
              }`}
            </div>
          </div>
        }
        {post.hasRegistration && (
          <div className={styles.container}>
            <h3>Post Registration</h3>
              <Registration
                eventDate=""
                attendees={post.registeredAvatars}
                isAttending={isAttending}
                handleClick={handleRegistration}
              />
          </div>
        )}
        <div className="post-comments-container">
          {post.title && (
            <CommentList
              groupId={id}
              postId={postId}
              comments={post.comments}
              user={props.user}
              profile={profile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
