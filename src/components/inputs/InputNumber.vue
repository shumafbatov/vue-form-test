<template>
  <div>

    <BaseInput
        type="text"
        :value="value"
        is-mask
        field-name="number"
        @change="onChange"
        aria-placeholder="Number"
        placeholder="Number"
    />

  </div>
</template>
<script lang="ts" setup>
import BaseInput from '@/components/inputs/BaseInput.vue'

interface Props {
  value: number | null
}
defineProps<Props>()
const emit = defineEmits<{
  (e: 'change', value: number | null): void
}>()

const onChange = (value: string ) => {
    emit('change', value ? +value : null)
}
</script>
