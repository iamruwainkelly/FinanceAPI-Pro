<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled ? 'bg-dark-900/95 backdrop-blur-lg border-b border-dark-700' : 'bg-transparent',
      isVisible ? 'translate-y-0' : '-translate-y-full'
    ]"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <router-link 
          to="/" 
          class="flex items-center space-x-3 group"
        >
          <div class="w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
            <TrendingUp class="w-5 h-5 text-dark-900" />
          </div>
          <span class="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
            FinanceAPI Pro
          </span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <router-link 
            to="/pricing" 
            class="text-gray-300 hover:text-primary-400 transition-colors font-medium"
          >
            Pricing
          </router-link>
          <a 
            href="#" 
            class="text-gray-300 hover:text-primary-400 transition-colors font-medium"
          >
            Documentation
          </a>
          <a 
            href="#" 
            class="text-gray-300 hover:text-primary-400 transition-colors font-medium"
          >
            API Reference
          </a>
        </div>

        <!-- Auth Buttons -->
        <div class="hidden lg:flex items-center space-x-4">
          <template v-if="!authStore.isAuthenticated">
            <router-link 
              to="/signin" 
              class="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Sign In
            </router-link>
            <router-link 
              to="/signup" 
              class="btn-primary"
            >
              Start Free Trial
            </router-link>
          </template>
          <template v-else>
            <router-link 
              to="/dashboard" 
              class="btn-secondary"
            >
              Dashboard
            </router-link>
            <button 
              @click="authStore.signOut" 
              class="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Sign Out
            </button>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="isMobileMenuOpen"
        class="lg:hidden py-4 border-t border-dark-700 animate-fade-in"
      >
        <div class="flex flex-col space-y-4">
          <router-link 
            to="/pricing" 
            class="text-gray-300 hover:text-primary-400 transition-colors font-medium"
            @click="closeMobileMenu"
          >
            Pricing
          </router-link>
          <a 
            href="#" 
            class="text-gray-300 hover:text-primary-400 transition-colors font-medium"
          >
            Documentation
          </a>
          <a 
            href="#" 
            class="text-gray-300 hover:text-primary-400 transition-colors font-medium"
          >
            API Reference
          </a>
          
          <div class="pt-4 border-t border-dark-700">
            <template v-if="!authStore.isAuthenticated">
              <router-link 
                to="/signin" 
                class="block mb-3 text-gray-300 hover:text-white transition-colors font-medium"
                @click="closeMobileMenu"
              >
                Sign In
              </router-link>
              <router-link 
                to="/signup" 
                class="btn-primary w-full justify-center"
                @click="closeMobileMenu"
              >
                Start Free Trial
              </router-link>
            </template>
            <template v-else>
              <router-link 
                to="/dashboard" 
                class="block mb-3 btn-secondary w-full justify-center"
                @click="closeMobileMenu"
              >
                Dashboard
              </router-link>
              <button 
                @click="handleSignOut" 
                class="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Sign Out
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { TrendingUp, Menu, X } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

// Reactive state
const isScrolled = ref(false)
const isVisible = ref(true)
const isMobileMenuOpen = ref(false)
const lastScrollY = ref(0)

// Handle scroll effects
const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // Update scrolled state
  isScrolled.value = currentScrollY > 10
  
  // Handle navbar visibility (hide on scroll down, show on scroll up)
  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    isVisible.value = false
    isMobileMenuOpen.value = false
  } else {
    isVisible.value = true
  }
  
  lastScrollY.value = currentScrollY
}

// Mobile menu functions
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleSignOut = () => {
  authStore.signOut()
  closeMobileMenu()
  router.push('/')
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
