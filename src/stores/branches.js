import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBranchesStore = defineStore('branches', () => {
  const branches = ref([
    {
      id: 1,
      name: 'Sucursal Centro',
      address: 'Av. Principal #123',
      phone: '555-0201',
      manager: 'Juan Pérez',
      status: 'Activa'
    },
    {
      id: 2,
      name: 'Sucursal Norte',
      address: 'Plaza Norte #456',
      phone: '555-0202',
      manager: 'Ana Martínez',
      status: 'Activa'
    },
    {
      id: 3,
      name: 'Sucursal Sur',
      address: 'Calle Sur #789',
      phone: '555-0203',
      manager: 'Pedro Sánchez',
      status: 'Inactiva'
    }
  ])

  function addBranch(branch) {
    branches.value.push({
      id: branches.value.length + 1,
      ...branch
    })
  }

  function updateBranch(updatedBranch) {
    const index = branches.value.findIndex(b => b.id === updatedBranch.id)
    if (index > -1) {
      branches.value[index] = {
        ...branches.value[index],
        ...updatedBranch
      }
    }
  }

  function deleteBranch(id) {
    const index = branches.value.findIndex(b => b.id === id)
    if (index > -1) {
      branches.value.splice(index, 1)
    }
  }

  return {
    branches,
    addBranch,
    updateBranch,
    deleteBranch
  }
})
