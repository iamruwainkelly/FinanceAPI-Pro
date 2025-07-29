<template>
  <div class="min-h-screen pt-20">
    <!-- Header Section -->
    <section class="section-padding">
      <div class="container-custom text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Choose your 
          <span class="gradient-text">perfect plan</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Transparent pricing designed to scale with your business. 
          All plans include enterprise-grade security and 99.99% uptime SLA.
        </p>
        
        <!-- Billing Toggle -->
        <div class="flex items-center justify-center mb-16">
          <span class="text-gray-400 mr-3">Monthly</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="isAnnual" 
              class="sr-only peer"
            >
            <div class="w-11 h-6 bg-dark-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
          <span class="text-gray-400 ml-3">
            Annual 
            <span class="text-primary-400 text-sm font-medium">(Save 20%)</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="pb-20">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div 
            v-for="(plan, planKey) in paymentStore.plans" 
            :key="planKey"
            class="relative"
          >
            <!-- Popular Badge -->
            <div 
              v-if="planKey === 'enterprise'"
              class="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
            >
              <span class="bg-primary-500 text-dark-900 px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <!-- Plan Card -->
            <div 
              :class="[
                'card h-full transition-all duration-300 hover:border-primary-500/50',
                planKey === 'enterprise' 
                  ? 'border-primary-500/30 bg-gradient-to-b from-primary-500/5 to-transparent' 
                  : ''
              ]"
            >
              <!-- Plan Header -->
              <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-white mb-2">{{ plan.name }}</h3>
                <div class="mb-4">
                  <span class="text-4xl font-bold text-white">
                    ${{ isAnnual ? Math.round(plan.price * 0.8) : plan.price }}
                  </span>
                  <span class="text-gray-400">/month</span>
                </div>
                <p class="text-primary-400 font-semibold">
                  {{ (plan.hits / 1000000).toFixed(1) }}M API calls/month
                </p>
              </div>

              <!-- Features List -->
              <ul class="space-y-4 mb-8 flex-1">
                <li 
                  v-for="feature in plan.features" 
                  :key="feature"
                  class="flex items-start"
                >
                  <Check class="w-5 h-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span class="text-gray-300">{{ feature }}</span>
                </li>
              </ul>

              <!-- CTA Button -->
              <button
                @click="handleSubscribe(planKey)"
                :disabled="paymentStore.loading"
                :class="[
                  'w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center',
                  planKey === 'enterprise'
                    ? 'btn-primary'
                    : 'btn-secondary'
                ]"
              >
                <Loader2 v-if="paymentStore.loading" class="w-5 h-5 animate-spin" />
                <template v-else>
                  {{ authStore.isAuthenticated ? 'Upgrade Now' : 'Start Free Trial' }}
                </template>
              </button>
            </div>
          </div>
        </div>

        <!-- Feature Comparison -->
        <div class="mt-20">
          <h2 class="text-3xl font-bold text-white text-center mb-12">
            Compare all features
          </h2>
          
          <div class="overflow-x-auto">
            <table class="w-full bg-dark-800 border border-dark-700 rounded-xl">
              <thead>
                <tr class="border-b border-dark-700">
                  <th class="text-left p-6 text-white font-semibold">Features</th>
                  <th class="text-center p-6 text-white font-semibold">Starter</th>
                  <th class="text-center p-6 text-white font-semibold">Enterprise</th>
                  <th class="text-center p-6 text-white font-semibold">Business</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="feature in comparisonFeatures" 
                  :key="feature.name"
                  class="border-b border-dark-700 last:border-b-0"
                >
                  <td class="p-6 text-gray-300 font-medium">{{ feature.name }}</td>
                  <td class="p-6 text-center">
                    <component 
                      :is="getFeatureIcon(feature.starter)" 
                      :class="getFeatureClass(feature.starter)"
                      class="w-5 h-5 mx-auto"
                    />
                  </td>
                  <td class="p-6 text-center">
                    <component 
                      :is="getFeatureIcon(feature.enterprise)" 
                      :class="getFeatureClass(feature.enterprise)"
                      class="w-5 h-5 mx-auto"
                    />
                  </td>
                  <td class="p-6 text-center">
                    <component 
                      :is="getFeatureIcon(feature.business)" 
                      :class="getFeatureClass(feature.business)"
                      class="w-5 h-5 mx-auto"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="mt-20">
          <h2 class="text-3xl font-bold text-white text-center mb-12">
            Frequently asked questions
          </h2>
          
          <div class="max-w-4xl mx-auto space-y-6">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="card"
            >
              <button
                @click="toggleFAQ(index)"
                class="w-full text-left flex items-center justify-between"
              >
                <h3 class="text-lg font-semibold text-white">{{ faq.question }}</h3>
                <ChevronDown 
                  :class="[
                    'w-5 h-5 text-gray-400 transition-transform',
                    openFAQ === index ? 'rotate-180' : ''
                  ]"
                />
              </button>
              <div 
                v-if="openFAQ === index"
                class="mt-4 text-gray-300 animate-fade-in"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePaymentStore } from '@/stores/payment'
import { Check, X, Loader2, ChevronDown } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const paymentStore = usePaymentStore()

const isAnnual = ref(false)
const openFAQ = ref(null)

const comparisonFeatures = [
  {
    name: 'API Calls per month',
    starter: '800K',
    enterprise: '1.5M',
    business: '3M'
  },
  {
    name: 'Real-time data',
    starter: true,
    enterprise: true,
    business: true
  },
  {
    name: 'Historical data',
    starter: '1 year',
    enterprise: '10 years',
    business: 'Unlimited'
  },
  {
    name: 'AI Analytics',
    starter: false,
    enterprise: true,
    business: true
  },
  {
    name: 'Rate limit (req/sec)',
    starter: '10',
    enterprise: '50',
    business: '100'
  },
  {
    name: 'Support',
    starter: 'Email',
    enterprise: 'Priority',
    business: '24/7 Phone'
  },
  {
    name: 'SLA',
    starter: '99.9%',
    enterprise: '99.9%',
    business: '99.99%'
  }
]

const faqs = [
  {
    question: 'Can I change my plan at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate any billing differences.'
  },
  {
    question: 'What happens if I exceed my API limit?',
    answer: 'Your API requests will be temporarily rate-limited. You can upgrade your plan or purchase additional API calls to restore full access.'
  },
  {
    question: 'Do you offer enterprise discounts?',
    answer: 'Yes, we offer custom pricing for high-volume users and enterprise clients. Contact our sales team for a personalized quote.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all new accounts get a 14-day free trial with full access to our Starter plan features. No credit card required.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, ACH transfers, and wire transfers for enterprise accounts. All payments are processed securely through Stripe.'
  }
]

const getFeatureIcon = (value) => {
  if (value === true) return Check
  if (value === false) return X
  return 'span' // For text values
}

const getFeatureClass = (value) => {
  if (value === true) return 'text-primary-400'
  if (value === false) return 'text-gray-600'
  return 'text-gray-300'
}

const handleSubscribe = async (planKey) => {
  if (!authStore.isAuthenticated) {
    router.push('/signup')
    return
  }
  
  await paymentStore.createCheckoutSession(planKey)
}

const toggleFAQ = (index) => {
  openFAQ.value = openFAQ.value === index ? null : index
}
</script>
