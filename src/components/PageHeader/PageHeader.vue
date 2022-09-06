<script setup lang="ts">
import { computed, reactive } from 'vue'
import IconBase from '@/components/IconBase/IconBase.vue'

interface PageHeaderState {
  menuStatus: MenuState | null
}

type MenuState = 'opened' | 'closed'

const state = reactive<PageHeaderState>({
  menuStatus: null,
})

const menuClasses = computed(() => {
  return [
    'header-menu',
    state.menuStatus ? `header-menu--${state.menuStatus}` : '',
  ]
})

const toggleMenu = () => {
  state.menuStatus = state.menuStatus === 'opened' ? 'closed' : 'opened'
}
</script>

<template>
  <header
    data-testid="page-header"
    class="page-header"
    :class="{ 'page-header--menu-opened': state.menuStatus === 'opened' }"
  >
    <div class="page-header__content">
      <RouterLink :to="{ name: 'appHome' }" class="header-logo">
        <img
          src="@/assets/images/logo.svg"
          alt="Juntos Somos Mais - Logo"
          class="header-logo__image"
        />
      </RouterLink>
      <div :class="menuClasses">
        <div class="header-menu__item" id="tp-header-search-spot"></div>
        <div class="header-menu__item">
          <div class="fake-content"></div>
        </div>
        <div class="header-menu__item">
          <div class="fake-content"></div>
        </div>
        <div class="close">
          <button
            @click="toggleMenu"
            class="close__btn"
            data-testid="page-header-menu-open"
          >
            <IconBase name="IconClose" :height="32" color="#222D39" />
          </button>
        </div>
      </div>
      <div class="mobile-menu">
        <button
          @click="toggleMenu"
          class="mobile-menu__btn"
          data-testid="page-header-menu-close"
        >
          <IconBase name="IconMenu" :height="32" color="#222D39" />
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.page-header {
  background-color: $gray-300;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 0;

  &__content {
    align-items: center;
    display: flex;
    justify-content: space-between;
    max-width: $content-desktop;
    margin: $spacing-6;
    width: 100%;

    @include screen('xl') {
      margin-right: 0;
      margin-left: 0;
    }
  }

  &--menu-opened {
    @include background-shadow;
  }
}

.header-menu {
  @include side-menu;

  @include screen('lg') {
    background: $transparent;
    box-shadow: none;
    flex: 1;
    justify-content: flex-end;
    flex-direction: row;
    height: auto;
    opacity: 1;
    padding: 0;
    position: relative;
    margin-left: $spacing-3;
    min-width: auto;
    transform: none;
    width: auto;
  }

  &__item {
    width: 100%;

    @include screen('lg') {
      max-width: 100%;
      width: auto;
    }

    &:not(:last-child) {
      margin-bottom: $spacing-3;

      @include screen('lg') {
        margin-bottom: 0;
        margin-right: $spacing-3;
      }
    }
  }
}

.header-logo {
  width: 148px;
  min-width: 148px;

  &__image {
    object-fit: contain;
  }
}

.mobile-menu {
  @include screen('lg') {
    display: none;
  }

  &__btn {
    background-color: $transparent;
    border: none;
  }
}

.fake-content {
  background-color: $gray-500;
  border-radius: $radius-extra;
  height: 20px;
  width: 100%;

  @include screen('lg') {
    height: 16px;
    width: 150px;
  }
}
</style>
