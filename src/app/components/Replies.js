import Image from 'next/image';
import React from 'react'
import useStore from "../Stores/store";
import Styles from '../styles/Home.module.css'

const Replies = ({ reply, OnDeleteReply }) => {
  const { currentUser } = useStore();

  console.log('replies', reply);
  return (
    <div className={Styles.containerReplys}>
      <div className={Styles.lineReply}>

      </div>
      <div></div>
      <div>
        <div className={Styles.commentContainer}>
          <div className={Styles.scoreEdit}>
            <div className={Styles.iconPlus}>
              <Image
                width={11}
                height={11}
                src={'images/icon-plus.svg'}
                alt={reply.user.username}
              />
            </div>
            <div className={Styles.scoreNumber}>
              {reply.score}</div>
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
                  src={reply.user.image.png}
                  alt={reply.user.username}
                />
              </div>
              <div className={Styles.commentUserName}>
                {reply.user.username}
              </div>
              {currentUser.username === reply.user.username && (
                <div className={Styles.commentYou}>
                  you
                </div>
              )}
              <div className={Styles.commentCreatedAt}>
                {reply.createdAt}
              </div>
              {currentUser.username === reply.user.username && (
                <div className={Styles.commentDelete}
                onClick={() => onDelete(reply.id)}>
                  <Image
                    width={13}
                    height={12}
                    src={'images/icon-delete.svg'}
                    alt={'Icono eliminar'}
                  />
                  Delete</div>
              )}
              <div className={Styles.commentEditReply}>
                {currentUser.username === reply.user.username ? (
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
              {reply.content}
            </div>
          </div>
        </div>
        <div> <span> </span></div>
      </div>
    </div>
  )
}

export default Replies