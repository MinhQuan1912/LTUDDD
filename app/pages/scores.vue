<template>
   <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header class="bg-white shadow-md">
         <div class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
               <div class="flex items-center space-x-4">
                  <NuxtLink to="/" class="p-2 hover:bg-gray-100 rounded-lg transition">
                     <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                     </svg>
                  </NuxtLink>
                  <h1 class="text-2xl font-bold text-gray-800">Score Management</h1>
               </div>

               <button @click="openCreateModal"
                  class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition shadow-lg transform hover:scale-105">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add New Score</span>
               </button>
            </div>
         </div>
      </header>

      
      <main class="container mx-auto px-6 py-8">
        
         <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div class="md:col-span-2">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Search by Student</label>
                  <input v-model="searchQuery" type="text" placeholder="Enter student name or code..."
                     class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500" />
               </div>
               <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">&nbsp;</label>
                  <button @click="clearFilter"
                     class="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                     Show All Scores
                  </button>
               </div>
            </div>
         </div>

        
         <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
               <table class="min-w-full">
                  <thead class="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                     <tr>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Student Code</th>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Student Name</th>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Subject</th>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Score</th>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Actions</th>
                     </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                     <tr v-for="score in filteredScores" :key="score.id" class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4">
                           <span
                              class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                              {{ score.student.studentCode }}
                           </span>
                        </td>
                        <td class="px-6 py-4 font-medium text-gray-800">{{ score.student.fullName }}</td>
                        <td class="px-6 py-4 text-gray-600">{{ score.subjectName }}</td>
                        <td class="px-6 py-4">
                           <span :class="getScoreClass(score.score)"
                              class="inline-block px-3 py-1 rounded-full text-sm font-bold">
                              {{ score.score.toFixed(1) }}
                           </span>
                        </td>
                        <td class="px-6 py-4">
                           <div class="flex space-x-2">
                              <button @click="editScore(score)"
                                 class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                 title="Edit">
                                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                       d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                 </svg>
                              </button>
                              <button @click="deleteScoreConfirm(score.id)"
                                 class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                 title="Delete">
                                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                 </svg>
                              </button>
                           </div>
                        </td>
                     </tr>
                     <tr v-if="filteredScores.length === 0">
                        <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                           <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                           </svg>
                           <p class="text-lg font-semibold">No scores found</p>
                           <p class="text-sm">Try adjusting your search or add a new score</p>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </main>

     
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
         <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div class="bg-gradient-to-r from-green-600 to-teal-600 p-6 rounded-t-2xl">
               <h2 class="text-2xl font-bold text-white">{{ editingScore ? 'Edit Score' : 'Add New Score' }}</h2>
            </div>

            <form @submit.prevent="saveScore" class="p-6">
               
               <div v-if="!editingScore" class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Select Student *</label>
                  <div class="relative">
                     <input v-model="studentSearch" @input="filterStudents" @focus="showStudentDropdown = true"
                        type="text" placeholder="Type student name or code..."
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                        required />

                    
                     <div v-if="showStudentDropdown && filteredStudentList.length > 0"
                        class="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                        <div v-for="student in filteredStudentList" :key="student.id" @click="selectStudent(student)"
                           class="px-4 py-3 hover:bg-green-50 cursor-pointer border-b last:border-b-0 transition">
                           <div class="flex items-center justify-between">
                              <div>
                                 <p class="font-semibold text-gray-800">{{ student.fullName }}</p>
                                 <p class="text-sm text-gray-500">{{ student.studentCode }}</p>
                              </div>
                              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{{ student.major ||
                                 'N/A' }}</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  
                  <div v-if="selectedStudent" class="mt-3 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                     <div class="flex items-center justify-between">
                        <div>
                           <p class="font-semibold text-green-800">{{ selectedStudent.fullName }}</p>
                           <p class="text-sm text-green-600">{{ selectedStudent.studentCode }}</p>
                        </div>
                        <button type="button" @click="clearSelectedStudent" class="text-red-500 hover:text-red-700">
                           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                 d="M6 18L18 6M6 6l12 12" />
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>

              
               <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Subject Name *</label>
                  <input v-model="formData.subjectName" type="text" required placeholder=""
                     class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500" />
               </div>

               
               <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Score (0-10) *</label>
                  <input v-model.number="formData.score" type="number" min="0" max="10" step="0.1" required
                     class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500" />
               </div>

               
               <div class="flex justify-end space-x-3">
                  <button type="button" @click="closeModal"
                     class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold">
                     Cancel
                  </button>
                  <button type="submit"
                     class="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition font-semibold shadow-lg">
                     {{ editingScore ? 'Update' : 'Create' }} Score
                  </button>
               </div>
            </form>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
definePageMeta({
   middleware: 'auth'
})

const api = useApi()
const scores = ref<any[]>([])
const students = ref<any[]>([])
const showModal = ref(false)
const editingScore = ref<any>(null)
const searchQuery = ref('')
const studentSearch = ref('')
const showStudentDropdown = ref(false)
const selectedStudent = ref<any>(null)
const filteredStudentList = ref<any[]>([])

const formData = ref({
   studentId: null as number | null,
   subjectName: '',
   score: 0
})

const filteredScores = computed(() => {
   if (!searchQuery.value) return scores.value
   const query = searchQuery.value.toLowerCase()
   return scores.value.filter((s: any) =>
      s.student.fullName.toLowerCase().includes(query) ||
      s.student.studentCode.toLowerCase().includes(query)
   )
})

const getScoreClass = (score: number) => {
   if (score >= 8.0) return 'bg-green-100 text-green-800'
   if (score >= 6.5) return 'bg-yellow-100 text-yellow-800'
   if (score >= 5.0) return 'bg-orange-100 text-orange-800'
   return 'bg-red-100 text-red-800'
}

const filterStudents = () => {
   if (!studentSearch.value) {
      filteredStudentList.value = students.value.slice(0, 10)
      return
   }
   const query = studentSearch.value.toLowerCase()
   filteredStudentList.value = students.value.filter((s: any) =>
      s.fullName.toLowerCase().includes(query) ||
      s.studentCode.toLowerCase().includes(query)
   ).slice(0, 10)
}

const selectStudent = (student: any) => {
   selectedStudent.value = student
   studentSearch.value = `${student.studentCode} - ${student.fullName}`
   formData.value.studentId = student.id
   showStudentDropdown.value = false
}

const clearSelectedStudent = () => {
   selectedStudent.value = null
   studentSearch.value = ''
   formData.value.studentId = null
   showStudentDropdown.value = true
}

const loadScores = async () => {
   const { data } = await api.getScores()
   if (data) scores.value = data as any[]
}

const loadStudents = async () => {
   const { data } = await api.getStudents()
   if (data) {
      students.value = data as any[]
      filteredStudentList.value = students.value.slice(0, 10)
   }
}

const clearFilter = () => {
   searchQuery.value = ''
}

const openCreateModal = () => {
   editingScore.value = null
   selectedStudent.value = null
   studentSearch.value = ''
   formData.value = {
      studentId: null,
      subjectName: '',
      score: 0
   }
   showModal.value = true
   filterStudents()
}

const editScore = (score: any) => {
   editingScore.value = score
   formData.value = {
      studentId: score.student.id,
      subjectName: score.subjectName,
      score: score.score
   }
   showModal.value = true
}

const closeModal = () => {
   showModal.value = false
   showStudentDropdown.value = false
}

const saveScore = async () => {
   if (!editingScore.value && !formData.value.studentId) {
      alert('Please select a student')
      return
   }

   if (editingScore.value) {
      const { error } = await api.updateScore(editingScore.value.id, formData.value)
      if (!error) {
         closeModal()
         loadScores()
      } else {
         alert(error.error || 'Update failed')
      }
   } else {
      const { error } = await api.createScore(formData.value)
      if (!error) {
         closeModal()
         loadScores()
      } else {
         alert(error.error || 'Create failed')
      }
   }
}

const deleteScoreConfirm = async (id: number) => {
   if (confirm('Are you sure you want to delete this score?')) {
      const { error } = await api.deleteScore(id)
      if (!error) {
         loadScores()
      } else {
         alert(error.error || 'Delete failed')
      }
   }
}


onMounted(() => {
   loadScores()
   loadStudents()

   document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (!target.closest('.relative')) {
         showStudentDropdown.value = false
      }
   })
})
</script>