<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Overlay for mobile -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden z-20"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar Navigation -->
    <aside 
      :class="[
        'w-[280px] bg-white shadow-lg transition-all duration-300 ease-in-out',
        'fixed inset-y-0 left-0 z-30 lg:static',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <div class="h-16 flex items-center justify-between px-4 border-b">
        <h1 class="text-xl font-bold text-gray-900">Pizzería Dashboard</h1>
        <button 
          @click="toggleSidebar" 
          class="lg:hidden text-gray-500 hover:text-gray-900"
        >
          <el-icon class="h-6 w-6"><Close /></el-icon>
        </button>
      </div>
      
      <nav class="mt-6">
        <div class="px-4 space-y-2">
          <router-link
            to="/dashboard"
            class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
            :class="[$route.path === '/dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50']"
          >
            <el-icon class="mr-3 h-5 w-5"><HomeFilled /></el-icon>
            Inicio
          </router-link>
          
          <router-link
            to="/dashboard/profile"
            class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
            :class="[$route.path === '/dashboard/profile' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50']"
          >
            <el-icon class="mr-3 h-5 w-5"><User /></el-icon>
            Perfil
          </router-link>
          
          <router-link
            to="/dashboard/customers"
            class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
            :class="[$route.path === '/dashboard/customers' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50']"
          >
            <el-icon class="mr-3 h-5 w-5"><UserFilled /></el-icon>
            Clientes
          </router-link>
          
          <router-link
            to="/dashboard/branches"
            class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
            :class="[$route.path === '/dashboard/branches' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50']"
          >
            <el-icon class="mr-3 h-5 w-5"><Shop /></el-icon>
            Sucursales
          </router-link>
        </div>
      </nav>

      <div class="absolute bottom-0 w-full p-4 border-t">
        <button
          @click="logout"
          class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <el-icon class="mr-2"><SwitchButton /></el-icon>
          Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 min-h-screen">
      <!-- Top bar -->
      <header class="h-16 bg-white shadow-sm flex items-center justify-between px-4 sticky top-0 z-10">
        <button 
          @click="toggleSidebar" 
          class="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
        >
          <el-icon class="h-6 w-6"><Menu /></el-icon>
        </button>
        <div class="text-sm text-gray-500">
          {{ new Date().toLocaleDateString() }}
        </div>
      </header>

      <!-- Page Content -->
      <div class="p-4 lg:p-6 w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { 
  HomeFilled, 
  User, 
  UserFilled, 
  Shop, 
  SwitchButton,
  Menu,
  Close
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
/* Smooth transitions */
.transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
