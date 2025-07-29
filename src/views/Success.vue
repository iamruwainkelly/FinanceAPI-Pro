<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
    <div class="max-w-md w-full text-center">
      <!-- Success Icon -->
      <div class="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-8">
        <CheckCircle class="w-10 h-10 text-white" />
      </div>
      
      <!-- Success Message -->
      <h1 class="text-3xl font-bold text-white mb-4">
        Payment Successful!
      </h1>
      <p class="text-gray-300 mb-8">
        Welcome to {{ planName }}! Your subscription has been activated and you now have access to all premium features.
      </p>

      <!-- Plan Details -->
      <div class="card mb-8">
        <div class="text-center">
          <h2 class="text-xl font-semibold text-primary-400 mb-2 capitalize">
            {{ planName }} Plan
          </h2>
          <div class="text-3xl font-bold text-white mb-4">
            ${{ planPrice }}<span class="text-lg text-gray-400">/month</span>
          </div>
          <div class="space-y-2 text-sm text-gray-300">
            <div class="flex justify-between">
              <span>API Calls</span>
              <span>{{ formatNumber(planLimits[selectedPlan] || 800000) }}/month</span>
            </div>
            <div class="flex justify-between">
              <span>Rate Limit</span>
              <span>{{ getRateLimit(selectedPlan) }} req/sec</span>
            </div>
            <div class="flex justify-between">
              <span>Support Level</span>
              <span>{{ getSupportLevel(selectedPlan) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="bg-dark-800/50 border border-dark-700 rounded-xl p-6 mb-8">
        <h3 class="text-lg font-semibold text-white mb-4">What's Next?</h3>
        <div class="space-y-3 text-left">
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-dark-900 text-sm font-bold">1</span>
            </div>
            <div>
              <p class="text-white font-medium">Access Your Dashboard</p>
              <p class="text-gray-400 text-sm">View your new API limits and generate keys</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-dark-900 text-sm font-bold">2</span>
            </div>
            <div>
              <p class="text-white font-medium">Explore AI Features</p>
              <p class="text-gray-400 text-sm">Try our AI-powered market analysis tools</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-dark-900 text-sm font-bold">3</span>
            </div>
            <div>
              <p class="text-white font-medium">Integration Guide</p>
              <p class="text-gray-400 text-sm">Follow our documentation to get started</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <router-link 
          to="/dashboard"
          class="btn-primary w-full justify-center text-lg"
        >
          <LayoutDashboard class="w-5 h-5" />
          Go to Dashboard
        </router-link>
        <div class="flex space-x-4">
          <a 
            href="#" 
            class="btn-secondary flex-1 justify-center"
          >
            <FileText class="w-4 h-4" />
            View Docs
          </a>
          <a 
            href="#" 
            class="btn-secondary flex-1 justify-center"
          >
            <MessageSquare class="w-4 h-4" />
            Get Support
          </a>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="mt-8 text-center">
        <p class="text-gray-400 text-sm mb-2">
          Need help getting started?
        </p>
        <a 
          href="mailto:support@financeapi.pro" 
          class="text-primary-400 hover:text-primary-300 transition-colors text-sm"
        >
          support@financeapi.pro
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePaymentStore } from '@/stores/payment'
import { CheckCircle, LayoutDashboard, FileText, MessageSquare } from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()
const paymentStore = usePaymentStore()

// Get plan from URL query parameter
const selectedPlan = computed(() => route.query.plan || 'starter')
const planName = computed(() => paymentStore.plans[selectedPlan.value]?.name || 'Starter')
const planPrice = computed(() => paymentStore.plans[selectedPlan.value]?.price || 250)

const planLimits = {
  starter: 800000,
  enterprise: 1500000,
  business: 3000000
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K'
  }
  return num.toString()
}

const getRateLimit = (plan) => {
  const limits = { starter: '10', enterprise: '50', business: '100' }
  return limits[plan] || '10'
}

const getSupportLevel = (plan) => {
  const support = { starter: 'Email', enterprise: 'Priority', business: '24/7 Phone' }
  return support[plan] || 'Email'
}

// Update user's plan when component mounts
onMounted(() => {
  if (selectedPlan.value && authStore.user) {
    authStore.updatePlan(selectedPlan.value)
    paymentStore.handleSuccessfulPayment(selectedPlan.value)
  }
})
</script>
