<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, watch } from 'vue'
import type { UserListResponse, UserSortOptions } from '@/types'
import { useFetch } from '@/composable/useFetch'
import router from '@/router'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

import BaseSelect from '@/components/Base/Select/BaseSelect.vue'

import UserCard from '@/views/Users/UserList/components/UserCard/UserCard.vue'
import UserCardSkeleton from '@/views/Users/UserList/components/UserCard/UserCardSkeleton.vue'
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import StateFilter from '@/views/Users/UserList/components/StateFilter/StateFilter.vue'
import PaginationNav from '@/components/PaginationNav/PaginationNav.vue'
import IconBase from '@/components/IconBase/IconBase.vue'

const REQUEST_URL = '/users'

type MenuState = 'opened' | 'closed'

interface UserListState {
  pageLoaded: boolean
  userList: UserListResponse | null
  menuStatus: MenuState | null
}

interface UserListFilters {
  state: string[]
  query: string
  sort: string
}

interface SortData {
  [key: string]: string
}

const SORT_OPTIONS: UserSortOptions[] = [
  {
    name: 'Nome',
    value: 'name',
  },
  {
    name: 'Rua',
    value: 'street',
  },
  {
    name: 'Cidade',
    value: 'city',
  },
  {
    name: 'Estado',
    value: 'state',
  },
  {
    name: 'CEP',
    value: 'postcode',
  },
  {
    name: 'Id',
    value: 'name',
  },
]

const {
  execute: getUserList,
  isLoading,
  error: hasApiError,
} = useFetch(REQUEST_URL)

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smallerOrEqual('lg')

const state = reactive<UserListState>({
  pageLoaded: false,
  userList: null,
  menuStatus: null,
})

const filters = reactive<UserListFilters>({
  state: [],
  query: '',
  sort: SORT_OPTIONS[0].value,
})

const handleSearchUpdate = (query: string) => {
  filters.query = query
}

const handleStateFilterUpdate = (state: string[]) => {
  filters.state = state
}

const handleSortUpdate = (event: Event) => {
  filters.sort = (event.target as HTMLSelectElement)?.value
}

const handlePaginationUpdate = (page: number) => {
  updateUserList(page)
}

const updateUserList = async (page?: number) => {
  if (state.menuStatus === 'opened') {
    toggleMenu(null, 'closed')
  }

  const params: SortData = {}

  if (page) {
    params['page'] = page.toString()
  }

  if (filters.state.length) {
    params['state'] = filters.state.toString()
  }

  if (filters.query) {
    params['query'] = filters.query
  }

  if (filters.sort) {
    params['sort'] = filters.sort
  }

  const { data } = await getUserList(
    `${REQUEST_URL}?${new URLSearchParams(params)}`
  )

  if (hasApiError.value) {
    await router.push({ name: 'errorPage' })
    return
  }

  state.userList = data.value as UserListResponse
}

const toggleMenu = (event: MouseEvent | null, forceState?: MenuState) => {
  if (forceState) {
    state.menuStatus = forceState

    return
  }

  state.menuStatus = state.menuStatus === 'opened' ? 'closed' : 'opened'
}

const hasContent = computed(() => {
  return !!state.userList?.users.length
})

watch(filters, () => {
  updateUserList()
})

onBeforeMount(() => {
  updateUserList()
})

onMounted(() => {
  // avoid error when trying to load teleport elements
  state.pageLoaded = true
})
</script>

<template>
  <section
    class="page-user-list"
    :class="{
      'page-user-list--menu-opened': isMobile && state.menuStatus === 'opened',
    }"
  >
    <div class="page-user-list__wrapper">
      <h1 class="page-user-list__title">Lista de membros</h1>
      <div class="page-user-list__content">
        <div
          id="default-state-filter-spot"
          class="page-user-list__sidebar"
        ></div>
        <section class="page-user-list__main">
          <div class="main-content">
            <section class="main-content__top">
              <p class="result-counter">
                Exibindo {{ state.userList?.users.length ?? 0 }} de
                {{ state.userList?.totalUsers || 0 }} itens
              </p>
              <div class="sort-form" id="default-sort-form-spot"></div>
              <button
                v-if="isMobile"
                @click="toggleMenu"
                class="btn-mobile-menu"
              >
                <IconBase name="IconTune" :height="22" color="#222D39" />
              </button>
            </section>
            <section class="main-content__user-list">
              <TransitionGroup name="fade" mode="out-in">
                <template v-if="isLoading">
                  <div
                    v-for="skeleton in 9"
                    :key="skeleton"
                    class="main-content__user-card"
                  >
                    <UserCardSkeleton />
                  </div>
                </template>
                <template v-else>
                  <template v-if="hasContent">
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
                  </template>
                  <p v-else class="main-content__no-user-found">
                    Nenhum conteúdo encontrado
                  </p>
                </template>
              </TransitionGroup>
            </section>
            <section
              v-if="!isLoading && hasContent"
              class="main-content__pagination"
            >
              <PaginationNav
                :max="state.userList?.totalPages ?? 0"
                :current="state.userList?.currentPage ?? 0"
                @go-to="handlePaginationUpdate"
              />
            </section>
          </div>
        </section>
      </div>
    </div>

    <div
      class="page-user-list__mobile-menu"
      :class="`page-user-list__mobile-menu--${state.menuStatus}`"
    >
      <div class="close">
        <button @click="toggleMenu" class="close__btn">
          <IconBase name="IconClose" :height="32" color="#222D39" />
        </button>
      </div>
      <div class="mobile-menu">
        <div class="mobile-menu__item">
          <div id="mb-sort-spot"></div>
        </div>
        <div class="mobile-menu__item">
          <div id="mb-search-spot"></div>
        </div>
        <div class="mobile-menu__item">
          <div id="mb-state-filter-spot"></div>
        </div>
      </div>
    </div>

    <!-- Items with dinamic places -->
    <template v-if="state.pageLoaded">
      <Teleport
        :to="isMobile ? '#mb-state-filter-spot' : '#default-state-filter-spot'"
      >
        <aside class="state-filter">
          <StateFilter @update="handleStateFilterUpdate" />
        </aside>
      </Teleport>

      <Teleport :to="isMobile ? '#mb-sort-spot' : '#default-sort-form-spot'">
        <div class="sort-block">
          <p class="sort-block__text">Ordernar por:</p>
          <div class="sort-block__field">
            <BaseSelect
              @change="handleSortUpdate"
              name="sort-users"
              :options="SORT_OPTIONS"
              :disabled="isLoading"
            />
          </div>
        </div>
      </Teleport>

      <Teleport :to="isMobile ? '#mb-search-spot' : '#tp-header-search-spot'">
        <div class="search-bar">
          <SearchBar @update="handleSearchUpdate" :disabled="isLoading" />
        </div>
      </Teleport>
    </template>
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
    display: flex;
    flex-direction: column;
    margin-top: $spacing-9;

    @include screen('lg') {
      align-items: flex-start;
      flex-direction: row;
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

  &__mobile-menu {
    @include side-menu;

    @include screen('lg') {
      display: none;
    }
  }

  &--menu-opened {
    @include background-shadow;
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

  &__user-list {
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

  &__no-user-found {
    font-weight: $font-bold;
    font-size: $text-lg;
    margin-top: $spacing-3;
    text-align: center;
    width: 100%;
  }

  .result-counter {
    font-size: $text-base;
    font-weight: $font-regular;
    line-height: $leading-4;
  }

  .sort-form {
    display: none;

    @include screen('lg') {
      display: flex;
    }
  }

  .btn-mobile-menu {
    background: none;
    border: none;

    @include screen('lg') {
      display: none;
    }
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

.state-filter {
  border-radius: $radius-base;
  margin-top: $spacing-6;
  min-height: 30vh;
  width: 100%;

  @include screen('lg') {
    border: $border-size-base solid $gray-400;
    margin-top: 0;
    padding: $spacing-6;
    width: 250px;
  }
}

.search-bar {
  width: 100%;

  @include screen('lg') {
    width: 400px;
  }
}

.mobile-menu {
  padding: 0 $spacing-2;
  width: 100%;
  height: 90%;
  overflow: auto;

  &__item {
    width: 100%;
    flex: 1;

    &:first-child {
      display: flex;
      justify-content: center;
    }

    &:not(:first-child) {
      margin-top: $spacing-6;
    }
  }
}
</style>
