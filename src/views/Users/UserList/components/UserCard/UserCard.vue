<script setup lang="ts">
export interface UserCardProps {
  id: string
  picture: string
  name: string
  street: string
  city: string
  state: string
  postcode: number
}

const props = defineProps<UserCardProps>()
</script>

<template>
  <RouterLink
    :to="{ name: 'userDetails', params: { userId: props.id } }"
    class="user-card"
  >
    <div class="user-card__wrapper">
      <div class="user-card__profile">
        <img
          :src="props.picture"
          :alt="`Foto de ${props.name}`"
          class="user-card__picture"
        />
      </div>
      <p class="user-card__name">{{ props.name }}</p>
      <p class="user-card__street">{{ props.street }}</p>
      <p class="user-card__city">{{ props.city }}</p>
      <p class="user-card__state-zip">
        {{ props.state }} - CEP: {{ props.postcode }}
      </p>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.user-card {
  border: $border-size-base solid $gray-400;
  border-radius: $radius-base;
  display: flex;
  padding: $spacing-9 $spacing-3;
  text-decoration: none;
  transition: box-shadow 0.4s ease-in;

  &:hover {
    box-shadow: 2px 6px 12px 6px rgba(229, 229, 229, 0.57);
    transition: box-shadow 0.4s ease-out;
  }

  &__wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__profile {
    border: $border-size-base solid $gray-300;
    border-radius: $radius-full;
    height: 80px;
    overflow: hidden;
    width: 80px;
  }

  &__picture {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  &__name,
  &__street,
  &__city,
  &__state-zip {
    color: $text-color;
    font-weight: $font-regular;
    text-transform: capitalize;
    text-align: center;
  }

  &__name {
    font-size: $text-lg;
    font-weight: $font-bold;
    line-height: $leading-3;
    margin-top: $spacing-2;
  }

  &__street {
    font-size: $text-sm;
    line-height: $leading-2;
    margin-top: $spacing-3;
  }

  &__city,
  &__state-zip {
    font-size: $text-xs;
    line-height: $leading-1;
  }

  &__city {
    margin-top: $spacing-2;
  }

  &__state-zip {
    margin-top: 0;
  }
}
</style>
