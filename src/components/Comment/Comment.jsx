import styles from './Comment.module.css'

const Comment = comment => {

  return (
    <>
      <div className="header">
        <img src={comment.avatar} alt="owner avatar" />
        <div className={styles.container}>
          <div className="owner-name">
            {comment.owner}
          </div>
          <div className="comment-date">
            {comment.date}
          </div>
        </div>
      </div>
      <div className="comment-content">
        {comment.content}
      </div>
    </>
  )
}

export default Comment