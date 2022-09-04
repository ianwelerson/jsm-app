<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { CountryStates, UserListResponse } from '@/types'

import BaseSelect from '@/components/Base/Select/BaseSelect.vue'

import UserCard from '@/views/Users/UserList/components/UserCard/UserCard.vue'
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import StateFilter from '@/views/Users/UserList/components/StateFilter/StateFilter.vue'
import PaginationNav from '@/components/PaginationNav/PaginationNav.vue'

interface UserListState {
  showSearchBar: boolean
  countryStates: CountryStates[]
  userList: UserListResponse | null
}

interface UserListFilters {
  state: string[]
  query: string
}

const state = reactive<UserListState>({
  showSearchBar: false,
  countryStates: [],
  userList: null,
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

const handleSortUpdate = (event: Event) => {
  console.log((event.target as HTMLSelectElement)?.value)
}

const handlePaginationUpdate = (page: number) => {
  console.log(`navegate to: ${page}`)
}

onMounted(() => {
  // avoid error when trying to load search with teleport before header is loaded
  state.showSearchBar = true

  // Mock
  state.userList = {
    users: [
      {
        id: 'alejandra.rodrigues',
        picture: 'https://randomuser.me/api/portraits/med/women/18.jpg',
        name: 'alejandra rodrigues',
        street: '3833 rua santa catarina',
        city: 'umuarama',
        state: 'santa catarina',
        postcode: 43646,
      },
      {
        id: 'alejandra.rodrigues',
        picture: 'https://randomuser.me/api/portraits/med/women/18.jpg',
        name: 'alejandra rodrigues',
        street: '3833 rua santa catarina',
        city: 'umuarama',
        state: 'santa catarina',
        postcode: 43646,
      },
      {
        id: 'alejandra.rodrigues',
        picture: 'https://randomuser.me/api/portraits/med/women/18.jpg',
        name: 'alejandra rodrigues',
        street: '3833 rua santa catarina',
        city: 'umuarama',
        state: 'santa catarina',
        postcode: 43646,
      },
      {
        id: 'alejandra.rodrigues',
        picture: 'https://randomuser.me/api/portraits/med/women/18.jpg',
        name: 'alejandra rodrigues',
        street: '3833 rua santa catarina',
        city: 'umuarama',
        state: 'santa catarina',
        postcode: 43646,
      },
      {
        id: 'alejandra.rodrigues',
        picture: 'https://randomuser.me/api/portraits/med/women/18.jpg',
        name: 'alejandra rodrigues',
        street: '3833 rua santa catarina',
        city: 'umuarama',
        state: 'santa catarina',
        postcode: 43646,
      },
    ],
    totalPages: 22,
    totalUsers: 90,
    currentPage: 2,
  }
})
</script>

<template>
  <section class="page-user-list">
    <div class="page-user-list__wrapper">
      <h1 class="page-user-list__title">Lista de membros</h1>
      <div class="page-user-list__content">
        <aside class="page-user-list__side-bar">
          <StateFilter @update="handleStateFilterUpdate" />
        </aside>
        <section class="page-user-list__main main-content">
          <section class="main-content__top">
            <p class="main-content__count">
              Exibindo {{ state.userList?.users.length ?? 0 }} de
              {{ state.userList?.totalUsers || 0 }} itens
            </p>
            <div class="main-content__sort">
              <div class="sort-block">
                <p class="sort-block__text">Ordernar por:</p>
                <div class="sort-block__field">
                  <BaseSelect
                    @change="handleSortUpdate"
                    name="sort-users"
                    :options="[
                      {
                        name: 'Nome',
                        value: 'name',
                      },
                      {
                        name: 'Cidade',
                        value: 'city',
                      },
                    ]"
                  />
                </div>
              </div>
            </div>
          </section>
          <section class="main-content__bottom">
            <div
              v-for="user in state.userList?.users"
              :key="user.id"
              class="main-content__user-card"
            >
              <UserCard
                :id="user.id"
                :picture="user.picture"
                :name="user.name"
                :street="user.street"
                :city="user.city"
                :state="user.state"
                :postcode="user.postcode"
              />
            </div>
          </section>
          <section class="main-content__pagination">
            <PaginationNav
              :max="state.userList?.totalPages ?? 0"
              :current="state.userList?.currentPage ?? 0"
              @go-to="handlePaginationUpdate"
            />
          </section>
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
  }

  &__content {
    flex-direction: column;
    display: flex;

    @include screen('lg') {
      align-items: flex-start;
      flex-direction: row;
    }
  }

  &__search-bar {
    display: none;

    @include screen('lg') {
      width: 400px;
      display: flex;
    }
  }

  &__side-bar {
    border: $border-size-base solid $gray-400;
    border-radius: $radius-base;
    padding: $spacing-6;
    min-height: 30vh;

    @include screen('lg') {
      width: 15vw;
    }
  }

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;

    @include screen('lg') {
      margin-left: $spacing-3;
    }
  }
}

.main-content {
  &__top {
    align-items: center;
    border: $border-size-base solid $gray-400;
    border-radius: $radius-base;
    display: flex;
    justify-content: space-between;
    margin-top: $spacing-3;
    padding: $spacing-3;

    @include screen('lg') {
      margin-top: 0;
    }
  }

  &__bottom {
    display: flex;
    flex-wrap: wrap;
    margin: $spacing-3 negative($spacing-1) negative($spacing-3)
      negative($spacing-1);
  }

  &__user-card {
    padding: 0 $spacing-1 $spacing-3 $spacing-1;
    width: 100%;

    @include screen('lg') {
      width: calc(33.33% - $spacing-3);
    }
  }

  &__count {
    font-size: $text-base;
    font-weight: $font-regular;
    line-height: $leading-4;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin: $spacing-9 0 $spacing-8 0;
  }
}

.sort-block {
  align-items: center;
  display: flex;

  &__text {
    font-size: $text-sm;
    font-weight: $font-medium;
    line-height: $leading-2;
    padding-right: $spacing-1;
  }

  &__field {
    min-width: 65px;
    max-width: 130px;
  }
}
</style>
