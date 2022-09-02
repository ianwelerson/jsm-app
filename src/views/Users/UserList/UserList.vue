<script setup lang="ts">
import { reactive } from 'vue'
import UserCard from '@/views/Users/UserList/components/UserCard.vue'

interface UserListState {
  shortStateList: boolean
}

const state = reactive<UserListState>({
  shortStateList: true,
})

const toggleVisibleStates = () => {
  state.shortStateList = !state.shortStateList
}
</script>

<template>
  <section class="page-user-list">
    <div class="page-user-list__wrapper">
      <h1 class="page-user-list__title">Lista de membros</h1>
      <div class="page-user-list__content">
        <aside class="state-filter">
          <p class="state-filter__title">Por Estado</p>
          <ul class="state-filter__list">
            <li class="state-filter__item">São Paulo</li>
            <li class="state-filter__item">São Paulo</li>
            <li class="state-filter__item">São Paulo</li>
            <li class="state-filter__item">São Paulo</li>
          </ul>
          <button class="state-filter__show-more" @click="toggleVisibleStates">
            {{ state.shortStateList ? 'Ver todos' : 'Ver menos' }}
          </button>
        </aside>
        <section class="content-side">
          <div class="content-side__top-info">Content</div>
          <div class="content-side__user-list">
            <UserCard />
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.page-user-list {
  margin-top: $spacing-6;

  &__wrapper {
    //
  }

  &__title {
    font-size: $text-xl;
    font-weight: $font-bold;
    line-height: $leading-5;
    color: $text-color;
  }

  &__content {
    display: flex;
  }
}

.state-filter {
  border: $border-size-base solid $gray-400;
  border-radius: $radius-base;
  padding: $spacing-6;
  min-height: 30vh;
  width: 15vw;

  &__title {
    color: $text-color;
    font-size: $text-lg;
    font-weight: $font-medium;
    line-height: $leading-2;
  }

  &__list {
    list-style: none;
    padding: $spacing-3 0 0 0;
    margin: 0;
  }

  &__item {
    color: $text-color;
    font-size: $text-base;
    line-height: $leading-4;

    &:not(:first-child) {
      margin-top: $spacing-1;
    }
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
