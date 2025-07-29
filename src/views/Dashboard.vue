<template>
  <div class="min-h-screen pt-20 bg-dark-900">
    <!-- Header -->
    <div class="bg-dark-800 border-b border-dark-700">
      <div class="container-custom py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">
              Welcome back, {{ authStore.user?.name || 'Developer' }}
            </h1>
            <p class="text-gray-400">
              Manage your API keys, monitor usage, and access AI insights.
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-sm text-gray-400">Current Plan</div>
              <div class="text-lg font-semibold text-primary-400 capitalize">
                {{ authStore.user?.plan || 'Starter' }}
              </div>
            </div>
            <div class="w-12 h-12 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-dark-900 font-bold text-lg">
              {{ authStore.userInitials }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Ticker -->
    <Ticker />

    <!-- Dashboard Content -->
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Usage Overview -->
          <div class="card">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-white">API Usage Overview</h2>
              <select class="bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 24 hours</option>
              </select>
            </div>
            
            <!-- Usage Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-400 mb-2">
                  {{ formatNumber(authStore.user?.usage?.current || 0) }}
                </div>
                <div class="text-gray-400 text-sm">API Calls Used</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white mb-2">
                  {{ formatNumber((authStore.user?.usage?.limit || 800000) - (authStore.user?.usage?.current || 0)) }}
                </div>
                <div class="text-gray-400 text-sm">Remaining Calls</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-400 mb-2">
                  {{ usagePercentage.toFixed(1) }}%
                </div>
                <div class="text-gray-400 text-sm">Usage This Month</div>
              </div>
            </div>

            <!-- Usage Progress Bar -->
            <div class="mb-6">
              <div class="flex justify-between text-sm text-gray-400 mb-2">
                <span>Monthly Usage</span>
                <span>{{ formatNumber(authStore.user?.usage?.limit || 800000) }} limit</span>
              </div>
              <div class="w-full bg-dark-700 rounded-full h-3">
                <div 
                  class="h-3 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500"
                  :style="{ width: `${Math.min(usagePercentage, 100)}%` }"
                ></div>
              </div>
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>{{ formatNumber(authStore.user?.usage?.limit || 800000) }}</span>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="flex flex-wrap gap-3">
              <router-link to="/pricing" class="btn-secondary">
                <CreditCard class="w-4 h-4" />
                Upgrade Plan
              </router-link>
              <button class="btn-dark">
                <Download class="w-4 h-4" />
                Export Usage
              </button>
              <button class="btn-dark">
                <BarChart3 class="w-4 h-4" />
                View Analytics
              </button>
            </div>
          </div>

          <!-- API Keys Management -->
          <div class="card">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-white">API Keys</h2>
              <button 
                @click="authStore.generateNewApiKey"
                class="btn-primary"
              >
                <Plus class="w-4 h-4" />
                Generate New Key
              </button>
            </div>

            <div class="space-y-4">
              <div class="bg-dark-700 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <h3 class="font-medium text-white">Production Key</h3>
                    <p class="text-sm text-gray-400">Created {{ formatDate(authStore.user?.createdAt) }}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                      Active
                    </span>
                    <button
                      @click="copyToClipboard(authStore.user?.apiKey)"
                      class="p-2 text-gray-400 hover:text-white transition-colors"
                      title="Copy API key"
                    >
                      <Copy class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div class="bg-dark-800 rounded-lg p-3 font-mono text-sm text-gray-300 break-all">
                  {{ maskedApiKey }}
                  <button 
                    @click="showFullKey = !showFullKey"
                    class="ml-2 text-primary-400 hover:text-primary-300"
                  >
                    {{ showFullKey ? 'Hide' : 'Show' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card">
            <h2 class="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div class="space-y-4">
              <div 
                v-for="activity in recentActivity" 
                :key="activity.id"
                class="flex items-center justify-between py-3 border-b border-dark-700 last:border-b-0"
              >
                <div class="flex items-center space-x-3">
                  <div 
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      activity.type === 'api_call' ? 'bg-blue-500/10 text-blue-400' :
                      activity.type === 'key_generated' ? 'bg-green-500/10 text-green-400' :
                      'bg-primary-500/10 text-primary-400'
                    ]"
                  >
                    <component :is="activity.icon" class="w-4 h-4" />
                  </div>
                  <div>
                    <div class="text-white font-medium">{{ activity.title }}</div>
                    <div class="text-sm text-gray-400">{{ activity.description }}</div>
                  </div>
                </div>
                <div class="text-sm text-gray-400">
                  {{ formatTime(activity.timestamp) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Plan Information -->
          <div class="card">
            <h2 class="text-lg font-semibold text-white mb-4">Current Plan</h2>
            <div class="text-center mb-6">
              <div class="text-3xl font-bold text-primary-400 mb-1 capitalize">
                {{ authStore.user?.plan || 'Starter' }}
              </div>
              <div class="text-gray-400">
                ${{ getPlanPrice(authStore.user?.plan) }}/month
              </div>
            </div>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">API Calls</span>
                <span class="text-white">{{ formatNumber(authStore.user?.usage?.limit || 800000) }}/month</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">Support</span>
                <span class="text-white">{{ getPlanSupport(authStore.user?.plan) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">SLA</span>
                <span class="text-white">{{ getPlanSLA(authStore.user?.plan) }}</span>
              </div>
            </div>

            <router-link to="/pricing" class="btn-secondary w-full justify-center">
              <ArrowUpRight class="w-4 h-4" />
              Change Plan
            </router-link>
          </div>

          <!-- AI Assistant Toggle -->
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-white">AI Assistant</h2>
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <p class="text-gray-400 mb-4 text-sm">
              Get intelligent market insights and analysis powered by AI.
            </p>
            <button 
              @click="aiStore.toggleChat"
              class="btn-primary w-full justify-center"
            >
              <Bot class="w-4 h-4" />
              {{ aiStore.isOpen ? 'Close Assistant' : 'Open Assistant' }}
            </button>
          </div>

          <!-- Quick Links -->
          <div class="card">
            <h2 class="text-lg font-semibold text-white mb-4">Quick Links</h2>
            <div class="space-y-2">
              <a href="#" class="flex items-center text-gray-400 hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-dark-700">
                <FileText class="w-4 h-4 mr-3" />
                API Documentation
              </a>
              <a href="#" class="flex items-center text-gray-400 hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-dark-700">
                <Code class="w-4 h-4 mr-3" />
                Code Examples
              </a>
              <a href="#" class="flex items-center text-gray-400 hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-dark-700">
                <HelpCircle class="w-4 h-4 mr-3" />
                Support Center
              </a>
              <a href="#" class="flex items-center text-gray-400 hover:text-primary-400 transition-colors p-2 rounded-lg hover:bg-dark-700">
                <MessageSquare class="w-4 h-4 mr-3" />
                Community Forum
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAIStore } from '@/stores/ai'
import { 
  CreditCard, 
  Download, 
  BarChart3, 
  Plus, 
  Copy, 
  ArrowUpRight, 
  Bot, 
  FileText, 
  Code, 
  HelpCircle, 
  MessageSquare,
  Zap,
  Key,
  Activity
} from 'lucide-vue-next'
import Ticker from '@/components/common/Ticker.vue'

const authStore = useAuthStore()
const aiStore = useAIStore()

const showFullKey = ref(false)

// Computed properties
const usagePercentage = computed(() => {
  const current = authStore.user?.usage?.current || 0
  const limit = authStore.user?.usage?.limit || 800000
  return (current / limit) * 100
})

const maskedApiKey = computed(() => {
  const key = authStore.user?.apiKey || 'sk_test_...'
  if (showFullKey.value) return key
  return key.substring(0, 12) + '•'.repeat(20) + key.slice(-4)
})

// Mock recent activity
const recentActivity = [
  {
    id: 1,
    type: 'api_call',
    icon: Zap,
    title: 'API Request Spike',
    description: '1,245 requests in the last hour',
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: 2,
    type: 'key_generated',
    icon: Key,
    title: 'New API Key Generated',
    description: 'Production key created successfully',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 3,
    type: 'activity',
    icon: Activity,
    title: 'Usage Alert',
    description: '75% of monthly quota reached',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
]

// Helper functions
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (date) => {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'Just now'
}

const getPlanPrice = (plan) => {
  const prices = { starter: 250, enterprise: 350, business: 499 }
  return prices[plan] || 250
}

const getPlanSupport = (plan) => {
  const support = { starter: 'Email', enterprise: 'Priority', business: '24/7 Phone' }
  return support[plan] || 'Email'
}

const getPlanSLA = (plan) => {
  const sla = { starter: '99.9%', enterprise: '99.9%', business: '99.99%' }
  return sla[plan] || '99.9%'
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // You could add a toast notification here
    console.log('API key copied to clipboard')
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }
}
</script>
