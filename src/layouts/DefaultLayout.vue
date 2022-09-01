<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

import PageHeader from '@/components/PageHeader/PageHeader.vue'
import PageFooter from '@/components/PageFooter/PageFooter.vue'

const route = useRoute()

const currentPageTitle = computed(() => {
  return route.meta?.title ? `${route.meta?.title} - ` : ''
})

useHead({
  title: `${currentPageTitle.value}Juntos Somos Mais`,
  meta: [
    {
      name: 'description',
      content: 'Juntos Somos Mais hiring challenge to Front-end Developers',
    },
  ],
})
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
