<script setup>
import { ref } from 'vue';
import { telegramLoginTemp } from 'vue3-telegram-login';
const isLoaded = ref(false)

function telegramLoadedCallbackFunc () {
  console.log('script is loaded')
  isLoaded.value = true
}

function yourCallbackFunction (user) {
  console.log(user)
}
</script>

<template>
    <span v-if="!isLoaded">Loading...</span>
    <telegram-login-temp
        mode="callback"
        @loaded='telegramLoadedCallbackFunc'
        telegram-login="yrauthtestbot"
        @callback="yourCallbackFunction"
    />
</template>