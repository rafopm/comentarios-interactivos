'use client'
import { useState } from "react";
import Replies from "./replies";
import Styles from '../styles/Home.module.css'
import Image from "next/image";
import useStore from "../Stores/store";

const Comment = ({ comment, onDelete }) => {
  const [replys, setReplys] = useState([]);
  const { currentUser } = useStore();

  const handleDeleteReply = (replyId) => {
    const updatedReply = comment.replies.filter(reply => reply.id !== replyId);
    setComments(updatedReply);
  };

  console.log('userActual', currentUser.username);
  console.log('usercomment', comment.user.username);
  return (
    <div>
      <div className={Styles.commentContainer}>
        <div className={Styles.scoreEdit}>
          <div className={Styles.iconPlus}>
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
              <div onClick={() => onDelete(comment.id)}>
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
      <div>
        <div>
          
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