<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { UserData } from '@/types'

import ContentBlock from './components/ContentBlock/ContentBlock.vue'

export interface UserDetailsState {
  userData: UserData | null
}

const state = reactive<UserDetailsState>({
  userData: null,
})

const formatDate = (date: string) => {
  const dateObj = new Date(date)

  return dateObj.toLocaleDateString()
}

onMounted(() => {
  // Mock
  state.userData = {
    id: 'alejandra.rodrigues',
    gender: 'female',
    name: {
      title: 'mrs',
      first: 'alejandra',
      last: 'rodrigues',
    },
    location: {
      street: '3833 rua santa catarina ',
      city: 'umuarama',
      state: 'santa catarina',
      postcode: 43646,
      coordinates: {
        latitude: '-50.7186',
        longitude: '-20.4596',
      },
      timezone: {
        offset: '+3:00',
        description: 'Baghdad, Riyadh, Moscow, St. Petersburg',
      },
    },
    email: 'alejandra.rodrigues@example.com',
    dob: {
      date: '1974-05-16T14:46:15Z',
      age: 44,
    },
    registered: {
      date: '2013-03-06T16:09:16Z',
      age: 5,
    },
    phone: '(09) 7033-7406',
    cell: '(54) 3190-3469',
    picture: {
      large: 'https://randomuser.me/api/portraits/women/18.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/18.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/18.jpg',
    },
  }
})
</script>

<template>
  <div class="page-user-details">
    <div v-if="state.userData" class="page-user-details__content">
      <div class="profile-card">
        <div class="profile-card__content">
          <div class="profile-card__picture">
            <img
              :src="state.userData.picture.large"
              :alt="`Foto de ${state.userData.name.first}`"
              class="profile-card__image"
            />
          </div>
          <div class="profile-card__block">
            <ContentBlock
              :title="state.userData.name.title"
              :value="`${state.userData.name.first} ${state.userData.name.last}`"
            />
          </div>
          <div class="profile-card__block profile-card__block--inline">
            <ContentBlock
              title="Data de nascimento"
              :value="formatDate(state.userData.dob.date)"
            />
            <ContentBlock title="Idade" :value="state.userData.dob.age" />
          </div>
        </div>
      </div>
      <div class="aditional-info">
        <div class="aditional-info__content">
          <div class="info-block">
            <h3 class="info-block__title">Contato</h3>
            <div class="info-block__data info-block__data--inline">
              <ContentBlock title="Telefone" :value="state.userData.phone" />
              <ContentBlock title="Celular" :value="state.userData.cell" />
              <ContentBlock title="E-mail" :value="state.userData.email" />
            </div>
          </div>
          <div class="info-block">
            <h3 class="info-block__title">Endereço</h3>
            <div class="info-block__data info-block__data--inline">
              <ContentBlock
                title="Cidade"
                :value="state.userData.location.city"
              />
              <ContentBlock
                title="Estado"
                :value="state.userData.location.state"
              />
              <ContentBlock
                title="Rua"
                :value="state.userData.location.street"
              />
              <ContentBlock
                title="CEP"
                :value="state.userData.location.postcode"
              />
            </div>
            <div class="info-block__data">
              <div class="map-embed">
                <iframe
                  width="100%"
                  height="100%"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  :src="`https://maps.google.com/maps?width=100%25&amp;height=100%&amp;hl=en&amp;q=${state.userData.location.coordinates.latitude},%20${state.userData.location.coordinates.longitude}+(${state.userData.name.first})&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-user-details {
  margin-top: calc(
    $spacing-11 + $spacing-6
  ); // Negative margin from picture + spacing

  &__content {
    display: flex;
    flex-direction: column;

    @include screen('lg') {
      flex-direction: row;
    }
  }
}

.profile-card {
  flex: 1;

  @include screen('lg') {
    flex: none;
    width: 300px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    border: $border-size-base solid $gray-400;
    border-radius: $radius-base;
    padding: $spacing-6;
  }

  &__picture {
    align-self: center;
    border: $border-size-base solid $gray-400;
    border-radius: $radius-full;
    height: 100%;
    margin-top: negative($spacing-11);
    overflow: hidden;
    width: calc($spacing-11 * 2);
  }

  &__image {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  &__block {
    margin-top: $spacing-6;

    &--inline {
      display: flex;
      flex-direction: column;

      @include screen('lg') {
        flex-direction: row;
      }
    }
  }
}

.aditional-info {
  flex: 1;
  margin-top: $spacing-3;

  @include screen('lg') {
    margin-left: $spacing-3;
    margin-top: 0;
  }

  &__content {
    border: $border-size-base solid $gray-400;
    border-radius: $radius-base;
    padding: $spacing-6;
  }
}

.info-block {
  &:not(:first-child) {
    margin-top: $spacing-7;
  }

  &__title {
    font-size: $text-lg;
    margin: 0;
  }

  &__data {
    margin-top: $spacing-2;

    &--inline {
      display: flex;
      flex-direction: column;

      @include screen('lg') {
        flex-direction: row;
      }
    }
  }
}

.map-embed {
  height: 250px;
}
</style>
