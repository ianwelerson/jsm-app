<script setup lang="ts">
import { computed, onBeforeMount, reactive, watch } from 'vue'
import { useFetch } from '@/composable/useFetch'
import type { CheckboxFormat } from '@/types'

const SHORT_COUNTRY_LIST_NUM = 5

interface StateFilterState {
  shortStateList: boolean
  countryStates: CheckboxFormat[]
  selectedState: string[]
}

const { execute: getStateList, isLoading } = useFetch('/users/states')

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

const updateStatesList = async () => {
  const { data } = await getStateList()

  state.countryStates = (data.value as string[]).map(
    (state): CheckboxFormat => {
      return {
        name: state,
        key: state,
      }
    }
  )
}

onBeforeMount(async () => {
  updateStatesList()
})

const emit = defineEmits<{
  (e: 'update', list: string[]): void
}>()
</script>

<template>
  <div class="state-filter-component">
    <p class="state-filter-component__title">Por Estado</p>
    <ul class="state-filter-component__list">
      <template v-if="isLoading">
        <li
          v-for="skeleton in 5"
          :key="skeleton"
          class="state-filter-component__item state-filter-component__item--skeleton"
        ></li>
      </template>
      <template v-else>
        <li
          v-for="stateData in countryStateList"
          :key="stateData.key"
          class="state-filter-component__item"
        >
          <input
            data-testid="state-filter-input"
            type="checkbox"
            :name="stateData.key"
            :value="stateData.key"
            :id="`${stateData.key}-checkbox`"
            v-model="state.selectedState"
            class="state-filter-component__input"
          />
          <label
            :for="`${stateData.key}-checkbox`"
            class="state-filter-component__label"
            >{{ stateData.name }}</label
          >
        </li>
      </template>
    </ul>
    <button
      v-if="state.countryStates.length > SHORT_COUNTRY_LIST_NUM && !isLoading"
      class="state-filter-component__show-more"
      @click="toggleVisibleStates"
      data-testid="state-filter-show-more"
    >
      {{ state.shortStateList ? 'Ver todos' : 'Ver menos' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.state-filter-component {
  width: 100%;
  height: 100%;

  &__title {
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

    &--skeleton {
      height: 20px;
      width: 100%;

      @include skeleton;
    }

    &:not(:first-child) {
      margin-top: $spacing-1;
    }
  }

  &__input {
    transform: scale(1.2);
  }

  &__label {
    font-size: $text-base;
    line-height: $leading-4;
    margin-left: $spacing-2;
    text-transform: capitalize;
  }

  &__show-more {
    background-color: $transparent;
    border: none;
    cursor: pointer;
    font-size: $text-base;
    line-height: $leading-4;
    margin-top: $spacing-1;
    padding: 0;
    text-decoration: underline;
  }
}
</style>
