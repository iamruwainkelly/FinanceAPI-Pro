<template>
  <!-- AI Assistant Toggle Button -->
  <button
    v-if="!aiStore.isOpen"
    @click="aiStore.toggleChat"
    class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
  >
    <Bot class="w-6 h-6 text-dark-900 group-hover:scale-110 transition-transform" />
    <div class="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
      <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
    </div>
  </button>

  <!-- AI Assistant Panel -->
  <div
    v-if="aiStore.isOpen"
    class="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-dark-800 border border-dark-600 rounded-2xl shadow-2xl flex flex-col animate-slide-up"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-dark-600">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
          <Bot class="w-5 h-5 text-dark-900" />
        </div>
        <div>
          <h3 class="font-semibold text-white">AI Assistant</h3>
          <p class="text-xs text-gray-400">Financial Market Analyst</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="aiStore.clearMessages"
          class="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-dark-700"
          title="Clear conversation"
        >
          <Trash2 class="w-4 h-4" />
        </button>
        <button
          @click="aiStore.toggleChat"
          class="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-dark-700"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Messages -->
    <div 
      ref="messagesContainer"
      class="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
    >
      <div
        v-for="message in aiStore.messages"
        :key="message.id"
        :class="[
          'flex',
          message.sender === 'user' ? 'justify-end' : 'justify-start'
        ]"
      >
        <div
          :class="[
            'max-w-[80%] rounded-2xl px-4 py-3 text-sm',
            message.sender === 'user'
              ? 'bg-primary-500 text-dark-900'
              : message.isError
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-dark-700 text-gray-200'
          ]"
        >
          <p class="whitespace-pre-wrap">{{ message.content }}</p>
          <p class="text-xs opacity-70 mt-2">
            {{ formatTime(message.timestamp) }}
          </p>
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="aiStore.loading" class="flex justify-start">
        <div class="bg-dark-700 rounded-2xl px-4 py-3 flex items-center space-x-2">
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
          <span class="text-xs text-gray-400">AI is thinking...</span>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="p-4 border-t border-dark-600">
      <form @submit.prevent="sendMessage" class="flex space-x-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Ask about market trends, stocks, crypto..."
          class="flex-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          :disabled="aiStore.loading"
        />
        <button
          type="submit"
          :disabled="!newMessage.trim() || aiStore.loading"
          class="p-2 bg-primary-500 hover:bg-primary-600 disabled:bg-dark-600 disabled:cursor-not-allowed text-dark-900 rounded-lg transition-colors"
        >
          <Send class="w-4 h-4" />
        </button>
      </form>
      
      <!-- Quick Actions -->
      <div class="flex flex-wrap gap-2 mt-3">
        <button
          v-for="suggestion in quickSuggestions"
          :key="suggestion"
          @click="sendQuickMessage(suggestion)"
          class="text-xs px-3 py-1 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-full transition-colors"
          :disabled="aiStore.loading"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useAIStore } from '@/stores/ai'
import { Bot, X, Send, Trash2 } from 'lucide-vue-next'

const aiStore = useAIStore()
const newMessage = ref('')
const messagesContainer = ref(null)

const quickSuggestions = [
  'SPY 6-month trend',
  'Compare AAPL vs MSFT',
  'Market volatility',
  'Crypto analysis'
]

// Scroll to bottom when new messages arrive
watch(() => aiStore.messages.length, async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
})

const sendMessage = async () => {
  if (!newMessage.value.trim() || aiStore.loading) return
  
  const message = newMessage.value.trim()
  newMessage.value = ''
  await aiStore.sendMessage(message)
}

const sendQuickMessage = async (message) => {
  if (aiStore.loading) return
  await aiStore.sendMessage(message)
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
/* Custom scrollbar for messages */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-dark-600 rounded-full;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-dark-500;
}
</style>
