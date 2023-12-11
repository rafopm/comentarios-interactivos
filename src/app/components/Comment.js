'use client'
import { useState } from "react";
import Replies from "./replies";
import Styles from '../styles/Home.module.css'
import Image from "next/image";

const Comment = ({ comment, onDelete }) => {
  const [replys, setReplys] = useState([]);

  const handleDeleteReply = (replyId) => {
    const updatedReply = comment.replies.filter(reply => reply.id !== replyId);
    setComments(updatedReply);
  };

  return (
    <div>
      <div className={Styles.commentContainer}>
        <div className={Styles.scoreEdit}>
          <div><button>+</button> </div>
          <div>{comment.score}</div>
          <div><button>-</button></div>

        </div>
        <div className={Styles.commentDetail}>
          <Image
          width={32}
          height={32}
          src={comment.user.image.png}
          alt={comment.user.username}
          />
          <p>{comment.content}</p>
          <p>{comment.createdAt}</p>
          <p> </p>
          <p>By: {comment.user.username}</p>
          <button onClick={() => onDelete(comment.id)}>Eliminar</button>

        </div>
      </div>
      {
        comment.replies?.map(reply => (

          <Replies key={reply.id} reply={reply} OnDeleteReply={handleDeleteReply} />

        ))
      }

    </div>
  );
};

export default Comment;