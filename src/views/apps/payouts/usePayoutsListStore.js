import axiosIns from '@axios'
import { defineStore } from 'pinia'

export const usePayoutsListStore = defineStore('PayoutsListStore', {
  actions: {
    fetchPayouts(params) { 
      return axiosIns.get('paymentQuery/', {params})
    }
  },
})
