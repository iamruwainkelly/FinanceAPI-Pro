import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTickerStore = defineStore('ticker', () => {
  const tickerData = ref([])
  const loading = ref(false)
  
  // Mock ticker data
  const mockData = [
    { symbol: 'SPY', price: 445.23, change: 2.45, changePercent: 0.55 },
    { symbol: 'QQQ', price: 378.91, change: -1.23, changePercent: -0.32 },
    { symbol: 'AAPL', price: 189.45, change: 3.21, changePercent: 1.72 },
    { symbol: 'MSFT', price: 378.85, change: -0.95, changePercent: -0.25 },
    { symbol: 'GOOGL', price: 138.21, change: 2.15, changePercent: 1.58 },
    { symbol: 'AMZN', price: 153.94, change: 1.87, changePercent: 1.23 },
    { symbol: 'TSLA', price: 248.50, change: -4.32, changePercent: -1.71 },
    { symbol: 'NVDA', price: 875.28, change: 15.67, changePercent: 1.82 },
    { symbol: 'BTC-USD', price: 43250.30, change: 890.45, changePercent: 2.10 },
    { symbol: 'ETH-USD', price: 2845.67, change: -45.23, changePercent: -1.57 }
  ]

  const fetchTickerData = async () => {
    loading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Add some random variation to mock real-time updates
      tickerData.value = mockData.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * 2,
        change: item.change + (Math.random() - 0.5) * 0.5,
        changePercent: item.changePercent + (Math.random() - 0.5) * 0.1
      }))
    } catch (error) {
      console.error('Failed to fetch ticker data:', error)
    } finally {
      loading.value = false
    }
  }

  // Auto-refresh ticker data every 5 seconds
  let intervalId = null
  
  const startAutoRefresh = () => {
    fetchTickerData() // Initial fetch
    intervalId = setInterval(fetchTickerData, 5000)
  }
  
  const stopAutoRefresh = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  return {
    tickerData,
    loading,
    fetchTickerData,
    startAutoRefresh,
    stopAutoRefresh
  }
})
