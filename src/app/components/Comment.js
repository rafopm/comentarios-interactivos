'use client'
import { useState } from "react";
import Replies from "./Replies";
import Styles from '../styles/Home.module.css'
import Image from "next/image";
import useStore from "../Stores/store";

const Comment = ({ comment, onDelete, onUpdate }) => {
  const [replys, setReplys] = useState([]);
  const { currentUser } = useStore();

  console.log("Comment", comment)
  const handleDeleteReply = (replyId) => {
    const updatedReply = comment.replies.filter(reply => reply.id !== replyId);
    setReplys(updatedReply);
  };

  const handleScore = (increment) => {
    const newScore = comment.score + increment;
    onUpdate(comment.id, comment.content, newScore, comment.replies);
  };

  return (
    <div >
      <div className={Styles.commentContainer}>
        <div className={Styles.scoreEdit}>
          <div className={Styles.iconPlus} onClick={() => handleScore(1)}>
            <Image
              width={11}
              height={11}
              src={'images/icon-plus.svg'}
              alt={comment.user.username}
            />
          </div>
          <div className={Styles.scoreNumber}>
            {comment.score}</div>
          <div className={Styles.iconMinus}>
            <Image
              width={11}
              height={3}
              src={'images/icon-minus.svg'}
              alt={'Icono menos'}
            />
          </div>

        </div>
        <div className={Styles.commentDetail}>
          <div className={Styles.commentHeader}>
            <div>
              <Image
                width={32}
                height={32}
                src={comment.user.image.png}
                alt={comment.user.username}
              />
            </div>
            <div className={Styles.commentUserName}>
              {comment.user.username}
            </div>
            {currentUser.username === comment.user.username && (
              <div className={Styles.commentYou}>
                You
              </div>
            )}
            <div className={Styles.commentCreatedAt}>
              {comment.createdAt}
            </div>
            {currentUser.username === comment.user.username && (
              <div onClick={() => onDelete(comment.id)} className={Styles.commentDelete}>
                <Image
                  width={13}
                  height={12}
                  src={'images/icon-delete.svg'}
                  alt={'Icono eliminar'}
                />
                Delete</div>
            )}
            <div className={Styles.commentEditReply}>
              {currentUser.username === comment.user.username ? (
                <div className={Styles.commentEdit}>
                  <Image
                    width={13}
                    height={12}
                    src={'images/icon-edit.svg'}
                    alt={'Icono editar'}
                  />
                  Edit</div>
              ) : (
                <div className={Styles.commentReply}>
                  <div>
                    <Image
                      width={13}
                      height={12}
                      src={'images/icon-reply.svg'}
                      alt={'Icono responder'}
                    />
                  </div>
                  <div>Reply</div>

                </div>
              )}
            </div>
          </div>
          <div className={Styles.commentContent}>
            {comment.content}
          </div>
        </div>
      </div>
      <div className={Styles.containerReplys}>
        <div className={Styles.lineContainer}>
          <div className={Styles.separator}>

          </div>
          <div className={Styles.lineReply}>
          </div>
        </div>
        <div>
          {comment.replies?.map(reply => (
            <Replies key={reply.id} reply={reply} OnDeleteReply={handleDeleteReply} />
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default Comment;