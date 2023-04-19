import axiosIns from '@axios'
import { defineStore } from 'pinia'

export const useInvoiceListStore = defineStore('InvoiceListStore', {
  actions: {
    fetchInvoice(params) { 
      return axiosIns.get('payment/', {params})
    }
  },
})
