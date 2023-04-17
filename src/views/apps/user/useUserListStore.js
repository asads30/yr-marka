import axios from '@axios'
import { defineStore } from 'pinia'

export const useUserListStore = defineStore('UserListStore', {
  actions: {
    fetchUsers(params) { 
      return axios.get('/apps/users/list', { params })
    },
    addUser(userData) {
      return new Promise((resolve, reject) => {
        axios.post('/apps/users/user', {
          user: userData,
        }).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUser(id) {
      return new Promise((resolve, reject) => {
        axios.get(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
