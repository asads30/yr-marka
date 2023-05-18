<script setup>
import { usePostsListStore } from '@/views/apps/posts/usePostsListStore';

const postListStore = usePostsListStore()
const route = useRoute()
const postData = ref()

postListStore.fetchPostById(Number(route.params.id)).then(response => {
  postData.value = response.data
})
</script>

<template>
  <VRow v-if="postData">
    <VCol
      cols="12"
    >
      <VCard class="post-item">
        <VCardText class="pt-10 pb-5">
          <h1 class="post-title mb-5">{{ postData.name }}</h1>
          <p class="post-des">{{ postData.description }}</p>
          <p><strong>Цена:</strong> {{ postData.price }} рублей</p>
          <div class="post-body mb-3" v-show="postData.comment_after_buy">
            <strong>После оплаты: </strong>{{ postData.comment_after_buy }}
          </div>
          <div class="post-links">
            <RouterLink
              :to="{ name: 'apps-user-view-id', params: { id: postData.user_id } }"
              class="font-weight-medium user-list-name"
            >
              Автор товара
            </RouterLink>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
