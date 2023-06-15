<script setup>
import { usePayoutsListStore } from '@/views/apps/payouts/usePayoutsListStore';
import { formatDate } from '@core/utils/formatters';

const payoutsListStore = usePayoutsListStore()
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalPayouts = ref(0)
const payouts = ref([])

const fetchPayouts = () => {
  payoutsListStore.fetchPayouts({
    pageSize: rowPerPage.value,
    page: currentPage.value - 1
  }).then(response => {
    payouts.value = response.data.paymentQueries
    totalPage.value = response.data.totalPageCount
    totalPayouts.value = response.data.totalPaymentQueriesCount
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchPayouts)

watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

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
</script>

<template>
  <section>

    <VCard>
      <VTable class="text-no-wrap">
        <thead>
          <tr>
            <th scope="col">
              ID
            </th>
            <th scope="col" class="text-center">
              АВТОР
            </th>
            <th scope="col" class="text-center">
              СУММА
            </th>
            <th scope="col" class="text-center">
              СТАТУС
            </th>
            <th scope="col" class="text-center">
              ДАТА ЗАПРОСА
            </th>
            <!-- <th scope="col" class="text-center">
              ДЕЙСТВИЯ
            </th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="payout in payouts"
            :key="payout.id"
          >
            <td>
              #{{ payout.id }}
            </td>
            <td class="text-center" style="width: 8rem;">
              <RouterLink
                :to="{ name: 'apps-user-view-id', params: { id: payout.user_id } }"
                class="font-weight-medium user-list-name"
              >
                Автор канала
              </RouterLink>
            </td>
            <td class="text-center" style="width: 8rem;">
              {{ payout.amount }} ₽
            </td>
            <td class="text-center" style="width: 8rem;">
              <VChip
                color="success"
                size="small"
                class="text-capitalize"
                v-if="payout.status == 0"
              >Выплачено</VChip>
              <VChip
                color="warning"
                size="small"
                class="text-capitalize"
                v-else
              >Ожидает</VChip>
            </td>
            <td class="text-center" style="width: 8rem;">
              {{ formatDate(payout.createdAt, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) }}
            </td>
            <!-- <td
              class="text-center"
              style="width: 5rem;"
            >
              <VBtn
                size="x-small"
                color="default"
                variant="plain"
                icon
              >
                <VIcon
                  size="24"
                  icon="mdi-dots-vertical"
                />
                <VMenu activator="parent">
                  <VList>
                    <VListItem :to="{ name: 'apps-user-view-id', params: { id: payout.id } }">
                      <template #prepend>
                        <VIcon
                          icon="mdi-eye-outline"
                          :size="20"
                          class="me-3"
                        />
                      </template>
                      <VListItemTitle>Посмотреть</VListItemTitle>
                    </VListItem>
                    <VListItem href="javascript:void(0)">
                      <template #prepend>
                        <VIcon
                          icon="mdi-delete-outline"
                          :size="20"
                          class="me-3"
                        />
                      </template>
                      <VListItemTitle>Блокировать</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </VBtn>
            </td> -->
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
            :items="[50, 100, 200, 500]"
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
