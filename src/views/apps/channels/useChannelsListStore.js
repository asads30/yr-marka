import axiosIns from '@axios'
import { defineStore } from 'pinia'

export const useChannelsListStore = defineStore('ChannelsListStore', {
  actions: {
    fetchChannels(params) { 
      return axiosIns.get('channel/', {params})
    }
  },
})
