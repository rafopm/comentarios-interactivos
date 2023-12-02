const Comment = ({ comment, onDelete }) => {
    return (
      <div>
        <p>{comment.content}</p>
        <p>{comment.createdAt}</p>
        <p>Score: {comment.score}</p>
        <p>By: {comment.user.username}</p>
        <button onClick={() => onDelete(comment.id)}>Eliminar</button>
      </div>
    );
  };
  
  export default Comment;