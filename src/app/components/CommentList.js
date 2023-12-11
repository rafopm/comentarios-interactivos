import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onDelete }) => {
  return (
    <div>

      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CommentList;