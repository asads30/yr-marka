import axiosIns from '@axios'
import { defineStore } from 'pinia'

export const usePostsListStore = defineStore('PostsListStore', {
  actions: {
    fetchPosts(params) { 
      return axiosIns.get('product/', {params})
    },
    fetchPostById(id) {
      return axiosIns.get(`product/getProductById?productId=${id}`)
    }
  },
})
