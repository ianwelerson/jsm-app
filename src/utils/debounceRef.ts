import { customRef } from 'vue'

// Example from https://vuejs.org/api/reactivity-advanced.html#customref
export function useDebouncedRef(value: string, delay = 200) {
  let timeout: NodeJS.Timeout

  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
