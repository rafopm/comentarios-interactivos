'use client'
import { useState } from "react";
import Replies from "./replies";

const Comment = ({ comment, onDelete }) => {
  const [replys, setReplys] = useState([]);

  const handleDeleteReply = (replyId) => {
    const updatedReply = comment.replies.filter(reply=> reply.id !== replyId);
    setComments(updatedReply);
  };

  return (
    <div>
      <p>{comment.content}</p>
      <p>{comment.createdAt}</p>
      <p>Score: {comment.score}</p>
      <p>By: {comment.user.username}</p>
      <button onClick={() => onDelete(comment.id)}>Eliminar</button>
      {
        comment.replies?.map(reply => (

          <Replies key={reply.id} reply={reply} OnDeleteReply={handleDeleteReply} />

        ))
      }

    </div>
  );
};

export default Comment;