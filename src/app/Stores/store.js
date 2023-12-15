import { create } from 'zustand';

const useStore = create((set) => ({
  currentUser: '',
  comments: [],

  // Nuevo método para realizar una solicitud HTTP y actualizar el estado
  fetchData: async () => {
    try {
      const response = await fetch('/data.json');
      const data = await response.json();

      // Actualizar el estado con los datos obtenidos
      set({
        comments: data.comments,
        currentUser: data.currentUser,
      });

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
  updateComment: (commentId, updatedComment) => {
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId ? updatedComment : comment
      ),
    }));
  },
}));

export default useStore;