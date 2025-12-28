<template>
   <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header class="bg-white shadow-md">
         <div class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
               <div class="flex items-center space-x-3">
                  <div
                     class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                     <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                           d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                     </svg>
                  </div>
                  <div>
                     <h1 class="text-xl font-bold text-gray-800">Student Management</h1>
                     <p class="text-sm text-gray-500">Admin Dashboard</p>
                  </div>
               </div>

               <button @click="logout"
                  class="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
               </button>
            </div>
         </div>
      </header>

      <main class="container mx-auto px-6 py-8">

         <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NuxtLink to="/students"
               class="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition">
               <div class="flex items-center space-x-4">
                  <div
                     class="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition">
                     <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                           d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                     </svg>
                  </div>
                  <div>
                     <h2 class="text-2xl font-bold mb-1">Manage Students</h2>
                     <p class="text-blue-100">Create, view, edit and delete student records</p>
                  </div>
               </div>
            </NuxtLink>

            <NuxtLink to="/scores"
               class="group bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition">
               <div class="flex items-center space-x-4">
                  <div
                     class="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition">
                     <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                           d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                     </svg>
                  </div>
                  <div>
                     <h2 class="text-2xl font-bold mb-1">Manage Scores</h2>
                     <p class="text-green-100">Add, update and track student exam scores</p>
                  </div>
               </div>
            </NuxtLink>

            <NuxtLink to="/accounts"
               class="group bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-8 text-white transform hover:scale-105 transition">
               <div class="flex items-center space-x-4">
                  <div
                     class="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition">
                     <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                           d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                     </svg>
                  </div>
                  <div>
                     <h2 class="text-2xl font-bold mb-1">Account Management</h2>
                     <p class="text-purple-100">View and reset student login credentials</p>
                  </div>
               </div>
            </NuxtLink>
         </div>
      </main>
   </div>
</template>

<script setup lang="ts">
definePageMeta({
   middleware: 'auth'
})

const router = useRouter()
const token = useCookie('token')
const api = useApi()

const stats = ref({
   totalStudents: 0,
   totalScores: 0,
   averageScore: '0.0'
})

const logout = () => {
   token.value = null
   router.push('/login')
}

const loadStats = async () => {
   const { data: studentsData } = await api.getStudents()
   const { data: scoresData } = await api.getScores()

   const students = studentsData as any[] || []
   const scores = scoresData as any[] || []

   stats.value.totalStudents = students.length
   stats.value.totalScores = scores.length

   const avg =
      scores.length > 0
         ? scores.reduce((sum: number, s: any) => sum + s.score, 0) / scores.length
         : 0

   stats.value.averageScore = avg.toFixed(1)
}


onMounted(() => {
   loadStats()
})
</script>