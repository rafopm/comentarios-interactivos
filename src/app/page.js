'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import CommentList from './components/CommentList';
import Styles from './styles/Home.module.css'

export default function Home() {

  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    // Fetch the data from the JSON file
    async function fetchdata() {
      const response = await fetch('/data.json');
      const data = await response.json();

      setComments(data.comments);
      setCurrentUser(data.currentUser);
    }

    fetchdata();
  }, []);

  useEffect(() => {
    // Save the comments to local storage
    localStorage.setItem('comments', JSON.stringify({ comments }));
  }, [comments]);

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  return (
    <main className={Styles.main}>
      <div className={Styles.container}>
        <div className={Styles.description}>
          <CommentList comments={comments} onDelete={handleDeleteComment} />
        </div>
        <div className={Styles.contenedorTemplate}>
          <img
            className={Styles.imagentemplate}
            src="/design/desktop-design.jpg"
            alt="Descripción de la imagen"
          ></img>
        </div>
      </div>
    </main>
  )
}
