<script setup>
</script>

<template>
  <VCard class="pa-2 overflow-visible">
    <VRow no-gutters>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
@use "@layouts/styles/mixins" as layoutsMixins;

.john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 0;
}

// for rtl only
.flip-in-rtl {
  @include layoutsMixins.rtl {
    transform: scaleX(-1);
  }
}

@media screen and (max-width: 440px) {
  .john-illustration {
    inline-size: 100%;
  }
}
</style>
