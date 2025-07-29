<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative pt-20 lg:pt-32 pb-20 overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
      <div class="absolute inset-0 opacity-20">
        <div class="w-full h-full" style="background-image: radial-gradient(circle at 2px 2px, rgba(245, 158, 11, 0.1) 1px, transparent 0); background-size: 60px 60px;"></div>
      </div>
      
      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Badge -->
          <div class="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-8 animate-fade-in">
            <Zap class="w-4 h-4 mr-2" />
            Trusted by 10,000+ developers worldwide
          </div>
          
          <!-- Headline -->
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Premium Financial Data 
            <span class="gradient-text">API Platform</span>
          </h1>
          
          <!-- Subheadline -->
          <p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style="animation-delay: 0.2s">
            Access real-time market data, historical insights, and AI-powered analytics 
            through our institutional-grade API. Built for scale, designed for developers.
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style="animation-delay: 0.4s">
            <router-link to="/signup" class="btn-primary text-lg px-8 py-4">
              <Rocket class="w-5 h-5" />
              Start Free Trial
            </router-link>
            <router-link to="/pricing" class="btn-secondary text-lg px-8 py-4">
              <DollarSign class="w-5 h-5" />
              View Pricing
            </router-link>
          </div>
          
          <!-- Trust Indicators -->
          <div class="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm animate-fade-in" style="animation-delay: 0.6s">
            <div class="flex items-center">
              <Shield class="w-4 h-4 mr-2 text-green-400" />
              SOC 2 Compliant
            </div>
            <div class="flex items-center">
              <Clock class="w-4 h-4 mr-2 text-primary-400" />
              99.99% Uptime SLA
            </div>
            <div class="flex items-center">
              <Zap class="w-4 h-4 mr-2 text-blue-400" />
              <5ms Response Time
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Ticker -->
    <Ticker />

    <!-- Features Section -->
    <section class="section-padding bg-dark-800/50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything you need for 
            <span class="gradient-text">financial data</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional-grade API with enterprise features, AI-powered insights, 
            and the reliability institutions demand.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="feature.title"
            class="card group hover:border-primary-500/30 transition-all duration-300 animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <component :is="feature.icon" class="w-6 h-6 text-dark-900" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">{{ feature.title }}</h3>
            <p class="text-gray-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by industry leaders
          </h2>
          <p class="text-xl text-gray-300">
            See what our customers say about our platform
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="testimonial.name"
            class="card animate-slide-up"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div class="flex items-center mb-4">
              <div class="flex text-primary-400">
                <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" />
              </div>
            </div>
            <blockquote class="text-gray-300 mb-6 leading-relaxed">
              "{{ testimonial.quote }}"
            </blockquote>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-dark-900 font-bold mr-3">
                {{ testimonial.name.split(' ').map(n => n[0]).join('') }}
              </div>
              <div>
                <div class="font-semibold text-white">{{ testimonial.name }}</div>
                <div class="text-sm text-gray-400">{{ testimonial.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding bg-gradient-to-r from-primary-500/10 to-primary-600/10 border-y border-primary-500/20">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to get started?
        </h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of developers building the next generation of financial applications.
        </p>
        <router-link to="/signup" class="btn-primary text-lg px-8 py-4 inline-flex">
          <Rocket class="w-5 h-5" />
          Start building today
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  Rocket, 
  DollarSign, 
  Shield, 
  Clock, 
  Zap, 
  Database, 
  Brain, 
  TrendingUp, 
  Globe, 
  Users, 
  Star 
} from 'lucide-vue-next'
import Ticker from '@/components/common/Ticker.vue'

const features = [
  {
    icon: Database,
    title: 'Real-time Market Data',
    description: 'Access live prices, quotes, and market data from global exchanges with sub-second latency.'
  },
  {
    icon: Brain,
    title: 'AI-Powered Analytics',
    description: 'Get intelligent insights, trend analysis, and predictive analytics powered by advanced machine learning.'
  },
  {
    icon: TrendingUp,
    title: 'Historical Data',
    description: 'Comprehensive historical data going back decades for backtesting and research purposes.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security with SOC 2 compliance, encryption at rest, and secure API endpoints.'
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Data from 100+ exchanges worldwide including stocks, forex, crypto, and commodities.'
  },
  {
    icon: Users,
    title: 'Developer First',
    description: 'RESTful API, comprehensive docs, SDKs, and dedicated support for seamless integration.'
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, InvestTech',
    quote: 'FinanceAPI Pro has transformed how we deliver real-time data to our clients. The AI insights are game-changing.'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Lead Developer, TradingBot',
    quote: 'Incredibly reliable API with excellent documentation. Our algo trading platform depends on their data feed.'
  },
  {
    name: 'Emily Watson',
    role: 'Quantitative Analyst, HedgeFund Pro',
    quote: 'The historical data depth and AI analytics have given us a significant edge in our trading strategies.'
  }
]
</script>
