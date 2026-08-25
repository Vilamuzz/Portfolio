<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { initLenis, destroyLenis } from '@/composables/useLenis'

onMounted(() => initLenis())
onUnmounted(() => destroyLenis())
</script>

<template>
  <RouterView class="scheme-dark" />
</template>
