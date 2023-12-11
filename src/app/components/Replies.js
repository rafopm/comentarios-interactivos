import React from 'react'

const Replies = ({reply, OnDeleteReply}) => {

  console.log('replies',reply);
  return (
    <div>
      
      <p>{reply.content}</p>
      <p>{reply.createdAt}</p>
      <p>Score: {reply.score}</p>
      <p>By: {reply.user.username}</p>
      <button onClick={() => OnDeleteReply(reply.id)}>Eliminar</button>

    </div>
  )
}

export default Replies