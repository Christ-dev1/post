<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
const router = useRouter()

// Champs du formulaire

const title = ref('')
const content = ref('')
const errorMsg = ref ('')
const isSubmitting = ref(false)


const createNote = async () => {
  if (!title.value.trim() || !content.value.trim()){
    errorMsg.value = "VEUILLEZ Remplir tous les champs"
    return
  }


  isSubmitting.value = true
  errorMsg.value= ''

  try {
    const response = await api.createNote({
      title: title.value,
      content: [content.value]
    })

    console.log('POST_IT créé avec succes :', response.data)

    router.push('/')
  }
  catch (err){
    console.error("ERREUR API!", err.response ? err.response.data : err)
    errorMsg.value = err.response?.data?.message || 'ERREUR LORS DE LA CREATION DU POST-IT'
  }
  finally{
    isSubmitting.value = false
  }
}


</script>

<template>
  <main>
      <router-link to="/" class="back-link"> Retour a la liste des post-it</router-link>

      <h1>CRER UN POST-IT</h1>
    <form @submit.prevent="createNote" class="form">
      <label>
        TITRE :
        <input  v-model="title" type="text" placeholder="Titre Du Post-it" >
      </label>

      <label>
        Contenu :
        <textarea v-model="content" placeholder="Contenu du Post-it"></textarea>
      </label>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'CREATION ...' : '  CREE Post-it' }}
      </button>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
   </form>

  </main>
</template>

<style scoped>
main {
  max-width: 600px;
  margin: 40px auto;
  font-family: 'Inter', sans-serif;
}


.back-link {
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
}


h1 {
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}

input, textarea {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  padding: 12px;
  border-radius: 6px;
  border: none;
  background: linear-gradient(135deg, #6366f1, #111);
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s ease;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: red;
  font-weight: 500;
  text-align: center;
}
</style>
