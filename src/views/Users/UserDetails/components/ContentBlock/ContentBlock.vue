<script setup lang="ts">
export interface ContentBlockProps {
  title: string
  value: string | number
  capitalize?: boolean
}

const props = withDefaults(defineProps<ContentBlockProps>(), {
  capitalize: true,
})
</script>

<template>
  <div class="content-block">
    <p class="content-block__title">{{ props.title }}</p>
    <p
      class="content-block__value"
      :class="{ 'content-block__value--capitalize': props.capitalize }"
    >
      {{ props.value }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.content-block {
  &:not(:last-child) {
    margin-bottom: $spacing-2;

    @include screen('lg') {
      margin-right: $spacing-7;
    }
  }

  &__title {
    color: $gray-700;
    font-size: $text-xs;
    text-transform: capitalize;
  }

  &__value {
    margin: 0;
    font-size: $text-base;
    font-weight: $font-medium;

    &--capitalize {
      text-transform: capitalize;
    }
  }
}
</style>
