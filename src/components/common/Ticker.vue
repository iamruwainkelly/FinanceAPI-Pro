<template>
  <div class="bg-dark-800 border-y border-dark-700 overflow-hidden relative">
    <!-- Ticker Wrapper -->
    <div class="flex items-center">
      <!-- Live Indicator -->
      <div class="flex items-center px-4 py-3 bg-dark-700 border-r border-dark-600 flex-shrink-0">
        <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        <span class="text-xs font-medium text-gray-300 uppercase tracking-wide">Live</span>
      </div>
      
      <!-- Scrolling Ticker -->
      <div class="flex-1 overflow-hidden">
        <div 
          class="flex items-center space-x-8 animate-ticker"
          :style="{ animationDuration: `${animationDuration}s` }"
        >
          <!-- First set of ticker items -->
          <div 
            v-for="item in duplicatedTickerData" 
            :key="`first-${item.symbol}`"
            class="flex items-center space-x-2 flex-shrink-0 px-4 py-3"
          >
            <span class="font-bold text-white">{{ item.symbol }}</span>
            <span class="text-white font-semibold">
              ${{ formatPrice(item.price) }}
            </span>
            <span 
              :class="[
                'text-xs font-medium px-2 py-1 rounded',
                item.change >= 0 
                  ? 'text-green-400 bg-green-400/10' 
                  : 'text-red-400 bg-red-400/10'
              ]"
            >
              {{ item.change >= 0 ? '+' : '' }}{{ formatChange(item.change) }}
              ({{ item.change >= 0 ? '+' : '' }}{{ formatPercent(item.changePercent) }}%)
            </span>
          </div>
          
          <!-- Second set for seamless loop -->
          <div 
            v-for="item in duplicatedTickerData" 
            :key="`second-${item.symbol}`"
            class="flex items-center space-x-2 flex-shrink-0 px-4 py-3"
          >
            <span class="font-bold text-white">{{ item.symbol }}</span>
            <span class="text-white font-semibold">
              ${{ formatPrice(item.price) }}
            </span>
            <span 
              :class="[
                'text-xs font-medium px-2 py-1 rounded',
                item.change >= 0 
                  ? 'text-green-400 bg-green-400/10' 
                  : 'text-red-400 bg-red-400/10'
              ]"
            >
              {{ item.change >= 0 ? '+' : '' }}{{ formatChange(item.change) }}
              ({{ item.change >= 0 ? '+' : '' }}{{ formatPercent(item.changePercent) }}%)
            </span>
          </div>
        </div>
      </div>
      
      <!-- Controls -->
      <div class="flex items-center px-4 py-3 bg-dark-700 border-l border-dark-600 flex-shrink-0">
        <button 
          @click="toggleAutoRefresh"
          class="text-gray-400 hover:text-primary-400 transition-colors"
          :title="tickerStore.loading ? 'Updating...' : (isAutoRefreshEnabled ? 'Pause updates' : 'Resume updates')"
        >
          <Pause v-if="isAutoRefreshEnabled && !tickerStore.loading" class="w-4 h-4" />
          <Play v-else-if="!isAutoRefreshEnabled && !tickerStore.loading" class="w-4 h-4" />
          <Loader2 v-else class="w-4 h-4 animate-spin" />
        </button>
      </div>
    </div>
    
    <!-- Loading State -->
    <div 
      v-if="tickerStore.loading && tickerStore.tickerData.length === 0"
      class="absolute inset-0 bg-dark-800 flex items-center justify-center"
    >
      <div class="flex items-center space-x-2 text-gray-400">
        <Loader2 class="w-4 h-4 animate-spin" />
        <span class="text-sm">Loading market data...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useTickerStore } from '@/stores/ticker'
import { Play, Pause, Loader2 } from 'lucide-vue-next'

const tickerStore = useTickerStore()
const isAutoRefreshEnabled = ref(true)

// Animation duration based on number of items
const animationDuration = computed(() => {
  const baseSpeed = 60 // seconds for full cycle
  const itemCount = tickerStore.tickerData.length
  return Math.max(30, baseSpeed - itemCount * 2)
})

// Duplicate ticker data for seamless looping
const duplicatedTickerData = computed(() => {
  return [...tickerStore.tickerData, ...tickerStore.tickerData]
})

// Formatting functions
const formatPrice = (price) => {
  if (price >= 1000) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return price.toFixed(2)
}

const formatChange = (change) => {
  return Math.abs(change).toFixed(2)
}

const formatPercent = (percent) => {
  return Math.abs(percent).toFixed(2)
}

// Control functions
const toggleAutoRefresh = () => {
  if (isAutoRefreshEnabled.value) {
    tickerStore.stopAutoRefresh()
    isAutoRefreshEnabled.value = false
  } else {
    tickerStore.startAutoRefresh()
    isAutoRefreshEnabled.value = true
  }
}

// Lifecycle
onMounted(() => {
  if (isAutoRefreshEnabled.value) {
    tickerStore.startAutoRefresh()
  }
})

onUnmounted(() => {
  tickerStore.stopAutoRefresh()
})
</script>

<style scoped>
@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-ticker {
  animation: ticker linear infinite;
}

/* Pause animation on hover */
.ticker:hover .animate-ticker {
  animation-play-state: paused;
}
</style>
