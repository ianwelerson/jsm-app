<script setup lang="ts">
import { computed } from 'vue'
import IconBase from '@/components/IconBase/IconBase.vue'

export interface PaginationNavProps {
  max: number
  current: number
  itemToShow?: number
}

type NavButtonDirection = 'prev' | 'next'

const props = withDefaults(defineProps<PaginationNavProps>(), {
  itemToShow: 3,
})

const pagesToRender = computed(() => {
  const numbersArray = Array.from({ length: props.max }, (v, k) => k + 1)

  if (props.current + props.itemToShow <= props.max) {
    return numbersArray.slice(
      props.current - 1,
      props.current + props.itemToShow
    )
  } else if (props.current + props.itemToShow >= props.max) {
    return numbersArray.slice(props.current - (props.itemToShow + 1))
  }

  return numbersArray
})

const navegatoToPage = (pageNumber: number) => {
  emit('goTo', pageNumber)
}

const buttonNavigationHandle = (direction: NavButtonDirection) => {
  let goTo = 1

  if (direction === 'next') {
    goTo = props.current + 1
  } else {
    goTo = props.current - 1
  }

  navegatoToPage(goTo)
}

const emit = defineEmits<{
  (e: 'goTo', page: number): void
}>()
</script>

<template>
  <div class="pagination-nav">
    <div class="pagination-nav__content">
      <div class="pagination-nav__arrow">
        <button
          class="pagination-arrow"
          :disabled="props.current === 1"
          @click="buttonNavigationHandle('prev')"
          data-testid="pagination-nav-prev"
        >
          <div class="pagination-arrow__icon">
            <IconBase name="IconChevronLeft" :height="12" />
          </div>
        </button>
      </div>
      <div class="pagination-nav__numbers">
        <template v-if="pagesToRender[0] !== 1">
          <button @click="navegatoToPage(1)" class="pagination-number">
            <p class="pagination-number__value">1</p>
          </button>
          <div class="pagination-number__has-more">...</div>
        </template>
        <button
          v-for="navNumber in pagesToRender"
          :key="navNumber"
          class="pagination-number"
          :class="{
            'pagination-number--current': navNumber === props.current,
          }"
          @click="navegatoToPage(navNumber)"
        >
          <p class="pagination-number__value">{{ navNumber }}</p>
        </button>
        <template v-if="pagesToRender[props.itemToShow] < props.max">
          <div class="pagination-number__has-more">...</div>
          <button @click="navegatoToPage(props.max)" class="pagination-number">
            <p class="pagination-number__value">{{ props.max }}</p>
          </button>
        </template>
      </div>
      <div class="pagination-nav__arrow">
        <button
          class="pagination-arrow"
          :disabled="props.current === props.max"
          @click="buttonNavigationHandle('next')"
          data-testid="pagination-nav-next"
        >
          <div class="pagination-arrow__icon">
            <IconBase name="IconChevronRight" :height="12" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination-nav {
  &__content {
    display: flex;
  }

  &__numbers {
    display: flex;
    margin: 0 $spacing-1;

    @include screen('lg') {
      margin: 0 $spacing-3;
    }
  }
}

.pagination-arrow {
  align-items: center;
  background-color: $gray-800;
  border: none;
  border-radius: $radius-full;
  display: flex;
  height: 32px;
  justify-content: center;
  cursor: pointer;
  width: 32px;

  &__icon {
    margin-top: -4px; // fix icon sizing
  }

  &:disabled {
    background-color: $gray-400;
    cursor: default;
    pointer-events: none;
  }
}

.pagination-number {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0 $spacing-2;
  position: relative;

  @include screen('lg') {
    padding: 0 $spacing-3;
  }

  &__value,
  &__has-more {
    font-size: $text-base;
    color: $gray-700;
  }

  &__has-more {
    align-self: flex-end;
    padding: $spacing-1;
  }

  &--current {
    cursor: default;
    pointer-events: none;

    .pagination-number__value {
      font-weight: $font-bold;
    }

    &::after {
      background-color: $gray-700;
      border-radius: $radius-large;
      bottom: 0;
      content: '';
      height: 4px;
      left: 0;
      margin-bottom: -8px;
      position: absolute;
      width: 100%;
    }
  }
}
</style>
