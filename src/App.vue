<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
@import 'element-plus/dist/index.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  @apply h-full bg-gray-100;
}

#app {
  @apply h-full;
}
</style>
