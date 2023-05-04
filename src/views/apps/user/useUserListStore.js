import axiosIns from '@axios'
import { defineStore } from 'pinia'

export const useUserListStore = defineStore('UserListStore', {
  actions: {
    fetchUsers(params) { 
      return axiosIns.get('user/', {params})
    },
    blockUserById(id){
      return axiosIns.post(`user/ban?userId=${id}`)
    },
    fetchUserById(id) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`user/getUserById/?userId=${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    addUser(userData) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/apps/users/user', {
          user: userData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUserChannelsById(id) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`channel/getChannelsByUserId/?userId=${id}&page=1&pageSize=50`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    fetchUserProductsById(id) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`product/getProductByUserId/?userId=${id}&page=1&pageSize=50`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    fetchUserPaymentsById(id) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`payment/getPaymentByUserId?userId=${id}&page=1&pageSize=50`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    fetchUser(id) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    fetchUserPayouts() {
      return new Promise((resolve, reject) => {
        axiosIns.get(`verifyRequest/?page=1&pageSize=50`).then(response => resolve(response)).catch(error => reject(error))
      })
    }
  },
})
