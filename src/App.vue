<script setup>
import { useThemeConfig } from '@core/composable/useThemeConfig';
import { hexToRgb } from '@layouts/utils';
import { useTheme } from 'vuetify';

const {
  syncInitialLoaderTheme,
  syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme,
  isAppRtl,
} = useThemeConfig()

const { global } = useTheme()

syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
</script>

<template>
  <VLocaleProvider>
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
    </VApp>
  </VLocaleProvider>
</template>
