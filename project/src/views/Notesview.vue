<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const notes = ref([])
const loading = ref(true)

const fetchNotes = async () => {
  try {
    const data = await api.getNotes()
    notes.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchNotes)
</script>

<template>
  <div>
    <h1>Mes Post-it</h1>

    <p v-if="loading">Chargement...</p>

    <div v-else>
      <div v-for="note in notes" :key="note.id">
        <h3>{{ note.title }}</h3>
        <p>{{ note.content }}</p>

        <router-link :to="`/note/${note.id}`">
          Voir détail
        </router-link>
      </div>
    </div>
  </div>
</template> 