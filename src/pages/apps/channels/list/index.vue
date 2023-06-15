<script setup>
import { useChannelsListStore } from '@/views/apps/channels/useChannelsListStore';

const channelsListStore = useChannelsListStore()
const rowPerPage = ref(50)
const currentPage = ref(1)
const totalPage = ref(1)
const totalChannels = ref(0)
const channels = ref([])
const searchQuery = ref('')

const fetchChannels = () => {
  channelsListStore.fetchChannelsByAddress({
    address: (searchQuery.value) ? searchQuery.value : '',
    pageSize: rowPerPage.value,
    page: currentPage.value - 1
  }).then(response => {
    channels.value = response.data.channel
    totalPage.value = response.data.totalPageCount
    totalChannels.value = response.data.totalChannelCount
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchChannels)

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
  const firstIndex = channels.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = channels.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `${ firstIndex }-${ lastIndex } из ${ totalChannels.value }`
})

const selectedRows = ref([])
const selectAllChannels = ref(false)

watch(selectedRows, () => {
  if (!selectedRows.value.length)
  selectAllChannels.value = false
}, { deep: true })
</script>

<template>
  <section>

    <VCard>
      <VCardText>
        <div class="invoice-list-search">
            <VTextField
              v-model="searchQuery"
              placeholder="Поиск"
              density="compact"
            />
          </div>
      </VCardText>
      <VTable class="text-no-wrap">
        <thead>
          <tr>
            <th scope="col">
              КАНАЛ
            </th>
            <th scope="col" class="text-center" style="width: 10rem;">
              АВТОР
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="channel in channels"
            :key="channel.id"
          >
            <td>
              <div class="d-flex flex-column">
                <h6 class="text-sm font-weight-medium">
                  {{ channel.name }}
                </h6>
                <a
                  :href="'https://t.me/' + channel.address"
                  target="blank"
                  class="text-xs text-medium-emphasis"
                >{{ channel.address }}</a>
              </div>
            </td>
            <td class="text-center" style="width: 10rem;">
              <div class="d-flex align-center text-center justify-center">
                <RouterLink
                  :to="{ name: 'apps-user-view-id', params: { id: channel.user_id } }"
                >
                  Автор канала
                </RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot v-show="!channels.length">
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
