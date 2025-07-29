import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const isAuthenticated = computed(() => !!user.value)
  const userInitials = computed(() => {
    if (!user.value) return ''
    const names = user.value.name?.split(' ') || ['User']
    return names.map(name => name[0]).join('').toUpperCase()
  })

  // Actions
  const signIn = async (email, password) => {
    loading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      user.value = {
        id: '1',
        email,
        name: email.split('@')[0],
        plan: 'starter',
        apiKey: 'sk_test_' + Math.random().toString(36).substring(2, 15),
        usage: {
          current: 45000,
          limit: 800000
        },
        createdAt: new Date().toISOString()
      }
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const signUp = async (email, password, name) => {
    loading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user creation
      user.value = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name,
        plan: 'starter',
        apiKey: 'sk_test_' + Math.random().toString(36).substring(2, 15),
        usage: {
          current: 0,
          limit: 800000
        },
        createdAt: new Date().toISOString()
      }
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const signOut = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const initAuth = () => {
    const stored = localStorage.getItem('user')
    if (stored) {
      user.value = JSON.parse(stored)
    }
  }

  const updatePlan = (newPlan) => {
    if (user.value) {
      const limits = {
        starter: 800000,
        enterprise: 1500000,
        business: 3000000
      }
      
      user.value.plan = newPlan
      user.value.usage.limit = limits[newPlan]
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  const generateNewApiKey = () => {
    if (user.value) {
      user.value.apiKey = 'sk_test_' + Math.random().toString(36).substring(2, 15)
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  // Initialize auth on store creation
  initAuth()

  return {
    user,
    loading,
    error,
    isAuthenticated,
    userInitials,
    signIn,
    signUp,
    signOut,
    updatePlan,
    generateNewApiKey
  }
})
