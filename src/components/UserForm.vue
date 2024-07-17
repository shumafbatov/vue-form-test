<template>
  <form action="" class="form">
    <div>
      <input type="email" placeholder="Email">
    </div>
    <div>
      <input type="text">
    </div>
    <div>
      <button type="submit" @click="onSubmit"> submit</button>
    </div>
  </form>
</template>
<script setup lang="ts">
</script>
const onSubmit = (event: Event)=> {
console.log('test')
}
<style scoped>
.form {
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
}
</style>
