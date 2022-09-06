<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const errorType = computed(() => {
  return !route || route.path === '/error' ? null : 404
})
</script>

<template>
  <section class="feedback-page">
    <div class="feedback-page__content">
      <template v-if="errorType === 404">
        <h1 class="feedback-page__title">404</h1>
        <p class="feedback-page__description">
          A página que você tentou acessar não existe ou foi removida.
        </p>
      </template>
      <template v-else>
        <h1 class="feedback-page__title">Oops!</h1>
        <p class="feedback-page__description">
          Algo deu errado, favor tentar novamente!
        </p>
      </template>
      <RouterLink :to="{ name: 'appHome' }" class="feedback-page__action"
        >Ir para página inicial</RouterLink
      >
    </div>
  </section>
</template>

<style lang="scss" scoped>
.feedback-page {
  height: 100%;

  &__content {
    align-items: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    font-size: 60px;
    margin: 0;
  }

  &__description {
    font-size: $text-base;
    margin-top: $spacing-3;
  }

  &__action {
    padding: $spacing-3;
    font-size: $text-base;
  }
}
</style>
