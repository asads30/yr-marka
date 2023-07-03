<script setup>
import axiosIns from '@/plugins/axios';
import { usePayoutsListStore } from '@/views/apps/payouts/usePayoutsListStore';
import { avatarText } from '@core/utils/formatters';

const payoutsListStore = usePayoutsListStore()
const rowPerPage = ref(30)
const currentPage = ref(1)
const totalPage = ref(1)
const totalPayouts = ref(0)
const payouts = ref([])

const fetchPayouts = () => {
  payoutsListStore.fetchVerify({
    pageSize: rowPerPage.value,
    page: currentPage.value - 1
  }).then(response => {
    payouts.value = response.data.verifyRequests
    totalPage.value = 1
    totalPayouts.value = response.data.totalVerifyRequestsCount
  }).catch(error => {
    console.error(error)
  })
}

const changeStatus = (userid) => {
  let data = {
    status: 1
  };
  axiosIns.patch(`verifyRequest/?userId=${userid}`, data).then(response => {
    if(response){
      watchEffect(fetchPayouts)
    }
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchPayouts)

watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

const paginationData = computed(() => {
  const firstIndex = payouts.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = payouts.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `${ firstIndex }-${ lastIndex } из ${ totalPayouts.value }`
})

const selectedRows = ref([])
const selectAllPayouts = ref(false)

watch(selectedRows, () => {
  if (!selectedRows.value.length)
  selectAllPayouts.value = false
}, { deep: true })
</script>

<template>
  <section>

    <VCard>
      <VTable class="text-no-wrap">
        <thead>
          <tr>
            <th scope="col">
                ПОЛЬЗОВАТЕЛЬ
            </th>
            <th scope="col">
                ДАННЫЕ
            </th>
            <th scope="col">
              СТАТУС
            </th>
            <th scope="col" class="text-center">
              ДЕЙСТВИЯ
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="payout in payouts"
            :key="payout.id"
          >
            <td>
                <div class="d-flex align-center">
                    <VAvatar
                    variant="tonal"
                    class="me-3"
                    size="34"
                    >
                    <span>{{ avatarText(payout.User.first_name + ' ' + payout.User.last_name) }}</span>
                    </VAvatar>
                    <div class="d-flex flex-column">
                    <h6 class="text-sm font-weight-medium">
                        <RouterLink
                        :to="{ name: 'apps-user-view-id', params: { id: payout.User.id } }"
                        class="font-weight-medium user-list-name"
                        >
                        {{ payout.User.first_name + ' ' + payout.User.last_name }}
                        </RouterLink>
                    </h6>
                    <a
                        :href="'https://t.me/' + payout.User.username"
                        target="blank"
                        class="text-xs text-medium-emphasis"
                    >@{{ payout.User.username }}</a>
                    </div>
                </div>
            </td>
            <td>
              <div class="d-flex flex-column pt-1 pb-1">
                <h6 class="text-sm font-weight-regular"><strong>ИНН: </strong>{{ payout.y_user_secret.inn }}</h6>
                <h6 class="text-sm font-weight-regular"><strong>ФИО: </strong>{{ payout.y_user_secret.fio }}</h6>
                <h6 class="text-sm font-weight-regular"><strong>Банк.номер: </strong>{{ payout.y_user_secret.bank_account_number }}</h6>
                <h6 class="text-sm font-weight-regular"><strong>BIC: </strong>{{ payout.y_user_secret.bic }}</h6>
                <h6 class="text-sm font-weight-regular"><strong>Корреспондент: </strong>{{ payout.y_user_secret.correspondent_account }}</h6>
              </div>
            </td>
            <td class="text-center" style="width: 8rem;">
              <VChip
                color="success"
                size="small"
                class="text-capitalize"
                v-if="payout.status == 1"
              >Подтверждено</VChip>
              <VChip
                color="error"
                size="small"
                class="text-capitalize"
                v-else-if="payout.status == 2"
              >Отменен</VChip>
              <VChip
                color="error"
                size="small"
                class="text-capitalize"
                v-else-if="payout.status == 3"
              >Требует ручной проверки</VChip>
              <VChip
                color="warning"
                size="small"
                class="text-capitalize"
                v-else
              >Ожидает</VChip>
            </td>
            <td
              class="text-center"
              style="width: 5rem;"
            >
              <VBtn
                variant="text"
                color="default"
                icon
                size="small"
                @click="changeStatus(payout.User.id)"
                v-if="payout.status == 3 || payout.status == 0"
              >
                <VIcon
                  size="24"
                  icon="mdi-check"
                />
              </VBtn>
            </td>
          </tr>
        </tbody>
        <tfoot v-show="!payouts.length">
          <tr>
            <td
              colspan="7"
              class="text-center"
            >
              No data available
            </td>
          </tr>
        </tfoot>
      </VTable>
      <VDivider />
      <VCardText class="d-flex align-center flex-wrap justify-end gap-4 pa-2">
        <div
          class="d-flex align-center me-3"
          style="width: 171px;"
        >
          <span class="text-no-wrap me-3">Количество:</span>
          <VSelect
            v-model="rowPerPage"
            density="compact"
            variant="plain"
            class="user-pagination-select"
            :items="[10, 20, 50, 100]"
          />
        </div>
        <div class="d-flex align-center">
          <h6 class="text-sm font-weight-regular">
            {{ paginationData }}
          </h6>
          <VPagination
            v-model="currentPage"
            size="small"
            :total-visible="1"
            :length="totalPage"
            @next="selectedRows = []"
            @prev="selectedRows = []"
          />
        </div>
      </VCardText>
    </VCard>
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 24.0625rem;
}
.text-capitalize {
  text-transform: capitalize;
}
.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>

<style lang="scss" scope>
.user-pagination-select {
  .v-field__input,
  .v-field__append-inner {
    padding-block-start: 0.3rem;
  }
}
</style>
