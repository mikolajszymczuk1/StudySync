<template>
  <div class="modalForm">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.modalForm {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
