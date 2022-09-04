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
        <div class="header-menu__close">
          <button
            @click="toggleMenu"
            class="close-btn"
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
$mobile-menu-width: calc(
  (60vw + $spacing-3 + $spacing-3) * -1
); // Translate the menu the equivalent of his width + padding

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
    &::after {
      position: fixed;
      content: '';
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      background-color: $gray-1000;
      opacity: 0.3;
      z-index: 0;

      @include screen('lg') {
        content: none;
      }
    }
  }
}

.header-menu {
  align-items: center;
  background: $gray-300;
  box-shadow: 6px 0px 10px 0px rgba(155, 155, 155, 0.4);
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 0;
  opacity: 0;
  padding: $spacing-11 $spacing-3 $spacing-3 $spacing-3;
  position: fixed;
  top: 0;
  transform: translateX($mobile-menu-width);
  width: 60vw;
  z-index: 10;

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
    transform: none;
    width: auto;
  }

  &--opened {
    animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; // Inspired in https://animista.net/
  }

  &--closed {
    animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both; // Inspired in https://animista.net/
  }

  &--opened,
  &--closed {
    @include screen('lg') {
      animation: none;
    }
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

  &__close {
    position: absolute;
    top: $spacing-2;
    right: $spacing-2;

    @include screen('lg') {
      display: none;
    }

    .close-btn {
      background-color: $transparent;
      border: none;
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

// Amimations
@keyframes slide-in-left {
  0% {
    transform: translateX($mobile-menu-width);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out-left {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX($mobile-menu-width);
    opacity: 0;
  }
}
</style>
