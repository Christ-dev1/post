<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'


const route = useRoute()
const router = useRouter()
const id = route.params.id

const note = ref({ title: '', content: ''})

const isLoading = ref(true)
const isSubmitting = ref(false)//securiter pour eviter le double click

const color = ref('#ffffff')//couleur blanc par defaut

const loadNote = async () => {
    try{
    const response = await api.getNotes()
    const allNotes = response.data.notes || response.data
    const found = allNotes.find(n => n._id === id)

  if (found){
    note.value = {
      title: found.title,
        content: Array.isArray(found.content) ? found.content[0] : found.content
          }
  }
  }
  catch(error){
    console.error("ERREUR CHARGEMENT:" ,error)
  }
  finally{
    isLoading.value = false
  }

}


const handleUpdate = async () => {
  if (isSubmitting.value) return // Si déjà en cours, on ne fait rien

  isSubmitting.value = true

  try {
    const updatedData = {
      title: note.value.title,
      content: [note.value.content]
    }

    const response = await api.updateNote(id, updatedData)

    // On vérifie le succès (200, 201 ou 204)
    if (response.status >= 200 && response.status < 300) {
      alert("Félicitations ! Le post-it a été modifié.")
      router.push('/')
    }
  } catch (error) {
    console.error("Erreur API:", error)
    alert("La modification a échoué.")
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  loadNote()

  if (route.query.color) {
    color.value = route.query.color
  }
})
</script>

<template>
  <main :style="{ backgroundColor: color }">
    <div class="header-edit" >
      <h1>Modifier le Post-it</h1>
      <button @click="router.push('/')" class="btn-back">Retour</button>
    </div>

    <div v-if="isLoading" class="loader">Chargement...</div>

    <form v-else @submit.prevent="handleUpdate" class="edit-form">
      <div class="field">
        <label>Titre du post-it</label>
        <input v-model="note.title" type="text" required />
      </div>

      <div class="field">
        <label>Contenu</label>
        <input v-model="note.content" required />
      </div>

      <div class="actions">
        <button type="button" @click="router.push('/')" class="btn-cancel">Annuler</button>
        <button type="submit" class="btn-save" :disabled="isSubmitting">
          {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications' }}
        </button>
      </div>
    </form>
  </main>
</template>

<style scoped>

.btn-save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: #9ca3af;
}

main {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
}

.header-edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.btn-back {
  background: transparent;
  border: 1px solid #4f46e5;
  color: #4f46e5;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
}

.edit-form {
  background: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.field {
  margin-bottom: 25px;
}

label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
}

input, textarea {
  width: 100%;
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-family: inherit;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus, textarea:focus {
  border-color: #4f46e5;
}

.actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.btn-save {
  flex: 2;
  background: linear-gradient(135deg, #6366f1, #111);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-cancel {
  flex: 1;
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}

.loader {
  text-align: center;
  color: #6b7280;
  padding: 50px;
}

</style>
