import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://postit.zoul.dev',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  createNote(note) {
    return apiClient.post('/notes', note);
  },

  getNotes() {
    return apiClient.get('/notes');
  },

  deleteNote(id) {
    return apiClient.delete(`/notes/${id}`);
  },

  updateNote(id, note) {
    return apiClient.put(`/notes/${id}`, note);
  }
}




