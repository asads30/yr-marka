<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Yarmarka
      <VIcon
        icon="mdi-heart-outline"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
    </span>
  </div>
</template>
