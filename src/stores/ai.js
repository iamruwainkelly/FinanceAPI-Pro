import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAIStore = defineStore('ai', () => {
  const messages = ref([])
  const loading = ref(false)
  const isOpen = ref(false)

  // Mock AI responses for financial queries
  const mockResponses = {
    'spy': 'SPY (S&P 500 ETF) is currently showing strong momentum with a 6-month trend indicating steady growth. The index has gained approximately 12% over the past 6 months, with key support at $430 and resistance at $450.',
    'compare': 'Comparing AAPL vs MSFT: AAPL shows higher volatility (21-day volatility: 28%) compared to MSFT (21-day volatility: 24%). AAPL has outperformed MSFT by 3.2% over the past quarter, though MSFT shows more consistent dividend growth.',
    'volatility': 'Market volatility analysis shows the VIX at 16.2, indicating moderate market uncertainty. Tech sector volatility is elevated due to earnings season, while defensive sectors show lower volatility.',
    'crypto': 'Cryptocurrency markets are showing mixed signals. Bitcoin is testing key resistance at $45,000, while Ethereum is consolidating around $2,850. Institutional adoption continues to drive long-term bullish sentiment.',
    'earnings': 'Upcoming earnings releases include major tech companies this week. Consensus estimates suggest continued growth in cloud computing and AI-related revenues, particularly for MSFT, GOOGL, and NVDA.',
    'sectors': 'Sector rotation analysis indicates movement from growth to value sectors. Energy and financials are outperforming, while technology and consumer discretionary are underperforming this quarter.'
  }

  const getAIResponse = (query) => {
    const lowerQuery = query.toLowerCase()
    
    // Simple keyword matching for demo purposes
    for (const [keyword, response] of Object.entries(mockResponses)) {
      if (lowerQuery.includes(keyword)) {
        return response
      }
    }
    
    // Default response
    return `I've analyzed your query about "${query}". Based on current market data, I recommend monitoring key technical indicators and fundamental metrics. For more specific insights, please provide additional context about the timeframe or specific assets you're interested in.`
  }

  const sendMessage = async (content) => {
    if (!content.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date()
    }
    messages.value.push(userMessage)

    loading.value = true

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Generate AI response
      const aiResponse = getAIResponse(content)
      
      const aiMessage = {
        id: Date.now() + 1,
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }
      
      messages.value.push(aiMessage)
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      }
      messages.value.push(errorMessage)
    } finally {
      loading.value = false
    }
  }

  const toggleChat = () => {
    isOpen.value = !isOpen.value
  }

  const clearMessages = () => {
    messages.value = []
  }

  // Initialize with welcome message
  const initializeChat = () => {
    if (messages.value.length === 0) {
      messages.value.push({
        id: 1,
        content: 'Hello! I\'m your AI financial assistant. I can help you analyze market trends, compare stocks, assess volatility, and provide insights on various financial instruments. What would you like to know?',
        sender: 'ai',
        timestamp: new Date()
      })
    }
  }

  return {
    messages,
    loading,
    isOpen,
    sendMessage,
    toggleChat,
    clearMessages,
    initializeChat
  }
})
