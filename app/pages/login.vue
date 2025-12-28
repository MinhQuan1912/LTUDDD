<template>
   <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div class="absolute inset-0 bg-black opacity-20"></div>

      <div class="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
         <div class="text-center mb-8">
            <div
               class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
               <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                     d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
               </svg>
            </div>
            <h1 class="text-3xl font-bold text-gray-800">Admin Portal</h1>
            <p class="text-gray-500 mt-2">Student Management System</p>
         </div>

         <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
               <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
               <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                  </div>
                  <input v-model="credentials.username" type="text"
                     class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
                     placeholder="Enter your username" required />
               </div>
            </div>

            <div>
               <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
               <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                           d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                     </svg>
                  </div>
                  <input v-model="credentials.password" type="password"
                     class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
                     placeholder="Enter your password" required />
               </div>
            </div>

            <button type="submit"
               class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
               :disabled="loading">
               <span v-if="!loading">Sign In</span>
               <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                     <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                     <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                     </path>
                  </svg>
                  Signing in...
               </span>
            </button>

            <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
               <div class="flex">
                  <svg class="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                     <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd" />
                  </svg>
                  <p class="text-sm text-red-700">{{ error }}</p>
               </div>
            </div>
         </form>
      </div>
   </div>
</template>

<script setup lang="ts">
definePageMeta({
   layout: false
})

const api = useApi()
const router = useRouter()
const token = useCookie('token')

const credentials = ref({
   username: '',
   password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
   loading.value = true
   error.value = ''

   const { data, error: err } = await api.login(credentials.value)

   if (data) {
      if (data.role === 'ADMIN') {
         token.value = data.token
         router.push('/')
      } else {
         error.value = 'Access denied. Admin only.'
      }
   } else {
      error.value = err?.error || 'Invalid credentials'
   }

   loading.value = false
}
</script>