<script setup lang="ts">
import IconBase from '@/components/IconBase/IconBase.vue'
</script>

<template>
  <footer class="page-footer">
    <div class="page-footer__content">
      <img
        src="@/assets/images/logo-white.png"
        alt="Juntos Somos Mais"
        class="page-footer__logo"
        height="48"
        width="176"
      />
      <p class="page-footer__company">Juntos Somos Mais Fidelização S.A.</p>
      <div class="social-networks">
        <p class="social-networks__title">Siga-nos nas redes sociais:</p>
        <div class="social-networks__button-group">
          <a
            href="https://www.facebook.com/juntossomosmais/"
            target="_blank"
            rel="noopener noreferrer"
            class="social-networks__button"
          >
            <IconBase name="IconFacebook" :height="22" />
          </a>
          <a
            href="https://www.linkedin.com/company/juntos-somos-mais/"
            target="_blank"
            rel="noopener noreferrer"
            class="social-networks__button"
          >
            <IconBase name="IconLinkedIn" :height="22" />
          </a>
          <a
            href="https://www.instagram.com/juntossomosmais/"
            target="_blank"
            rel="noopener noreferrer"
            class="social-networks__button"
          >
            <IconBase name="IconInstagram" :height="22" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.page-footer {
  &__content {
    align-items: center;
    background-color: $gray-900;
    display: flex;
    flex-direction: column;
    padding: $spacing-8 $spacing-6 $spacing-11 $spacing-6;
  }

  &__logo {
    height: 48px;
    object-fit: contain;
  }

  &__company {
    color: $white;
    font-size: $text-base;
    font-weight: $font-medium;
    line-height: $leading-4;
    margin-top: $spacing-6;
  }
}

.social-networks {
  margin-top: $spacing-6;

  &__title {
    color: $white;
    font-size: $text-sm;
    line-height: $leading-2;
  }

  &__button-group {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: $spacing-5;
  }

  &__button {
    background-color: $blue-500;
    border-radius: $radius-full;
    margin: 0 $spacing-1;
    padding: $spacing-1;
    transition: background-color 0.2s ease-in;

    &:hover {
      background-color: $blue-900;
      transition: background-color 0.2s ease-out;
    }
  }
}
</style>
