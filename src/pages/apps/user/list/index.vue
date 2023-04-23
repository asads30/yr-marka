<script setup>
import axiosIns from '@/plugins/axios';
import { useUserListStore } from '@/views/apps/user/useUserListStore';
import { avatarText } from '@core/utils/formatters';

const userListStore = useUserListStore()
const rowPerPage = ref(50)
const currentPage = ref(1)
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])

const fetchUsers = () => {
  userListStore.fetchUsers({
    pageSize: rowPerPage.value,
    page: currentPage.value
  }).then(response => {
    users.value = response.data.users
    totalPage.value = response.data.totalPageCount
    totalUsers.value = response.data.totalUserCount
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchUsers)

// 👉 watching current page
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
  const firstIndex = users.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = users.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `${ firstIndex }-${ lastIndex } из ${ totalUsers.value }`
})

const selectedRows = ref([])
const selectAllUser = ref(false)

watch(selectedRows, () => {
  if (!selectedRows.value.length)
    selectAllUser.value = false
}, { deep: true })

const blockUser = (username) => {
  const block = axiosIns.post(`user/ban?userId&tgId&username=${username}`)
  console.log(block)
}
</script>

<template>
  <section>

    <VCard>
      <VTable class="text-no-wrap">
        <thead>
          <tr>
            <th scope="col">
              ЮЗЕР
            </th>
            <th scope="col" class="text-center">
              РОЛЬ
            </th>
            <th scope="col" class="text-center">
              БАЛАНС
            </th>
            <th scope="col" class="text-center">
              СТАТУС
            </th>
            <th scope="col" class="text-center">
              ДЕЙСТВИЯ
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
          >
            <td>
              <div class="d-flex align-center">
                <VAvatar
                  variant="tonal"
                  class="me-3"
                  size="34"
                >
                  <span>{{ avatarText(user.first_name + ' ' + user.last_name) }}</span>
                </VAvatar>
                <div class="d-flex flex-column">
                  <h6 class="text-sm font-weight-medium">
                    <RouterLink
                      :to="{ name: 'apps-user-view-id', params: { id: user.id } }"
                      class="font-weight-medium user-list-name"
                    >
                      {{ user.first_name + ' ' + user.last_name }}
                    </RouterLink>
                  </h6>
                  <a
                    :href="'https://t.me/' + user.username"
                    target="blank"
                    class="text-xs text-medium-emphasis"
                  >@{{ user.username }}</a>
                </div>
              </div>
            </td>
            <td class="text-center">
              <VIcon
                icon="mdi-user"
                color="info"
                :size="22"
                class="me-3"
                v-if="user.role_id == 1"
              />
              <span class="text-capitalize text-medium-emphasis">Автор</span>
            </td>
            <td class="text-capitalize text-center">
              {{ user.balance }} ₽
            </td>
            <td class="text-center">
              <VChip
                color="success"
                size="small"
                class="text-capitalize"
                v-if="user.status == 1"
              >Активный</VChip>
              <VChip
                color="error"
                size="small"
                class="text-capitalize"
                v-else
              >Заблокирован</VChip>
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
                    <VListItem :to="{ name: 'apps-user-view-id', params: { id: user.id } }">
                      <template #prepend>
                        <VIcon
                          icon="mdi-eye-outline"
                          :size="20"
                          class="me-3"
                        />
                      </template>
                      <VListItemTitle>Посмотреть</VListItemTitle>
                    </VListItem>
                    <VListItem @click="blockUser(user.username)">
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
        <tfoot v-show="!users.length">
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
