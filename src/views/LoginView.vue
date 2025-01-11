<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
          Pizzería Dashboard
        </h2>
        <p class="text-lg text-gray-600">
          Inicia sesión para acceder al panel
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-6">
          <div>
            <label for="email-address" class="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              v-model="form.email"
              class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="ejemplo@email.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              v-model="form.password"
              class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingresa tu contraseña"
            />
          </div>
        </div>

        <div v-if="error" class="bg-red-50 text-red-500 p-4 rounded-lg text-sm text-center">
          {{ error }}
        </div>

        <div class="pt-4">
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
            </span>
            <span v-else>Iniciar sesión</span>
          </button>
        </div>
      </form>

      <div class="text-center text-sm text-gray-600">
        <p>Credenciales de prueba:</p>
        <p>Email: admin@pizzeria.com</p>
        <p>Contraseña: admin123</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''

  try {
    const success = await authStore.login(form)
    if (success) {
      router.push('/dashboard')
    } else {
      error.value = 'Credenciales inválidas'
    }
  } catch (e) {
    error.value = 'Ocurrió un error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>
