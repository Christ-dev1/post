import { createRouter, createWebHistory } from 'vue-router'
import Notes from '../components/Notes.vue'
import Note from '../components/Note.vue'
import CreatePostit from '../views/CreatePostit.vue'
import Modifier from '../components/Modifier.vue'
const routes = [
  {
    path: '/', component: Notes
  },
  {
    path: '/note/:id', component: Note
  },
  {
    path: '/create', component: CreatePostit
  },
  {
    path: '/edit/:id', component: Modifier
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
