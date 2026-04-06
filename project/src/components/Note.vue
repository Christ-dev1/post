<script setup>

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'


const route = useRoute()
const note = ref(null)
const loading = ref(true)
const color = ref('#ffffff')//couleur blanche

const fetchNote = async () => {
  try{
    const response = await api.getNotes()
    const notesArray = response.data.notes || response.data
    note.value = notesArray.find(n => n._id === route.params.id)
  }
  catch(error){
    console.error(error)
  }
  finally{
    loading.value = false
  }
}
onMounted(() => {
  fetchNote()
  if (route.query.color){
    color.value = route.query.color
  }
})
</script>

<template>
  <main>
    <router-link to="/" class="back-link">Retour a la liste de tous les  post-it</router-link>

    <div v-if="loading" class="container-detail">
    <div class="post-it skeleton">
    <div class="skeleton-title"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line short"></div>
  </div>
</div>

<div v-else-if="note" class="container-detail">
  <div class="post-it" :style="{backgroundColor: color}">
    <h1>{{  note.title }}</h1>

    <div class="content">

      <div v-if="Array.isArray(note.content)">

        <p v-for="(line, index)  in note.content" :key="index">{{ line }}</p>
          </div>
          <div v-else>
            <p>{{  note.content }}</p>
          </div>
        </div>
        </div>
    </div>
    <p v-else>Note introuvable</p>

</main>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');



main {
  font-family: 'Inter', sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
}

.container-detail {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Le style Post-it */

.post-it {
  border-radius: 15px;
  padding: 18px;
  max-width: 500px;
  min-height: 400px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  transition: all 0.25s ease;
  text-decoration: none;
  color: #333;
  position: relative;
  overflow: hidden;
  width: 100%;

}

h1 {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.content {
  line-height: 1.6;
  color: #333;
  font-size: 1.1rem;
}


</style>
