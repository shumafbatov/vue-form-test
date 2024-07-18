<template>
  <div>

    <BaseInput
        type="email"
        field-name="email"
        error-msg="incorrect email!"
        :value="value"
        :errors="errors"
        @change="onChange"
        aria-placeholder="Email"
        placeholder="Email"
    />

  </div>
</template>
<script lang="ts" setup>
import BaseInput from '@/components/inputs/BaseInput.vue'
interface Props {
  value: string,
  errors: string[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const onChange = (value: string ) => {
  if (value) {
    emit('change', value)
  }
}
</script>
