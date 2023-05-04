import axiosIns from '@axios'
import { defineStore } from 'pinia'

export const useAnalyticsStore = defineStore('AnalyticsStore', {
  actions: {
    fetchAnalytics() { 
      return axiosIns.get('/analytics?types=users,payments,products,channels&dateFrom=2023-04-20T00:00:00.000Z&dateTo=2023-05-04T00:00:00.000Z')
    }
  },
})
