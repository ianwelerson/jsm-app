<script setup lang="ts">
export interface BaseSelectProps {
  name: string
  options: SelectOption[]
  selected?: string | null
}

export interface SelectOption {
  name: string
  value: string | number | null
  disabled?: boolean
}

const props = defineProps<BaseSelectProps>()
</script>

<template>
  <select :name="name" class="base-select">
    <option
      v-for="option in props.options"
      :key="option.value ?? ''"
      :value="option.value"
      :selected="option.value === props.selected"
      :disabled="option.disabled"
      class="base-select__option"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.base-select {
  appearance: none;
  -webkit-appearance: none;
  background: url("data:image/svg+xml,<svg width='12' height='8' xmlns='http://www.w3.org/2000/svg'><path d='M10.59.59 6 5.17 1.41.59 0 2l6 6 6-6L10.59.59Z'/></svg>")
    no-repeat right $transparent;
  border: none;
  color: $text-color;
  font-size: $text-sm;
  line-height: $leading-2;
  outline: none;
  padding-right: $spacing-2;
  position: relative;
  width: 100%;
}
</style>
