<template>
  <footer class="bg-dark-800 border-t border-dark-700">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <TrendingUp class="w-5 h-5 text-dark-900" />
            </div>
            <span class="text-xl font-bold text-white">FinanceAPI Pro</span>
          </div>
          <p class="text-gray-400 mb-6 max-w-md">
            Professional-grade financial data API platform with AI-powered analytics. 
            Trusted by institutions worldwide for real-time market insights.
          </p>
          <div class="flex space-x-4">
            <a 
              href="#" 
              class="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-dark-600 transition-all"
              aria-label="Twitter"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              href="#" 
              class="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-dark-600 transition-all"
              aria-label="LinkedIn"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="#" 
              class="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-dark-600 transition-all"
              aria-label="GitHub"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Product -->
        <div>
          <h3 class="text-white font-semibold mb-4">Product</h3>
          <ul class="space-y-3">
            <li>
              <router-link to="/pricing" class="text-gray-400 hover:text-primary-400 transition-colors">
                Pricing
              </router-link>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">
                API Documentation
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">
                Status Page
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">
                Changelog
              </a>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-white font-semibold mb-4">Company</h3>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-primary-400 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-dark-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          © {{ currentYear }} FinanceAPI Pro. All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-400 hover:text-primary-400 text-sm transition-colors">
            Privacy Policy
          </a>
          <a href="#" class="text-gray-400 hover:text-primary-400 text-sm transition-colors">
            Terms of Service
          </a>
          <a href="#" class="text-gray-400 hover:text-primary-400 text-sm transition-colors">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { TrendingUp } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>
