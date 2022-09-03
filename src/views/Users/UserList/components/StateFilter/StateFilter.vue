<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue'
import type { CountryStates } from '@/types'

const SHORT_COUNTRY_LIST_NUM = 5

interface StateFilterState {
  shortStateList: boolean
  countryStates: CountryStates[]
  selectedState: string[]
}

const state = reactive<StateFilterState>({
  shortStateList: true,
  countryStates: [],
  selectedState: [],
})

const countryStateList = computed(() => {
  return state.shortStateList
    ? state.countryStates.slice(0, SHORT_COUNTRY_LIST_NUM)
    : state.countryStates
})

watch(
  () => state.selectedState,
  (list: string[]) => {
    emit('update', list)
  }
)

const toggleVisibleStates = () => {
  state.shortStateList = !state.shortStateList
}

onMounted(() => {
  // Mock
  state.countryStates = [
    {
      name: 'Espírito Santo',
      key: 'es',
    },
    {
      name: 'São Paulo',
      key: 'sp',
    },
    {
      name: 'Rio de Janeiro',
      key: 'rj',
    },
    {
      name: 'Rio Grande do Sul',
      key: 'rs',
    },
    {
      name: 'Mato Grosso do Sul',
      key: 'ms',
    },
    {
      name: 'Acre',
      key: 'ac',
    },
  ]
})

const emit = defineEmits<{
  (e: 'update', list: string[]): void
}>()
</script>

<template>
  <div class="state-filter">
    <p class="state-filter__title">Por Estado</p>
    <ul class="state-filter__list">
      <li
        v-for="stateData in countryStateList"
        :key="stateData.key"
        class="state-filter__item"
      >
        <input
          data-testid="state-filter-input"
          type="checkbox"
          :name="stateData.key"
          :value="stateData.key"
          :id="`${stateData.key}-checkbox`"
          v-model="state.selectedState"
          class="state-filter__input"
        />
        <label :for="`${stateData.key}-checkbox`" class="state-filter__label">{{
          stateData.name
        }}</label>
      </li>
    </ul>
    <button
      class="state-filter__show-more"
      @click="toggleVisibleStates"
      data-testid="state-filter-show-more"
    >
      {{ state.shortStateList ? 'Ver todos' : 'Ver menos' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.state-filter {
  width: 100%;
  height: 100%;

  &__title {
    color: $text-color;
    font-size: $text-lg;
    font-weight: $font-medium;
    line-height: $leading-2;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: $spacing-3 0 0 0;
  }

  &__item {
    display: flex;

    &:not(:first-child) {
      margin-top: $spacing-1;
    }
  }

  &__input {
    transform: scale(1.2);
  }

  &__label {
    color: $text-color;
    font-size: $text-base;
    line-height: $leading-4;
    margin-left: $spacing-2;
  }

  &__show-more {
    background-color: $transparent;
    border: none;
    color: $text-color;
    cursor: pointer;
    font-size: $text-base;
    line-height: $leading-4;
    margin-top: $spacing-1;
    padding: 0;
    text-decoration: underline;
  }
}
</style>