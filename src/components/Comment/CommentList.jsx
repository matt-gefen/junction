import React, { useState } from "react";

// Services
import { deleteComment } from "../../services/groupService";

// Components
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentList = (props) => {
  const [comments, setComments] = useState(props.comments);

  function addComment(comment) {
    setComments([...comments, comment]);
  }

  function removeComment(comment) {
    deleteComment(props.id, props.postId, comment._id);
    setComments(comments.filter((element) => element !== comment));
  }

  return (
    <>
      <CommentForm
        user={props.user}
        addComment={addComment}
        profile={props.profile}
      />
      {comments.map((comment) => (
        <Comment
          user={props.user}
          comment={comment}
          removeComment={removeComment}
          key={comment._id}
        />
      ))}
    </>
  );
};

export default CommentList;
