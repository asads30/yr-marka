<script setup>
import { useInvoiceListStore } from '@/views/apps/invoice/useInvoiceListStore';
import { formatDate } from '@core/utils/formatters';
const invoiceListStore = useInvoiceListStore()
const rowPerPage = ref(50)
const currentPage = ref(1)
const totalPage = ref(1)
const totalInvoices = ref(0)
const invoices = ref([])

const fetchInvoice = () => {
  invoiceListStore.fetchInvoice({
    pageSize: rowPerPage.value,
    page: currentPage.value
  }).then(response => {
    invoices.value = response.data.payments
    totalPage.value = response.data.totalPageCount
    totalInvoices.value = response.data.totalPaymentsCount
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchInvoice)

watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

const paginationData = computed(() => {
  const firstIndex = invoices.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = invoices.value.length + (currentPage.value - 1) * rowPerPage.value
  return `${ firstIndex }-${ lastIndex } из ${ totalInvoices.value }`
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
            <th scope="col">
              СУММА
            </th>
            <th scope="col">
              ДАТА ПЛАТЕЖА
            </th>
            <th scope="col" class="text-center">
              ПОКУПАТЕЛЬ
            </th>
            <th scope="col" class="text-center">
              ПРОДАВЕЦ
            </th>
            <th scope="col" class="text-center">
              ТОВАР
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="invoice in invoices"
            :key="invoice.id"
          >
            <td>
              №{{ invoice.id }}
            </td>
            <td style="width: 10rem;">
              {{ invoice.price }} ₽
            </td>
            <td style="width: 10rem;">
              {{ formatDate(invoice.createdAt, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) }}
            </td>
            <td class="text-center" style="width: 10rem;">
              {{ invoice.name }}
            </td>
            <td class="text-center" style="width: 10rem;">
              <RouterLink
                :to="{ name: 'apps-user-view-id', params: { id: invoice.user_id } }"
              >
                Автор канала
              </RouterLink>
            </td>
            <td class="text-center" style="width: 10rem;">
              <RouterLink
                :to="{ name: 'apps-posts-view-id', params: { id: invoice.product_id } }"
              >
                Товар платежа
              </RouterLink>
            </td>
          </tr>
        </tbody>
        <tfoot v-show="!invoices.length">
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
