<script setup>
import { useChannelsListStore } from '@/views/apps/channels/useChannelsListStore';
import axiosIns from '@axios';

const channelsListStore = useChannelsListStore()
const rowPerPage = ref(50)
const currentPage = ref(1)
const totalPage = ref(1)
const totalChannels = ref(0)
const channels = ref([])
const statusBan = ref(false)

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

const paginationData = computed(() => {
  const firstIndex = channels.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = channels.value.length + (currentPage.value - 1) * rowPerPage.value
  return `${ firstIndex }-${ lastIndex } из ${ totalChannels.value }`
})

const selectedRows = ref([])

const banChannel = (id) => {
  try {
    axiosIns.post(`/channel/ban?channelId=${id}`).then(response => {
      if(response.data.success == true){
        fetchChannels()
        statusBan.value = true
      }
    })
  } catch (error) {
    console.log(error)
  }
}
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
            <th scope="col">
              Автор
            </th>
            <!-- <th scope="col" class="text-center">
              ДЕЙСТВИЯ
            </th> -->
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
            <td style="width: 15rem;">
              <RouterLink
                :to="{ name: 'apps-user-view-id', params: { id: channel.user_id } }"
                class="font-weight-medium user-list-name"
              >
                Автор канала
              </RouterLink>
            </td>
            <!-- <td
              class="text-center"
              style="width: 5rem;"
            >
              <VBtn
                variant="text"
                color="default"
                icon
                size="small"
                @click="banChannel(channel.id)"
              >
                <VIcon
                  size="24"
                  icon="mdi-delete"
                />
              </VBtn>
            </td> -->
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
    <VSnackbar
      v-model="statusBan"
      location="top end"
    >
      Канал удален
    </VSnackbar>
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
