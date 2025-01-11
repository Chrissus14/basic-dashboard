<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-6">Perfil del Propietario</h2>
    
    <form @submit.prevent="saveProfile" class="space-y-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input
            type="text"
            id="name"
            v-model="profile.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="profile.email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            id="phone"
            v-model="profile.phone"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label for="company" class="block text-sm font-medium text-gray-700">Nombre de la Pizzería</label>
          <input
            type="text"
            id="company"
            v-model="profile.company"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Dirección Principal</label>
        <textarea
          id="address"
          v-model="profile.address"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        ></textarea>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          :disabled="loading"
        >
          {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const profile = ref({
  name: 'Juan Pérez',
  email: 'juan@pizzeria.com',
  phone: '555-0123',
  company: 'Pizzería Deliciosa',
  address: 'Av. Principal #123, Col. Centro'
})

async function saveProfile() {
  loading.value = true
  try {
    // Aquí iría la lógica para guardar en el backend
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulación de guardado
    ElMessage({
      message: 'Perfil actualizado correctamente',
      type: 'success',
    })
  } catch (error) {
    ElMessage.error('Error al guardar los cambios')
  } finally {
    loading.value = false
  }
}
</script>
