<script setup>
const props = defineProps({
  payouts: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Платежные данные">
        <VCardText class="d-flex flex-column gap-y-4">
          <VCard
            border
            flat
          >
            <VCardText class="d-flex flex-sm-row flex-column">
              <div class="text-no-wrap">
                <h4 class="text-base font-weight-medium mb-3">ИНН</h4>
                <span class="text-body-1">{{ payouts.inn }}</span>
              </div>
            </VCardText>
            <VCardText class="d-flex flex-sm-row flex-column">
              <div class="text-no-wrap">
                <h4 class="text-base font-weight-medium my-3">ФИО</h4>
                <span class="text-body-1">{{ payouts.fio }}</span>
              </div>
            </VCardText>
            <VCardText class="d-flex flex-sm-row flex-column">
              <div class="text-no-wrap">
                <h4 class="text-base font-weight-medium my-3">Номер счета</h4>
                <span class="text-body-1">{{ payouts.bank_account_number }}</span>
              </div>
            </VCardText>
            <VCardText class="d-flex flex-sm-row flex-column">
              <div class="text-no-wrap">
                <h4 class="text-base font-weight-medium my-3">BIC</h4>
                <span class="text-body-1">{{ payouts.bic }}</span>
              </div>
            </VCardText>
            <VCardText class="d-flex flex-sm-row flex-column">
              <div class="text-no-wrap">
                <h4 class="text-base font-weight-medium my-3">Номер корреспондента</h4>
                <span class="text-body-1">{{ payouts.correspondent_account }}</span>
              </div>
            </VCardText>
          </VCard>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
