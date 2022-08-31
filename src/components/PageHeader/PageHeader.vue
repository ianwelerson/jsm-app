<script setup lang="ts">
import { computed, reactive } from 'vue'

interface PageHeaderState {
  menuStatus: MenuState | null
}

type MenuState = 'opened' | 'closed'

const state = reactive<PageHeaderState>({
  menuStatus: null,
})

const menuClasses = computed(() => {
  return ['menu', state.menuStatus ? `menu--${state.menuStatus}` : '']
})

const toggleMenu = () => {
  state.menuStatus = state.menuStatus === 'opened' ? 'closed' : 'opened'
}
</script>

<template>
  <header
    class="header"
    :class="{ 'header--menu-opened': state.menuStatus === 'opened' }"
  >
    <div class="header__content">
      <div class="logo">
        <img
          src="@/assets/images/logo.svg"
          alt="Juntos Somos Mais - Logo"
          class="logo__image"
        />
      </div>
      <div :class="menuClasses">
        <div class="menu__item" id="tp-header-search-spot"></div>
        <div class="menu__item">
          <div class="fake-content"></div>
        </div>
        <div class="menu__item">
          <div class="fake-content"></div>
        </div>
        <div class="menu__close">
          <button @click="toggleMenu">X</button>
        </div>
      </div>
      <div class="mobile-menu">
        <button @click="toggleMenu">=</button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
$mobile-menu-width: calc(
  (60vw + $spacing-3 + $spacing-3) * -1
); // Translate the menu the equivalent of his width + padding

.header {
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
      background-color: $gray-900;
      opacity: 0.3;
      z-index: 0;

      @include screen('lg') {
        content: none;
      }
    }
  }
}

.menu {
  align-items: center;
  background: $gray-300;
  box-shadow: 6px 0px 10px 0px rgba(155, 155, 155, 0.4);
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 0;
  opacity: 0;
  padding: $spacing-9 $spacing-3 $spacing-3 $spacing-3;
  position: fixed;
  top: 0;
  transform: translateX($mobile-menu-width);
  width: 60vw;
  z-index: 10;

  @include screen('lg') {
    background: $transparent;
    box-shadow: none;
    flex-direction: row;
    height: auto;
    opacity: 1;
    padding: 0;
    position: relative;
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
  }
}

.logo {
  width: 148px;

  &__image {
    object-fit: contain;
  }
}

.fake-content {
  background-color: $gray-500;
  border-radius: $radius-extra;
  height: 20px;
  width: 100%;

  @include screen('lg') {
    height: 16px;
    width: 12vw;
  }
}

.mobile-menu {
  @include screen('lg') {
    display: none;
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
