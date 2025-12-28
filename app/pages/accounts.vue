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
                  <h1 class="text-2xl font-bold text-gray-800">Student Accounts</h1>
               </div>

               <button @click="exportAccounts"
                  class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg transform hover:scale-105">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Export All</span>
               </button>
            </div>
         </div>
      </header>

      
      <main class="container mx-auto px-6 py-8">
         
         <div class="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6 shadow">
            <div class="flex items-start">
               <svg class="w-6 h-6 text-blue-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                     clip-rule="evenodd" />
               </svg>
               <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-1">Account Management</h3>
                  <p class="text-gray-600 text-sm">View and manage login credentials for all students. Click on any
                     password to reset it.</p>
               </div>
            </div>
         </div>

         <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
               <table class="min-w-full">
                  <thead class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                     <tr>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">#</th>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Student Code</th>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Student Name</th>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Username</th>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Actions</th>
                     </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                     <tr v-for="(student, index) in students" :key="student.id" class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4 text-gray-600">{{ index + 1 }}</td>
                        <td class="px-6 py-4">
                           <span
                              class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                              {{ student.studentCode }}
                           </span>
                        </td>
                        <td class="px-6 py-4 font-medium text-gray-800">{{ student.fullName }}</td>
                        <td class="px-6 py-4">
                           <div class="flex items-center space-x-2">
                              <code
                                 class="px-3 py-1 bg-gray-100 rounded text-sm font-mono">{{ student.username }}</code>
                              <button @click="copyToClipboard(student.username)"
                                 class="p-1 text-gray-400 hover:text-blue-600 transition" title="Copy username">
                                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                       d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                 </svg>
                              </button>
                           </div>
                        </td>
                        <td class="px-6 py-4">
                           <div class="flex space-x-2">
                              <button @click="openPasswordModal(student)"
                                 class="flex items-center space-x-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                       d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                 </svg>
                                 <span>Reset Password</span>
                              </button>
                              <button @click="copyCredentials(student)"
                                 class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                                 title="Copy credentials">
                                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                 </svg>
                              </button>
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </main>

      
      <div v-if="showPasswordModal"
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
         <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl">
               <h2 class="text-2xl font-bold text-white">Reset Password</h2>
               <p class="text-purple-100 mt-1">{{ passwordStudent?.fullName }}</p>
            </div>

            <form @submit.prevent="resetPassword" class="p-6">
               <div class="mb-4 p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <div class="flex items-start">
                     <svg class="w-5 h-5 text-purple-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                           d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                           clip-rule="evenodd" />
                     </svg>
                     <div>
                        <p class="text-sm font-semibold text-purple-800">Current Username</p>
                        <p class="text-purple-700 font-mono mt-1">{{ passwordStudent?.username }}</p>
                     </div>
                  </div>
               </div>

               <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">New Password *</label>
                  <div class="relative">
                     <input v-model="newPassword" :type="showPassword ? 'text' : 'password'" required minlength="6"
                        class="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                        placeholder="Enter new password" />
                     <button type="button" @click="showPassword = !showPassword"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                     </button>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
               </div>

               <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password *</label>
                  <input v-model="confirmPassword" :type="showPassword ? 'text' : 'password'" required
                     class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                     placeholder="Confirm new password" />
               </div>

               <div v-if="passwordError" class="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                  <p class="text-sm text-red-700">{{ passwordError }}</p>
               </div>

               <div class="flex justify-end space-x-3">
                  <button type="button" @click="closePasswordModal"
                     class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold">
                     Cancel
                  </button>
                  <button type="submit"
                     class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold shadow-lg">
                     Reset Password
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
const showPasswordModal = ref(false)
const passwordStudent = ref<any>(null)
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const passwordError = ref('')

const loadStudents = async () => {
   const { data } = await api.getStudents()
   if (data) students.value = data as any[]
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

const copyCredentials = async (student: any) => {
   const credentials = `Username: ${student.username}\nStudent Code: ${student.studentCode}\nName: ${student.fullName}`
   try {
      await navigator.clipboard.writeText(credentials)
      alert('Credentials copied to clipboard!')
   } catch (err) {
      console.error('Failed to copy:', err)
   }
}

const exportAccounts = () => {
   let csv = 'No,Student Code,Full Name,Username\n'
   students.value.forEach((student, index) => {
      csv += `${index + 1},"${student.studentCode}","${student.fullName}","${student.username}"\n`
   })

   const blob = new Blob([csv], { type: 'text/csv' })
   const url = window.URL.createObjectURL(blob)
   const a = document.createElement('a')
   a.href = url
   a.download = `student-accounts-${new Date().toISOString().split('T')[0]}.csv`
   a.click()
   window.URL.revokeObjectURL(url)
}

onMounted(() => {
   loadStudents()
})
</script>