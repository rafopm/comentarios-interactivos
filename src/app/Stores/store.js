import { create } from 'zustand';
import data from '../../../public/data.json';

const findMaxId = (arr) => {
  let maxId = 0;
  arr.forEach((item) => {
    if (item.id > maxId) {
      maxId = item.id;
    }
  });
  return maxId;
};

const useStore = create((set) => ({
  currentUser: '',
  comments: [],
  lastCommentId: 0,

  // Nuevo método para realizar una solicitud HTTP y actualizar el estado
  fetchData: async () => {
    try {
      //const response = await fetch('/data.json');
      //const data = await response.json();

      // Actualizar el estado con los datos obtenidos
      const maxCommentId = findMaxId(data.comments);
      const maxReplyId = findMaxId(data.comments.flatMap((comment) => comment.replies));
      const maxId = Math.max(maxCommentId, maxReplyId);
      set({
        comments: data.comments,
        currentUser: data.currentUser,
        lastCommentId: maxId,
      });

      console.log(maxId)
      return data; // Retornar los datos obtenidos
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error; // Lanzar el error para que el consumidor pueda manejarlo
    }
  },

  // Guardar los comentarios en el Local Storage
  saveCommentsToLocalStorage: (comments) => {
    localStorage.setItem('comments', JSON.stringify(comments));
  },


  addComment: (comment) => {
    set((state) => ({
      comments: [...state.comments, comment],
    }));
  },
  deleteComment: (commentId) => {
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== commentId),
    }));
  },
  updateComment: (commentId, newContent, newScore, newReplies) => {
    set((state) => ({
      comments: state.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content: newContent,
            score: newScore,
            replies: newReplies,
          };
        }
        return comment;
      }),
    }));
  },
}));

export default useStore;