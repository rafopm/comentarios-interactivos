'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import CommentList from './components/CommentList';
import styles from './page.module.css'

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
    <main className={styles.main}>
      <div className={styles.description}>
        <CommentList comments={comments} onDelete={handleDeleteComment} />
      </div>
    </main>
  )
}
