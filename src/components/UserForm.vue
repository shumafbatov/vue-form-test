<template>
  <div class="form">
    <div>
      <span>type: jams@gmail.com</span>
    </div>
    <form action="">
      <div class="form__fields">
        <InputEmail
            type="email"
            placeholder="Email"
            :value="data.email"
            :errors="errors"
            @change="onChange({fieldName: 'email', value: $event})"
        />

        <InputNumber
            type="text"
            placeholder="Number"
            :value="data.number"
            @change="onChange({fieldName: 'number', value: +$event})"
        />
      </div>
      <div class="form__actions">
        <button class="submit" type="submit" @click="onSubmit"> submit</button>
      </div>
      <div class="form__info">
        <div
            v-if="!isLoading && userList.length"
            v-for="(item,i) in userList"
            :key="i"
        >
          <span> {{ item.email }} - {{ item.number }}</span>
        </div>
        <div class="skeleton" v-else-if="isLoading">
          <div class="skeleton__item is-first" />
          <div class="skeleton__item" />
          <div class="skeleton__item is-last" />
        </div>
      </div>
    </form>

  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import InputNumber from '@/components/inputs/InputNumber.vue'
import InputEmail from "@/components/inputs/InputEmail.vue";
import { abortController, getControllerSignal, reinitController } from "@/services";

const data = ref({
  email: '',
  number: null,
})

const errors = ref([])

const isLoading = ref(false)
const userList = ref([])

const onSubmit = (event: unknown)=>{
  event.preventDefault()

  if (validator(data.value.email)) {
    if (isLoading.value) {
      abortController()
      reinitController()
    }

    onSave()
  }
}
const validator = (email: string) => {
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const isValid = EMAIL_REGEXP.test(email)

  if (!isValid) {
    errors.value.push('email')
  } else {
    errors.value = []
  }

  return isValid
}

const onChange = ({ fieldName, value })=>{
  const dataFunctions = {
    email: () => {
      data.value.email = value
    },
    number: () => {
      data.value.number = value
    },
  }

  const fn = dataFunctions[fieldName]

  if (typeof fn === 'function') {
    fn()
  }

}

 const onSave = async () => {
  try {
    isLoading.value = true
    let response = await fetch(`${import.meta.env.VITE_SERVER}form`, {

      signal: getControllerSignal(),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data.value)
    });

     let result = await response.json();
     if (Array.isArray(result)) {
       userList.value = result
     }
    isLoading.value = false
  } catch (err) {
    if (err.name == 'AbortError') {
      console.warn("Aborted!");
    } else {
      throw err;
    }
  }
}
</script>

<style lang="less" scoped>
.form{
  min-height: 500px;
  min-width: 500px;
  border-radius: 2rem;
  border: 1px solid #ddd;
  box-shadow: 0.1rem 0.1rem 0.5rem rgba(0,0,0,0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 5px;
  & form {
    min-width: 100px;
  }
  &__fields {
    margin: 50px 0;
  }
  &__actions {
    max-width: 300px;
    width: 100%;
    margin-bottom: 20px;
  }
  &__info {
    width: 100%;
  }
}
.submit {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  background-color: blue;
  color: #fff;
  cursor: pointer;
  width: 100%;
}
.skeleton {
  width: 100%;
  &__item {
    height: 16px;
    min-width: 20px;
    width: inherit;
    border-radius: 5px;
    background: linear-gradient(90deg,#f0f2f2 30%,#cccccc 40%,#f0f0f0 70%);
    background-size: 400% 100%;
    animation: skeleton-loading 1.5s ease infinite;
    margin-bottom: 5px;
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.is-first {
  width: 60%;
}
.is-last {
  width: 80%;
}

</style>
