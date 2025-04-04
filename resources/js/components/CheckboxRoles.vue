<script setup lang="ts">
import { computed } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Role } from '@/models/User';

interface Props {
  roles: Role[];
  modelValue: number[];
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

// Array local para mantener los IDs de roles seleccionados
const selectedRoleIds = computed({
  get: () => props.modelValue,
  set: (newValues) => emit('update:modelValue', newValues)
})

// Verificar si un rol está seleccionado
const isRoleSelected = (roleId: number) => {
  return selectedRoleIds.value.includes(roleId)
}

// Manejar el cambio de un checkbox de rol
const handleRoleChange = (roleId: number, checked: boolean) => {
  const newValues = [...selectedRoleIds.value]
  
  if (checked) {
    if (!newValues.includes(roleId)) {
      newValues.push(roleId)
    }
  } else {
    const index = newValues.indexOf(roleId)
    if (index !== -1) {
      newValues.splice(index, 1)
    }
  }
  
  selectedRoleIds.value = newValues
}
</script>

<template>
  <div class="space-y-3">
    <div v-for="role in roles" :key="role.id" class="flex items-center space-x-2">
      <Checkbox 
        :id="String(role.id)" 
        :checked="isRoleSelected(role.id)"
        @update:checked="(checked) => handleRoleChange(role.id, checked)"
        name="user-roles"
      />
      <Label :for="String(role.id)" class="cursor-pointer">{{ role.name }}</Label>
    </div>
  </div>
</template>