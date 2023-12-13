'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import CommentList from './components/CommentList';
import Styles from './styles/Home.module.css'
import useStore from './Stores/store';

export default function Home() {
  const { fetchData, currentUser, comments } = useStore();
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData();
        console.log('Datos obtenidos:', data);
      } catch (error) {
        console.error('Error al obtener datos en el componente:', error);
      }
    };

    fetchDataAsync();
  }, [fetchData]);
  // const [comments, setComments] = useState([]);
  // const [currentUser, setCurrentUser] = useState([]);

  // useEffect(() => {
  //   // Fetch the data from the JSON file
  //   async function fetchdata() {
  //     const response = await fetch('/data.json');
  //     const data = await response.json();

  //     setComments(data.comments);
  //     setCurrentUser(data.currentUser);
  //   }

  //   fetchdata();
  // }, []);

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

  console.log(currentUser.image)
  return (
    <main className={Styles.main}>
      <div className={Styles.container}>
        <div className={Styles.description}>
          <CommentList comments={comments} onDelete={handleDeleteComment} />
          <div className={Styles.commentAddContainer}>
            <div>
              <Image
                width={34}
                height={34}
                src={currentUser.image?.png}
                alt={currentUser.username}
              />

            </div>
            <div className={Styles.commentAddNew}>
              Add comment</div>
            
              <button  className={Styles.commentAddButton}>SEND</button>
           
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
