import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCustomersStore = defineStore('customers', () => {
  const customers = ref([
    {
      id: 1,
      name: 'Ana García',
      email: 'ana@email.com',
      phone: '555-0101',
      address: 'Calle 1 #123',
      lastOrder: '2024-01-09'
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      email: 'carlos@email.com',
      phone: '555-0102',
      address: 'Av. Principal #456',
      lastOrder: '2024-01-08'
    },
    {
      id: 3,
      name: 'María López',
      email: 'maria@email.com',
      phone: '555-0103',
      address: 'Plaza Central #789',
      lastOrder: '2024-01-07'
    }
  ])

  function addCustomer(customer) {
    customers.value.push({
      id: customers.value.length + 1,
      ...customer,
      lastOrder: '-'
    })
  }

  function updateCustomer(updatedCustomer) {
    const index = customers.value.findIndex(c => c.id === updatedCustomer.id)
    if (index > -1) {
      customers.value[index] = {
        ...customers.value[index],
        ...updatedCustomer
      }
    }
  }

  function deleteCustomer(id) {
    const index = customers.value.findIndex(c => c.id === id)
    if (index > -1) {
      customers.value.splice(index, 1)
    }
  }

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer
  }
})
