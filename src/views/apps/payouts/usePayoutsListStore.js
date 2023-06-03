import axiosIns from '@axios'
import { defineStore } from 'pinia'

export const usePayoutsListStore = defineStore('PayoutsListStore', {
  actions: {
    fetchPayouts() { 
      return axiosIns.get('paymentQuery/')
    },
    fetchVerify() { 
      return axiosIns.get('verifyRequest/')
    }
  },
})
