<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="sm:flex sm:items-center sm:justify-between mb-6">
      <h2 class="text-2xl font-bold">Sucursales</h2>
      <button
        @click="openAddDialog"
        class="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <el-icon class="mr-2"><Plus /></el-icon>
        Agregar Sucursal
      </button>
    </div>

    <el-table
      :data="branches"
      style="width: 100%"
      :border="true"
      v-loading="loading"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="Nombre" min-width="180">
        <template #default="{ row }">
          <div class="flex items-center">
            <el-icon class="mr-2 text-gray-400" :size="20"><Shop /></el-icon>
            {{ row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="Dirección" min-width="200" show-overflow-tooltip />
      <el-table-column prop="phone" label="Teléfono" min-width="120" />
      <el-table-column prop="manager" label="Gerente" min-width="150" />
      <el-table-column prop="status" label="Estado" width="120">
        <template #default="{ row }">
          <el-tag :type="row.status === 'Activa' ? 'success' : 'danger'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Acciones" width="150">
        <template #default="{ row }">
          <div class="flex space-x-2">
            <el-button
              @click="editBranch(row)"
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

    <!-- Dialog para agregar/editar sucursal -->
    <el-dialog
      v-model="showDialog"
      :title="isEditing ? 'Editar Sucursal' : 'Agregar Sucursal'"
      width="500px"
      :close-on-click-modal="false"
      @close="resetForm"
    >
      <el-form
        ref="formRef"
        :model="branchForm"
        :rules="rules"
        label-width="120px"
        label-position="top"
        @submit.prevent="saveBranch"
      >
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="branchForm.name" placeholder="Nombre de la sucursal" />
        </el-form-item>
        <el-form-item label="Dirección" prop="address">
          <el-input
            v-model="branchForm.address"
            type="textarea"
            :rows="3"
            placeholder="Dirección completa"
          />
        </el-form-item>
        <el-form-item label="Teléfono" prop="phone">
          <el-input v-model="branchForm.phone" placeholder="(555) 555-5555" />
        </el-form-item>
        <el-form-item label="Gerente" prop="manager">
          <el-input v-model="branchForm.manager" placeholder="Nombre del gerente" />
        </el-form-item>
        <el-form-item label="Estado" prop="status">
          <el-select v-model="branchForm.status" class="w-full">
            <el-option label="Activa" value="Activa" />
            <el-option label="Inactiva" value="Inactiva" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <el-button @click="showDialog = false">Cancelar</el-button>
          <el-button type="primary" @click="saveBranch" :loading="saving">
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
import { Edit, Delete, Plus, Shop } from '@element-plus/icons-vue'
import { useBranchesStore } from '../stores/branches'

const loading = ref(false)
const saving = ref(false)
const showDialog = ref(false)
const isEditing = ref(false)
const formRef = ref(null)

const branchesStore = useBranchesStore()
const branches = computed(() => branchesStore.branches)

const rules = {
  name: [
    { required: true, message: 'El nombre es requerido', trigger: 'blur' },
    { min: 3, message: 'Mínimo 3 caracteres', trigger: 'blur' }
  ],
  address: [
    { required: true, message: 'La dirección es requerida', trigger: 'blur' },
    { min: 10, message: 'La dirección es muy corta', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: 'El teléfono es requerido', trigger: 'blur' },
    { pattern: /^[0-9()\-\s]+$/, message: 'Teléfono inválido', trigger: 'blur' }
  ],
  manager: [
    { required: true, message: 'El gerente es requerido', trigger: 'blur' },
    { min: 3, message: 'Mínimo 3 caracteres', trigger: 'blur' }
  ],
  status: [
    { required: true, message: 'El estado es requerido', trigger: 'blur' }
  ]
}

const branchForm = reactive({
  name: '',
  address: '',
  phone: '',
  manager: '',
  status: 'Activa'
})

function openAddDialog() {
  isEditing.value = false
  showDialog.value = true
}

function editBranch(branch) {
  isEditing.value = true
  Object.assign(branchForm, branch)
  showDialog.value = true
}

async function saveBranch() {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    saving.value = true

    if (isEditing.value) {
      await branchesStore.updateBranch(branchForm)
    } else {
      await branchesStore.addBranch(branchForm)
    }
    
    ElMessage({
      type: 'success',
      message: `Sucursal ${isEditing.value ? 'actualizada' : 'agregada'} correctamente`
    })
    
    showDialog.value = false
    resetForm()
  } catch (error) {
    ElMessage.error('Por favor, completa todos los campos correctamente')
  } finally {
    saving.value = false
  }
}

async function confirmDelete(branch) {
  try {
    await ElMessageBox.confirm(
      '¿Estás seguro de que deseas eliminar esta sucursal?',
      'Advertencia',
      {
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }
    )
    
    await branchesStore.deleteBranch(branch.id)
    ElMessage({
      type: 'success',
      message: 'Sucursal eliminada correctamente'
    })
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Error al eliminar la sucursal')
    }
  }
}

function resetForm() {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  Object.assign(branchForm, {
    name: '',
    address: '',
    phone: '',
    manager: '',
    status: 'Activa'
  })
  isEditing.value = false
}
</script>
