<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <!-- Logo -->
        <router-link to="/" class="inline-flex items-center space-x-3 group mb-8">
          <div class="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
            <TrendingUp class="w-6 h-6 text-dark-900" />
          </div>
          <span class="text-2xl font-bold text-white">FinanceAPI Pro</span>
        </router-link>
        
        <h2 class="text-3xl font-bold text-white mb-2">Welcome back</h2>
        <p class="text-gray-400">Sign in to your account to continue</p>
      </div>

      <!-- Error Message -->
      <div 
        v-if="authStore.error" 
        class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm"
      >
        {{ authStore.error }}
      </div>

      <!-- Sign In Form -->
      <form @submit.prevent="handleSignIn" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            v-model="form.email"
            class="input-field"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
              v-model="form.password"
              class="input-field pr-12"
              placeholder="Enter your password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
            >
              <Eye v-if="showPassword" class="w-5 h-5" />
              <EyeOff v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="form.rememberMe"
              class="h-4 w-4 text-primary-500 focus:ring-primary-500 border-dark-600 bg-dark-700 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="text-primary-400 hover:text-primary-300 transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="btn-primary w-full justify-center"
        >
          <Loader2 v-if="authStore.loading" class="w-5 h-5 animate-spin" />
          <template v-else>
            <LogIn class="w-5 h-5" />
            Sign in
          </template>
        </button>
      </form>

      <!-- Social Sign In -->
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-dark-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-dark-900 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            class="btn-dark w-full justify-center"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          <button
            type="button"
            class="btn-dark w-full justify-center"
          >
            <Github class="w-5 h-5 mr-2" />
            GitHub
          </button>
        </div>
      </div>

      <!-- Sign Up Link -->
      <div class="text-center">
        <span class="text-gray-400">Don't have an account?</span>
        <router-link to="/signup" class="text-primary-400 hover:text-primary-300 transition-colors ml-1">
          Sign up for free
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { TrendingUp, LogIn, Eye, EyeOff, Loader2, Github } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const showPassword = ref(false)
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const handleSignIn = async () => {
  const result = await authStore.signIn(form.email, form.password)
  
  if (result.success) {
    router.push('/dashboard')
  }
}
</script>
