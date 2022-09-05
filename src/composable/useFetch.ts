import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import type { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'https://jsm-bff.herokuapp.com/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const useFetch = <Data>(
  url: string,
  options: AxiosRequestConfig = {},
  immediate = true
) => useAxios<Data>(url, options, instance, { immediate })
