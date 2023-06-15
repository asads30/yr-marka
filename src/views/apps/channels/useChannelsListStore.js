import axiosIns from '@axios'
import { defineStore } from 'pinia'

export const useChannelsListStore = defineStore('ChannelsListStore', {
  actions: {
    fetchChannels(params) { 
      return axiosIns.get('channel/', {params})
    },
    fetchChannelsByAddress(params) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`channel/getChannelByLikeAddress/?address=${params.address}&pageSize=${params.pageSize}&page=${params.page}`).then(response => resolve(response)).catch(error => reject(error))
      })
    }
  },
})
