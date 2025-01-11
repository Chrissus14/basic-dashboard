import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  // Mock data for demo purposes
  const mockUser = {
    email: 'admin@pizzeria.com',
    password: 'admin123'
  }

  function login(credentials) {
    if (credentials.email === mockUser.email && credentials.password === mockUser.password) {
      user.value = {
        id: 1,
        name: 'Admin',
        email: mockUser.email,
        role: 'admin'
      }
      isAuthenticated.value = true
      return true
    }
    return false
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
})
