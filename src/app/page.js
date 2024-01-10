'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import CommentList from './components/CommentList';
import Styles from './styles/Home.module.css'
import useStore from './Stores/store';

export default function Home() {
  const {
    fetchData,
    currentUser,
    comments,
    saveCommentsToLocalStorage,
    addComment,
    updateComment,
    deleteComment,
  } = useStore();

  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData();

        if (data.currentUser) {
          console.log('CurrentUser', data.currentUser.image);
        } else {
          console.log('CurrentUser no está presente');
        }
        
      } catch (error) {
        console.error('Error al obtener datos en el componente:', error);
      }
    };

    fetchDataAsync();
  }, [fetchData]);

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    addComment(newComment);
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
  };

  const handleUpdateComment = (commentId, newContent, newScore, newReplies) => {
    updateComment(commentId, newContent, newScore, newReplies);
  };

  // Renderizar solo si currentUser existe
  if (!currentUser) {
    return null; // o puedes mostrar un mensaje de carga o lo que prefieras
  }

 
  return (
    <main className={Styles.main}>
      <div className={Styles.container}>
        <div className={Styles.description}>
          <CommentList comments={comments} onDelete={handleDeleteComment} onUpdate={handleUpdateComment} />
          <div className={Styles.commentAddContainer}>
            <div>
              <Image
                width={34}
                height={34}
                src={currentUser.image?.png}
                alt={currentUser.username}
              />

            </div>
            <textarea type="text" className={Styles.commentAddNew} placeholder="Add a comment..." value={newComment} onChange={handleChange}/>
            <button className={Styles.commentAddButton} onClick={handleAddComment}>SEND</button>

          </div>
        </div>

        <div className={Styles.contenedorTemplate}>
          {/* <img
            className={Styles.imagentemplate}
            src="/design/desktop-design.jpg"
            alt="Descripción de la imagen"
          ></img> */}
        </div>
      </div>
    </main>
  )
}
