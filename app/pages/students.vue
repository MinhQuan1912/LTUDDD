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
                  <h1 class="text-2xl font-bold text-gray-800">Student Management</h1>
               </div>

               <button @click="openCreateModal"
                  class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg transform hover:scale-105">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add New Student</span>
               </button>
            </div>
         </div>
      </header>

     
      <main class="container mx-auto px-6 py-8">
         
         <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex items-center space-x-4">
               <div class="flex-1 relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                     </svg>
                  </div>
                  <input v-model="searchQuery" type="text" placeholder="Search by name, code, email..."
                     class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition" />
               </div>
               <button @click="loadStudents"
                  class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                  Clear
               </button>
            </div>
         </div>

         <div v-if="filteredStudents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="student in filteredStudents" :key="student.id"
               class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
               <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                  <div class="flex items-center justify-between">
                     <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                           <span class="text-xl font-bold text-blue-600">{{ student.fullName.charAt(0) }}</span>
                        </div>
                        <div>
                           <h3 class="text-white font-bold text-lg">{{ student.fullName }}</h3>
                           <p class="text-blue-100 text-sm">{{ student.studentCode }}</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div class="p-6">
                  <div class="space-y-3">
                     <div class="flex items-center text-gray-600">
                        <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span class="text-sm">{{ student.email || 'N/A' }}</span>
                     </div>

                     <div class="flex items-center text-gray-600">
                        <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span class="text-sm">{{ student.phone || 'N/A' }}</span>
                     </div>

                     <div class="flex items-center text-gray-600">
                        <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span class="text-sm">{{ student.major || 'N/A' }}</span>
                     </div>
                  </div>

                  <div class="mt-6 flex flex-col space-y-2">
                     <div class="flex space-x-2">
                        <button @click="editStudent(student)"
                           class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center space-x-2">
                           <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                 d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                           </svg>
                           <span>Edit</span>
                        </button>
                        <button @click="deleteStudentConfirm(student.id)"
                           class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center">
                           <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                           </svg>
                        </button>
                     </div>


                     <div class="pt-2 border-t">
                        <p class="text-xs text-gray-500 mb-1">Login account:</p>
                        <div class="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
                           <span class="text-sm font-mono text-gray-700">{{ student.username }}</span>
                           <button @click="copyToClipboard(student.username)" class="text-gray-400 hover:text-gray-600"
                              title="Copy username">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div v-else class="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-600 mb-2">No students found</h3>
            <p class="text-gray-400">Try adjusting your search or add a new student</p>
         </div>
      </main>

      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
         <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
               <h2 class="text-2xl font-bold text-white">{{ editingStudent ? 'Edit Student' : 'Add New Student' }}</h2>
            </div>

            <form @submit.prevent="saveStudent" class="p-6">
               <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label class="block text-sm font-semibold text-gray-700 mb-2">Student Code *</label>
                     <input v-model="formData.studentCode" type="text" required
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>

                  <div>
                     <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                     <input v-model="formData.fullName" type="text" required
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>

                  <div>
                     <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                     <input v-model="formData.email" type="email"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>

                  <div>
                     <label class="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                     <input v-model="formData.phone" type="text"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>

                  <div class="md:col-span-2">
                     <label class="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                     <input v-model="formData.address" type="text"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>

                  <div class="md:col-span-2">
                     <label class="block text-sm font-semibold text-gray-700 mb-2">Major</label>
                     <input v-model="formData.major" type="text"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>

                  <div>
                     <label class="block text-sm font-semibold text-gray-700 mb-2">Username *</label>
                     <input v-model="formData.username" type="text" required
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                  </div>

                  <div>
                     <label class="block text-sm font-semibold text-gray-700 mb-2">Password {{ editingStudent ? '' : '*'
                        }}</label>
                     <input v-model="formData.password" type="password" :required="!editingStudent"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" />
                     <p v-if="editingStudent" class="text-xs text-gray-500 mt-1">Leave blank to keep current password
                     </p>
                  </div>
               </div>

               <div class="flex justify-end space-x-3 mt-8">
                  <button type="button" @click="showModal = false"
                     class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold">
                     Cancel
                  </button>
                  <button type="submit"
                     class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold shadow-lg">
                     {{ editingStudent ? 'Update' : 'Create' }} Student
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
const students = ref<any[]>([])
const showModal = ref(false)
const showPasswordModal = ref(false)
const editingStudent = ref<any>(null)
const passwordStudent = ref<any>(null)
const searchQuery = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const passwordError = ref('')
const formData = ref({
   studentCode: '',
   fullName: '',
   email: '',
   phone: '',
   address: '',
   major: '',
   username: '',
   password: ''
})

const filteredStudents = computed(() => {
   if (!searchQuery.value) return students.value
   const query = searchQuery.value.toLowerCase()
   return students.value.filter(s =>
      s.fullName.toLowerCase().includes(query) ||
      s.studentCode.toLowerCase().includes(query) ||
      (s.email && s.email.toLowerCase().includes(query))
   )
})

const loadStudents = async () => {
   const { data } = await api.getStudents()
   if (data) students.value = data as any[]
   searchQuery.value = ''
}

const openCreateModal = () => {
   editingStudent.value = null
   formData.value = {
      studentCode: '',
      fullName: '',
      email: '',
      phone: '',
      address: '',
      major: '',
      username: '',
      password: ''
   }
   showModal.value = true
}

const editStudent = (student: any) => {
   editingStudent.value = student
   formData.value = {
      studentCode: student.studentCode,
      fullName: student.fullName,
      email: student.email || '',
      phone: student.phone || '',
      address: student.address || '',
      major: student.major || '',
      username: student.username,
      password: ''
   }
   showModal.value = true
}

const saveStudent = async () => {
   if (editingStudent.value) {
      const { error } = await api.updateStudent(editingStudent.value.id, formData.value)
      if (!error) {
         showModal.value = false
         loadStudents()
      } else {
         alert(error.error || 'Update failed')
      }
   } else {
      const { error } = await api.createStudent(formData.value)
      if (!error) {
         showModal.value = false
         loadStudents()
      } else {
         alert(error.error || 'Create failed')
      }
   }
}

const deleteStudentConfirm = async (id: number) => {
   if (confirm('Are you sure you want to delete this student? This will also delete all their scores.')) {
      const { error } = await api.deleteStudent(id)
      if (!error) {
         loadStudents()
      } else {
         alert(error.error || 'Delete failed')
      }
   }
}

const openPasswordModal = (student: any) => {
   passwordStudent.value = student
   newPassword.value = ''
   confirmPassword.value = ''
   passwordError.value = ''
   showPassword.value = false
   showPasswordModal.value = true
}

const closePasswordModal = () => {
   showPasswordModal.value = false
   passwordStudent.value = null
   newPassword.value = ''
   confirmPassword.value = ''
   passwordError.value = ''
}

const resetPassword = async () => {
   passwordError.value = ''

   if (newPassword.value.length < 6) {
      passwordError.value = 'Password must be at least 6 characters'
      return
   }

   if (newPassword.value !== confirmPassword.value) {
      passwordError.value = 'Passwords do not match'
      return
   }

   const updateData = {
      studentCode: passwordStudent.value.studentCode,
      fullName: passwordStudent.value.fullName,
      email: passwordStudent.value.email,
      phone: passwordStudent.value.phone,
      address: passwordStudent.value.address,
      major: passwordStudent.value.major,
      username: passwordStudent.value.username,
      password: newPassword.value
   }

   const { error } = await api.updateStudent(passwordStudent.value.id, updateData)

   if (!error) {
      closePasswordModal()
      alert(`Password for ${passwordStudent.value.fullName} has been reset successfully!`)
      loadStudents()
   } else {
      passwordError.value = error.error || 'Password reset failed'
   }
}

const copyToClipboard = async (text: string) => {
   try {
      await navigator.clipboard.writeText(text)
      alert('Username copied to clipboard!')
   } catch (err) {
      console.error('Failed to copy:', err)
   }
}

onMounted(() => {
   loadStudents()
})
</script>