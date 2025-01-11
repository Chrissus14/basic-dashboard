<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="sm:flex sm:items-center sm:justify-between mb-6">
      <h2 class="text-2xl font-bold">Clientes</h2>
      <button
        @click="openAddDialog"
        class="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <el-icon class="mr-2"><Plus /></el-icon>
        Agregar Cliente
      </button>
    </div>

    <el-table
      :data="customers"
      style="width: 100%"
      :border="true"
      v-loading="loading"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="Nombre" min-width="150">
        <template #default="{ row }">
          <div class="flex items-center">
            <el-avatar :size="32" class="mr-2">
              {{ getInitials(row.name) }}
            </el-avatar>
            {{ row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Correo" min-width="180" />
      <el-table-column prop="phone" label="Teléfono" min-width="120" />
      <el-table-column prop="address" label="Dirección" min-width="200" show-overflow-tooltip />
      <el-table-column prop="lastOrder" label="Última Orden" min-width="120" />
      <el-table-column fixed="right" label="Acciones" width="150">
        <template #default="{ row }">
          <div class="flex space-x-2">
            <el-button
              @click="editCustomer(row)"
              type="primary"
              :icon="Edit"
              circle
            />
            <el-button
              @click="confirmDelete(row)"
              type="danger"
              :icon="Delete"
              circle
            />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- Dialog para agregar/editar cliente -->
    <el-dialog
      v-model="showDialog"
      :title="isEditing ? 'Editar Cliente' : 'Agregar Cliente'"
      width="500px"
      :close-on-click-modal="false"
      @close="resetForm"
    >
      <el-form
        ref="formRef"
        :model="customerForm"
        :rules="rules"
        label-width="120px"
        label-position="top"
        @submit.prevent="saveCustomer"
      >
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="customerForm.name" placeholder="Nombre completo" />
        </el-form-item>
        <el-form-item label="Correo" prop="email">
          <el-input v-model="customerForm.email" type="email" placeholder="ejemplo@email.com" />
        </el-form-item>
        <el-form-item label="Teléfono" prop="phone">
          <el-input v-model="customerForm.phone" placeholder="(555) 555-5555" />
        </el-form-item>
        <el-form-item label="Dirección" prop="address">
          <el-input
            v-model="customerForm.address"
            type="textarea"
            :rows="3"
            placeholder="Dirección completa"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showDialog = false">Cancelar</el-button>
          <el-button type="primary" @click="saveCustomer" :loading="saving">
            {{ isEditing ? 'Actualizar' : 'Crear' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
import { useCustomersStore } from '../stores/customers'

const loading = ref(false)
const saving = ref(false)
const showDialog = ref(false)
const isEditing = ref(false)
const formRef = ref(null)

const customersStore = useCustomersStore()
const customers = computed(() => customersStore.customers)

const rules = {
  name: [
    { required: true, message: 'El nombre es requerido', trigger: 'blur' },
    { min: 3, message: 'Mínimo 3 caracteres', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'El correo es requerido', trigger: 'blur' },
    { type: 'email', message: 'Correo inválido', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: 'El teléfono es requerido', trigger: 'blur' },
    { pattern: /^[0-9()\-\s]+$/, message: 'Teléfono inválido', trigger: 'blur' }
  ],
  address: [
    { required: true, message: 'La dirección es requerida', trigger: 'blur' },
    { min: 10, message: 'La dirección es muy corta', trigger: 'blur' }
  ]
}

const customerForm = reactive({
  name: '',
  email: '',
  phone: '',
  address: ''
})

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function openAddDialog() {
  isEditing.value = false
  showDialog.value = true
}

function editCustomer(customer) {
  isEditing.value = true
  Object.assign(customerForm, customer)
  showDialog.value = true
}

async function saveCustomer() {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    saving.value = true

    if (isEditing.value) {
      await customersStore.updateCustomer(customerForm)
    } else {
      await customersStore.addCustomer(customerForm)
    }
    
    ElMessage({
      type: 'success',
      message: `Cliente ${isEditing.value ? 'actualizado' : 'agregado'} correctamente`
    })
    
    showDialog.value = false
    resetForm()
  } catch (error) {
    ElMessage.error('Por favor, completa todos los campos correctamente')
  } finally {
    saving.value = false
  }
}

async function confirmDelete(customer) {
  try {
    await ElMessageBox.confirm(
      '¿Estás seguro de que deseas eliminar este cliente?',
      'Advertencia',
      {
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }
    )
    
    await customersStore.deleteCustomer(customer.id)
    ElMessage({
      type: 'success',
      message: 'Cliente eliminado correctamente'
    })
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Error al eliminar el cliente')
    }
  }
}

function resetForm() {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  Object.assign(customerForm, {
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  isEditing.value = false
}
</script>
