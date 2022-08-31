<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader/PageHeader.vue'
</script>

<template>
  <PageHeader />

  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
