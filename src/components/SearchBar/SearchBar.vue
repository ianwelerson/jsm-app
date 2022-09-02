<script setup lang="ts">
import { watch } from 'vue'
import { useDebouncedRef } from '@/utils'
import IconBase from '../IconBase/IconBase.vue'

const searchTerm = useDebouncedRef('', 600)

watch(searchTerm, () => {
  triggerUpdate()
})

const triggerUpdate = () => {
  emit('update', searchTerm.value)
}

const emit = defineEmits<{
  (e: 'update', term: string): void
}>()
</script>

<template>
  <div class="search-bar">
    <div class="search-bar__content">
      <label class="search-bar__wrapper" for="search-bar">
        <div class="search-bar__icon">
          <IconBase name="IconSearch" :height="18" color="#323232" />
        </div>
        <input
          data-testid="search-bar-input"
          class="search-bar__input"
          id="search-bar"
          name="search-term"
          placeholder="Buscar aqui"
          type="text"
          v-model="searchTerm"
        />
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  width: 100%;

  &__wrapper {
    align-items: center;
    background-color: $white;
    border: $border-size-base solid $gray-600;
    border-radius: $radius-extra;
    display: flex;
    padding: $spacing-1 $spacing-5;
  }

  &__icon {
    margin-right: $spacing-2;
  }

  &__input {
    background-color: $white;
    border: none;
    outline: none;
    width: 100%;

    &::placeholder {
      color: $gray-700;
      font-size: $text-base;
      line-height: $leading-4;
    }
  }
}
</style>
