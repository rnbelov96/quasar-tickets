<template>
  <div class="app_layout">
    <div class="container"><slot /></div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.app_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex-grow: 1;
}
</style>
