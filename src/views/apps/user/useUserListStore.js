import axiosIns from '@axios'
import { defineStore } from 'pinia'

export const useUserListStore = defineStore('UserListStore', {
  actions: {
    fetchUsers(params) { 
      return axiosIns.get('/user/', {params})
    },
    addUser(userData) {
      return new Promise((resolve, reject) => {
        axiosIns.post('/apps/users/user', {
          user: userData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUser(id) {
      return new Promise((resolve, reject) => {
        axiosIns.get(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
