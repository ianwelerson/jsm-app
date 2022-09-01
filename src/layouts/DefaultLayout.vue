<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import PageFooter from '@/components/PageFooter/PageFooter.vue'
</script>

<template>
  <div class="default-layout">
    <div class="default-layout__header">
      <PageHeader />
    </div>

    <main class="default-layout__content">
      <RouterView />
    </main>

    <div class="default-layout__footer">
      <PageFooter />
    </div>
  </div>
</template>

<style lang="scss">
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__content {
    flex: 1;
  }
}
</style>
