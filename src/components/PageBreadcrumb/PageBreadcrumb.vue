<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface BreadcrumbData {
  routerName: string
  title: string
}

const route = useRoute()

const breadcrumbData = computed(() => {
  const pages: BreadcrumbData[] = [
    {
      routerName: 'appHome',
      title: 'Home',
    },
  ]

  route.matched.reduce((acc, current) => {
    if (!current.meta?.title || !current.name) {
      return acc
    }

    acc.push({
      routerName: current.name as string,
      title: current.meta.title as string,
    })

    return acc
  }, pages)

  return {
    pages,
    total: pages.length,
  }
})
</script>

<template>
  <section v-if="breadcrumbData.total > 1" class="page-breadcrumb">
    <ul class="page-breadcrumb__content">
      <RouterLink
        v-for="(page, index) in breadcrumbData.pages"
        :key="page.routerName"
        class="page-breadcrumb__item"
        :to="{ name: page.routerName }"
        data-testid="breadcrumb-item"
      >
        {{ page.title
        }}<span
          v-if="index + 1 < breadcrumbData.total"
          class="page-breadcrumb__separator"
          >></span
        >
      </RouterLink>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.page-breadcrumb {
  &__content {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    font-size: $text-xs;
    line-height: $leading-1;
    text-decoration: none;
    color: $text-color;
  }

  &__separator {
    margin: 0 $spacing-1;
  }
}
</style>
