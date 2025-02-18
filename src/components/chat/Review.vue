<template>
    <div class="security-findings space-y-3 mt-4">
      <div v-for="(finding, index) in findings" :key="index" 
           class="flex items-start p-3 rounded-lg" 
           :class="severityClasses[finding.severity]">
        <span class="w-2 h-2 rounded-full mt-1.5 mr-3" 
              :class="severityDot[finding.severity]" />
        <div>
          <h3 class="font-bold">{{ finding.title }}</h3>
          <p class="text-sm opacity-90">{{ finding.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    findings: Array
  })
  
  const severityClasses = {
    high: 'bg-red-900/30 text-red-300',
    medium: 'bg-yellow-900/30 text-yellow-300',
    recommendation: 'bg-green-900/30 text-green-300'
  }
  
  const severityDot = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    recommendation: 'bg-green-500'
  }
  </script>