<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-indigo-100 text-indigo-500">
          <el-icon :size="24"><User /></el-icon>
        </div>
        <div class="ml-4">
          <p class="text-sm text-gray-500 font-medium">Total Clientes</p>
          <p class="text-2xl font-semibold text-gray-700">{{ customers.length }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-green-100 text-green-500">
          <el-icon :size="24"><Shop /></el-icon>
        </div>
        <div class="ml-4">
          <p class="text-sm text-gray-500 font-medium">Sucursales Activas</p>
          <p class="text-2xl font-semibold text-gray-700">{{ activeBranches }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-yellow-100 text-yellow-500">
          <el-icon :size="24"><Money /></el-icon>
        </div>
        <div class="ml-4">
          <p class="text-sm text-gray-500 font-medium">Ventas del Día</p>
          <p class="text-2xl font-semibold text-gray-700">$12,500</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-red-100 text-red-500">
          <el-icon :size="24"><List /></el-icon>
        </div>
        <div class="ml-4">
          <p class="text-sm text-gray-500 font-medium">Órdenes Pendientes</p>
          <p class="text-2xl font-semibold text-gray-700">8</p>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
    <!-- Últimos Clientes -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Últimos Clientes</h3>
        <router-link
          to="/dashboard/customers"
          class="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Ver todos
        </router-link>
      </div>
      <div class="space-y-4">
        <div v-for="customer in recentCustomers" :key="customer.id" class="flex items-center justify-between">
          <div class="flex items-center">
            <el-avatar class="mr-3">
              {{ getInitials(customer.name) }}
            </el-avatar>
            <div>
              <p class="font-medium">{{ customer.name }}</p>
              <p class="text-sm text-gray-500">{{ customer.email }}</p>
            </div>
          </div>
          <span class="text-sm text-gray-500">{{ customer.lastOrder }}</span>
        </div>
      </div>
    </div>

    <!-- Estado de Sucursales -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Estado de Sucursales</h3>
        <router-link
          to="/dashboard/branches"
          class="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Ver todas
        </router-link>
      </div>
      <div class="space-y-4">
        <div v-for="branch in branches" :key="branch.id" class="flex items-center justify-between">
          <div class="flex items-center">
            <el-icon class="mr-3 text-gray-400" :size="24"><Shop /></el-icon>
            <div>
              <p class="font-medium">{{ branch.name }}</p>
              <p class="text-sm text-gray-500">{{ branch.manager }}</p>
            </div>
          </div>
          <el-tag :type="branch.status === 'Activa' ? 'success' : 'danger'" size="small">
            {{ branch.status }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { User, Shop, Money, List } from '@element-plus/icons-vue'
import { useCustomersStore } from '../stores/customers'
import { useBranchesStore } from '../stores/branches'

const customersStore = useCustomersStore()
const branchesStore = useBranchesStore()

const customers = computed(() => customersStore.customers)
const branches = computed(() => branchesStore.branches)

const activeBranches = computed(() => 
  branches.value.filter(branch => branch.status === 'Activa').length
)

const recentCustomers = computed(() => 
  [...customers.value]
    .sort((a, b) => new Date(b.lastOrder) - new Date(a.lastOrder))
    .slice(0, 5)
)

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>
