<template>
  <div>
    <VRow
      no-gutters
      class="auth-wrapper"
    >
      <VCol
        cols="12"
        class="auth-card-v2 d-flex align-center justify-center"
      >
        <VCard
          flat
          :max-width="500"
          class="mt-12 mt-sm-0 pa-4"
        >
          <span v-if="!isLoaded">Загрузка...</span>
          <telegram-login-temp
            mode="callback"
            telegram-login="tgauthtestuzbot"
            @loaded='telegramLoadedCallbackFunc'
            @callback="yourCallbackFunction"
          />
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { telegramLoginTemp } from 'vue3-telegram-login';
const isLoaded = ref(false)

function telegramLoadedCallbackFunc () {
  isLoaded.value = true
}

function yourCallbackFunction (user) {
  console.log(user)
}
</script>

<style lang="scss">
  @use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
