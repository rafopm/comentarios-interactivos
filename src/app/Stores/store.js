import { create } from 'zustand';

// Función auxiliar para encontrar el ID máximo en un array de comentarios
const findMaxId = (arr) => {
  if (!arr || arr.length === 0) {
    return 0;
  }
  let maxId = 0;
  arr.forEach((item) => {
    if (item.id > maxId) {
      maxId = item.id;
    }
    if (item.replies && item.replies.length > 0) {
      const repliesMaxId = findMaxId(item.replies);
      if (repliesMaxId > maxId) {
        maxId = repliesMaxId;
      }
    }
  });
  return maxId;
};

// Crear el estado global usando Zustand
const useStore = create((set) => {
  // Inicializar el estado con valores predeterminados
  set(() => ({
    currentUser: {},
    comments: [],
    lastCommentId: 0,
  }));

  // Definir funciones que modifican el estado
  return {
    // Función para cargar datos (comentarios) desde la red
    fetchData: async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();

        // Actualizar el estado con los datos obtenidos
        set(() => ({
          comments: data.comments,
          currentUser: data.currentUser,
          lastCommentId: findMaxId(data.comments),
        }));

        return useStore.getState();
      } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
      }
    },

    // Función para agregar un nuevo comentario
    addComment: (comment) => {
      const id = useStore.getState().lastCommentId + 1;
      const user = useStore.getState().currentUser;

      const newComment = {
        id,
        content: comment,
        createdAt: 'just now',
        score: 0,
        user,
        replies: [],
      };

      console.log("addComment",newComment)
      
      set((state) => {
        const newComments = [...state.comments, newComment];

        //  Guardar los comentarios actualizados
        state.saveComments();

        // Devolver el nuevo estado con los comentarios actualizados
        return { comments: newComments, lastCommentId: id };
      });
    },

    // Función para eliminar un comentario por su ID
    deleteComment: (commentId) => {
      set((state) => {
        const newComments = state.comments.filter((comment) => comment.id !== commentId);

        // Guardar los comentarios actualizados
        //state.saveComments();
        //state.lastCommentId = findMaxId(newComments);

        // Devolver el nuevo estado con los comentarios actualizados
        return { comments: newComments };
      });
    },

    // Función para actualizar un comentario por su ID con nuevo contenido, puntaje y respuestas
    updateComment: (commentId, newContent, newScore, newReplies) => {
      set((state) => {
        const newComments = state.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              content: newContent,
              score: newScore,
              replies: newReplies,
            };
          }
          return comment;
        });

        // Actualizar el estado con los comentarios obtenidos
        state.saveComments();

        // Devolver el nuevo estado con los comentarios actualizados
        return { comments: newComments };
      });
    },

    // Función para guardar comentarios en la red (simula una solicitud de red)
    saveComments: async () => {
      try {
        // Simular una solicitud de red para guardar los comentarios
        // Puedes enviar los comentarios al servidor en una aplicación real
        console.log('Guardando comentarios en la red...');

        // En una aplicación real, puedes usar fetch u otra lógica para enviar los datos al servidor
        // await fetch('/save-comments', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(useStore.getState().comments),
        // });

        console.log('Comentarios guardados en la red');
      } catch (error) {
        console.error('Error al guardar comentarios en la red:', error);
        throw error;
      }
    },
  };
});

// Exportar el estado para su uso en otros módulos
export default useStore;