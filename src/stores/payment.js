import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

// Use test publishable key
const stripePromise = loadStripe('pk_test_51234567890abcdefghijklmnopqrstuvwxyz') // Replace with your test key

export const usePaymentStore = defineStore('payment', () => {
  const loading = ref(false)
  const error = ref(null)

  const plans = {
    starter: {
      name: 'Starter',
      price: 250,
      hits: 800000,
      features: [
        '800K API calls/month',
        'Real-time market data',
        'Basic support',
        'Standard rate limits',
        'Email support'
      ],
      priceId: 'price_starter_test'
    },
    enterprise: {
      name: 'Enterprise',
      price: 350,
      hits: 1500000,
      features: [
        '1.5M API calls/month',
        'Real-time + historical data',
        'Priority support',
        'Higher rate limits',
        'AI analytics included',
        'Phone & email support',
        '99.9% SLA guarantee'
      ],
      priceId: 'price_enterprise_test'
    },
    business: {
      name: 'Business',
      price: 499,
      hits: 3000000,
      features: [
        '3M API calls/month',
        'Full historical data access',
        'Dedicated support',
        'Highest rate limits',
        'Advanced AI analytics',
        '24/7 phone support',
        '99.99% SLA guarantee',
        'Custom integrations'
      ],
      priceId: 'price_business_test'
    }
  }

  const createCheckoutSession = async (planId) => {
    loading.value = true
    error.value = null

    try {
      const stripe = await stripePromise
      
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate the checkout process
      const response = await mockCreateCheckoutSession(planId)
      
      if (response.sessionId) {
        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.sessionId
        })
        
        if (error) {
          throw new Error(error.message)
        }
      }
    } catch (err) {
      error.value = err.message
      console.error('Checkout error:', err)
    } finally {
      loading.value = false
    }
  }

  const mockCreateCheckoutSession = async (planId) => {
    // Simulate API call to backend
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, redirect to success page instead of real Stripe
    const plan = plans[planId]
    if (plan) {
      // In development, we'll just redirect to success page
      window.location.href = '/success?plan=' + planId
      return { sessionId: 'mock_session_' + Math.random().toString(36) }
    } else {
      throw new Error('Invalid plan selected')
    }
  }

  const handleSuccessfulPayment = (planId) => {
    // This would typically be called from a webhook handler
    // For demo purposes, we'll just update the user's plan
    const authStore = useAuthStore()
    if (authStore.user) {
      authStore.updatePlan(planId)
    }
  }

  return {
    plans,
    loading,
    error,
    createCheckoutSession,
    handleSuccessfulPayment
  }
})
