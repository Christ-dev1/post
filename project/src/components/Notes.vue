<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const notes = ref([])
const isLoading = ref(true)
const colors =
    [
        '#FFF9C4', // Jaune
        '#FFECB3', // Ambre
        '#DCEDC8', // Vert
        '#B2EBF2', // Cyan
        '#D1C4E9', // Violet
        '#F8BBD0', // Rose
        '#FFCCBC', // Orange
        '#E1BEE7'  // Mauve
    ]

const fetchNotes = async () => {
    try {
        const response = await api.getNotes()
        console.log("DONNEES API :", response.data)
        notes.value = response.data.notes || response.data

    }
    catch (error) {
        console.error("ERREUR DE CHARGEMENT:", error)

    }
    finally {
        isLoading.value = false
    }
}
const supprimer = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer ce post-it?")) {
        try {
            await api.deleteNote(id)
            notes.value = notes.value.filter(note => note._id !== id)
        }
        catch (error) {
            console.error("Erreu lors de la supression :", error)
            alert("Erreur lors de la supression")
        }
    }
}
onMounted(fetchNotes)

</script>

<template>
    <main class="max-w-6xl mx-auto p-8 font-sans">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-xl font-medium text-gray-800">MY POST-IT</h1>
            <router-link to="/create">
                <button
                    class="flex items-center gap-2 px-4 py-2 text-white rounded-xl bg-gradient-to-br from-indigo-500 to-black text-base">ADD
                    A POST-IT <span class="text-xl">+</span>
                </button>
            </router-link>

        </div>

        <div v-if="isLoading">CHARGEMENT ...</div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <router-link v-for="(note, index) in notes" :key="note._id" :to="{
                path: `/note/${note._id}`,
                query: { color: colors[index % colors.length] }
            }" class="flex flex-col justify-between p-5 min-h-[230px] rounded-2xl shadow-md transition-transform duration-300 hover:-translate-y-1.5 no-underline"
                :style="{ backgroundColor: colors[index % colors.length] }">

                <strong class="text-lg font-semibold text-gray-900 line-clamp-3">
                    {{ note.title }}
                </strong>

                <p class="mt-2 text-sm text-gray-700 line-clamp-4">
                    {{ Array.isArray(note.content) ? note.content[0] : note.content }}
                </p>

                <div class="flex gap-2 mt-4">
                    <router-link :to="{
                        path: `/edit/${note._id}`, query: { color: colors[index % colors.length] }
                    }" @click.stop="" class="flex-1">
                        <button class="w-full py-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded-lg">
                            Modifier
                        </button>
                    </router-link>
                    <button @click.stop.prevent="supprimer(note._id)"
                        class="flex-1 py-2 text-xs font-semibold text-red-500 bg-red-100 rounded-lg hover:bg-red-200">SUPRMER
                    </button>
                </div>
            </router-link>
        </div>
    </main>
</template>
