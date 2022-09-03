<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { CountryStates } from '@/types'

import UserCard from '@/views/Users/UserList/components/UserCard.vue'
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import StateFilter from '@/views/Users/UserList/components/StateFilter/StateFilter.vue'

interface UserListState {
  showSearchBar: boolean
  countryStates: CountryStates[]
}

interface UserListFilters {
  state: string[]
  query: string
}

const state = reactive<UserListState>({
  showSearchBar: false,
  countryStates: [],
})

const filters = reactive<UserListFilters>({
  state: [],
  query: '',
})

const handleSearchUpdate = (query: string) => {
  filters.query = query
}

const handleStateFilterUpdate = (state: string[]) => {
  filters.state = state
}

onMounted(() => {
  // avoid error when trying to load search with teleport before header is loaded
  state.showSearchBar = true
})
</script>

<template>
  <section class="page-user-list">
    <div class="page-user-list__wrapper">
      <h1 class="page-user-list__title">Lista de membros</h1>
      <div class="page-user-list__content">
        <aside class="page-user-list__state-filter">
          <StateFilter @update="handleStateFilterUpdate" />
        </aside>
        <section class="content-side">
          <div class="content-side__top-info">Content</div>
          <div class="content-side__user-list">
            <UserCard />
            {{ filters }}
          </div>
        </section>
      </div>
    </div>
    <Teleport v-if="state.showSearchBar" to="#tp-header-search-spot">
      <div class="page-user-list__search-bar">
        <SearchBar @update="handleSearchUpdate" />
      </div>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
.page-user-list {
  margin-top: $spacing-6;

  &__title {
    font-size: $text-xl;
    font-weight: $font-bold;
    line-height: $leading-5;
    color: $text-color;
  }

  &__content {
    display: flex;
  }

  &__search-bar {
    display: none;

    @include screen('lg') {
      width: 400px;
      display: flex;
    }
  }

  &__state-filter {
    border: $border-size-base solid $gray-400;
    border-radius: $radius-base;
    padding: $spacing-6;
    min-height: 30vh;
    width: 15vw;
  }
}

.content-side {
  flex: 1;
  margin-left: $spacing-3;
  display: flex;
  flex-direction: column;

  &__top-info {
    border: $border-size-base solid $gray-400;
    border-radius: $radius-base;
    padding: $spacing-3;
  }

  &__user-list {
    margin-top: $spacing-3;
  }
}
</style>
