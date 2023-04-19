<script setup>
import { useChannelsListStore } from '@/views/apps/channels/useChannelsListStore';

const channelsListStore = useChannelsListStore()
const rowPerPage = ref(50)
const currentPage = ref(1)
const totalPage = ref(1)
const totalChannels = ref(0)
const channels = ref([])

const fetchChannels = () => {
  channelsListStore.fetchChannels({
    pageSize: rowPerPage.value,
    page: currentPage.value
  }).then(response => {
    channels.value = response.data.channels
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
</script>

<template>
  <section>

    <VCard>
      <VTable class="text-no-wrap">
        <thead>
          <tr>
            <th scope="col">
              Название
            </th>
            <th scope="col" class="text-center">
              Автор
            </th>
            <th scope="col" class="text-center">
              ДЕЙСТВИЯ
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
                <a
                  :href="'https://t.me/' + channel.address"
                  target="blank"
                  class="text-xs text-medium-emphasis"
                >{{ channel.address }}</a>
              </div>
            </td>
            <td class="text-center">
              {{ channel.user_id }}
            </td>
            <td
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
                    <VListItem :to="{ name: 'apps-user-view-id', params: { id: channel.id } }">
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
