<script setup lang="ts"></script>

<template>
  <div class="user-card-skeleton">
    <div class="user-card-skeleton__wrapper">
      <div class="user-card-skeleton__profile">
        <div class="user-card-skeleton__picture"></div>
      </div>
      <div class="user-card-skeleton__name"></div>
      <div class="user-card-skeleton__street"></div>
      <div class="user-card-skeleton__city"></div>
      <div class="user-card-skeleton__state-zip"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-card-skeleton {
  border: $border-size-base solid $gray-400;
  border-radius: $radius-base;
  display: flex;
  padding: $spacing-9 $spacing-3;

  &__wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__profile {
    border-radius: $radius-full;
    height: 80px;
    overflow: hidden;
    width: 80px;
  }

  &__picture {
    @include skeleton;
    height: 100%;
    width: 100%;
  }

  &__name,
  &__street,
  &__city,
  &__state-zip {
    height: 20px;
    margin-top: $spacing-2;
    width: 80%;
    @include skeleton;
  }

  &__street {
    margin-top: $spacing-3;
  }

  &__state-zip {
    margin-top: 2px;
  }
}
</style>
