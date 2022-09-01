<script setup lang="ts">
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'

export interface IconBaseProps {
  color?: string
  height: number
  name: string
  width?: number
}

const props = withDefaults(defineProps<IconBaseProps>(), {
  color: '#ffffff',
})

const iconHeight = computed(() => {
  return numberToSize(props.height)
})

const iconWidth = computed(() => {
  return numberToSize(props.width ?? props.height)
})

const IconComponent = defineAsyncComponent(
  () => import(`./IconOptions/${props.name}.vue`)
)

const numberToSize = (number: number) => {
  return `${number}px`
}
</script>

<template>
  <div data-testid="icon-base" class="icon-base">
    <IconComponent />
  </div>
</template>

<style lang="scss" scoped>
.icon-base {
  color: v-bind('props.color');
  height: v-bind('iconHeight');
  width: v-bind('iconWidth');
}
</style>
