<template>
  <div :class="['input-field', {'error': errors.includes(fieldName) }]">

    <div>
      <input
          class="input-field__element"
          :type="type"
          :value="filteredValue(value)"
          :aria-placeholder="ariaPlaceholder"
          :placeholder="placeholder"
          autocomplete="off"
          @change="onInput"
          @input="onInput"
      >
    </div>
    <div class="input-field__error" v-if="errors.includes(fieldName)">
      {{ errorMsg }}
    </div>


  </div>
</template>
<script lang="ts" setup>

import { formatNumber } from "@/utils";

interface Props {
  value: string | number | null
  type: string
  fieldName: string
  errorMsg?: string
  ariaPlaceholder: string
  placeholder: string
  isMask?: boolean
  errors?: string[]
}

const prop = withDefaults(defineProps<Props>(),{
  errors: () => []
})

const emit = defineEmits<{
  (e: 'change', value: string | null): void
  (e: 'input', value: string): void
}>()

const onChange = (data: string) => {
  if (prop.isMask) {
    const val = data.replaceAll('-','')
    if (val) {
      emit('change', val)
    } else {
      emit('change', null)
    }

  } else {
    emit('change', data)
  }
}
const onInput = (event: InputEvent) => {
  event.preventDefault()
  const { value } = event.target || ''
  onChange(value)
}
const filteredValue = (value)=>{
  if (prop.isMask && typeof prop.value === 'number') return formatNumber(value+'')
  if (prop.isMask && !prop.value) return undefined
  return value
}

</script>
<style lang="less" scoped>
.input-field {
  margin: 5px;
  &__element {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
  }
  &__error {
    color: red;
    font-size: 0.7em;
  }
}
.error .input-field__element {
  border: 1px solid red;
}

</style>
