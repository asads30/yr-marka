<script setup>
import { usePostsListStore } from '@/views/apps/posts/usePostsListStore';

const postsListStore = usePostsListStore()
const rowPerPage = ref(50)
const currentPage = ref(1)
const totalPage = ref(1)
const totalPosts = ref(0)
const posts = ref([])

const fetchPosts = () => {
  postsListStore.fetchPosts({
    pageSize: rowPerPage.value,
    page: currentPage.value
  }).then(response => {
    console.log(response.headers)
    posts.value = response.data.products
    totalPage.value = response.data.totalPageCount
    totalPosts.value = response.data.totalProductCount
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchPosts)

watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

const paginationData = computed(() => {
  const firstIndex = posts.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = posts.value.length + (currentPage.value - 1) * rowPerPage.value
  return `${ firstIndex }-${ lastIndex } из ${ totalPosts.value }`
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
              Стоимость
            </th>
            <th scope="col" class="text-center">
              Канал
            </th>
            <th scope="col" class="text-center">
              Автор
            </th>
            <th scope="col" class="text-center">
              Статус
            </th>
            <!-- <th scope="col" class="text-center">
              ДЕЙСТВИЯ
            </th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="post in posts"
            :key="post.id"
          >
            <td class="post-list-name">
              <RouterLink
                :to="{ name: 'apps-posts-view-id', params: { id: post.post_id } }"
                class="font-weight-medium user-list-name"
              >
                {{ post.name }}
              </RouterLink>
            </td>
            <td class="text-center" style="width: 12rem;">
              {{ post.price }} ₽
            </td>
            <td class="text-center" style="width: 12rem;">
              <RouterLink
                :to="{ name: 'apps-channels-view-id', params: { id: post.channel_id } }"
                class="font-weight-medium user-list-name"
              >
                Канал товара
              </RouterLink>
            </td>
            <td class="text-center" style="width: 12rem;">
              <RouterLink
                :to="{ name: 'apps-user-view-id', params: { id: post.user_id } }"
                class="font-weight-medium user-list-name"
              >
                Автор товара
              </RouterLink>
            </td>
            <td class="text-center" style="width: 12rem;">
              <VChip
                color="success"
                size="small"
                class="text-capitalize"
                v-if="post.status == 1"
              >Активный</VChip>
              <VChip
                color="error"
                size="small"
                class="text-capitalize"
                v-else
              >Заблокирован</VChip>
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
              >
                <VIcon
                  size="24"
                  icon="mdi-delete"
                />
              </VBtn>
            </td> -->
          </tr>
        </tbody>
        <tfoot v-show="!posts.length">
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
.post-list-name{
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
