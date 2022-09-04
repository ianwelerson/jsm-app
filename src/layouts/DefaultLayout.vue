<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

import PageHeader from '@/components/PageHeader/PageHeader.vue'
import PageFooter from '@/components/PageFooter/PageFooter.vue'
import PageBreadcrumb from '@/components/PageBreadcrumb/PageBreadcrumb.vue'

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

    <main class="default-layout__main">
      <div class="default-layout__page-content">
        <PageBreadcrumb />
        <RouterView />
      </div>
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
  align-items: center;

  &__header {
    width: 100%;
  }

  &__main {
    display: flex;
    flex: 1;
    justify-content: center;
    width: 100%;
  }

  &__page-content {
    padding: $spacing-6 $spacing-6;
    min-width: 0;
    width: 100%;

    @include screen('lg') {
      max-width: $content-desktop;
    }
  }

  &__footer {
    width: 100%;
  }
}
</style>
