<template>
  <div id="app" class="min-h-screen bg-dark-900">
    <!-- Navigation Header -->
    <Navbar v-if="!isAuthRoute" />
    
    <!-- Main Content -->
    <main class="transition-all duration-300">
      <router-view />
    </main>
    
    <!-- AI Assistant (only on authenticated pages) -->
    <AIAssistant v-if="showAIAssistant" />
    
    <!-- Footer (only on public pages) -->
    <Footer v-if="!isAuthRoute" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAIStore } from '@/stores/ai'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import AIAssistant from '@/components/ai/AIAssistant.vue'

const route = useRoute()
const authStore = useAuthStore()
const aiStore = useAIStore()

// Computed properties
const isAuthRoute = computed(() => {
  return ['SignIn', 'SignUp'].includes(route.name)
})

const showAIAssistant = computed(() => {
  return authStore.isAuthenticated && route.name === 'Dashboard'
})

// Initialize stores on app mount
onMounted(() => {
  aiStore.initializeChat()
})
</script>

<style>
/* Global scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-dark-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-dark-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-dark-500;
}

/* Selection styling */
::selection {
  @apply bg-primary-500 text-dark-900;
}

/* Focus visible styling */
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  @apply outline-none ring-2 ring-primary-500 ring-offset-2 ring-offset-dark-900;
}
</style>
