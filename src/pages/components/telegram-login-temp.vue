<template>
  <!-- Callback mode -->
  <span v-if="!isLoaded">Loading...</span>
  <TelegramLoginTemp
    mode="callback"
    telegram-login="yrauthtestbot"
    @loaded="telegramLoadedCallbackFunc"
    @callback="yourCallbackFunction"
  />
</template>

<script setup>
import { ref } from 'vue';

const isLoaded = ref(false)

function telegramLoadedCallbackFunc () {
  console.log('script is loaded')
  isLoaded.value = true
}

function yourCallbackFunction (user) {
  console.log(user)
}
</script>
