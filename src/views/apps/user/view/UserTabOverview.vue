<script setup>
const props = defineProps({
  payments: {
    type: Object,
    required: false,
  },
  products: {
    type: Object,
    required: false,
  }
})
</script>

<template>
  <VRow>
    <VCol cols="12" v-if="props.products.length > 0">
      <VCard
        id="invoice-list"
        title="Товары"
      >
        <VTable class="text-no-wrap invoice-list-table">
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
              <th scope="col" class="text-center">
                ДЕЙСТВИЯ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in props.products"
              :key="product.id"
            >
              <td class="post-list-name">
                <RouterLink
                  :to="{ name: 'apps-posts-view-id', params: { id: product.id } }"
                  class="font-weight-medium user-list-name"
                >
                  {{ product.name }}
                </RouterLink>
              </td>
              <td class="text-center" style="width: 12rem;">
                {{ product.price }} ₽
              </td>
              <td class="text-center" style="width: 12rem;">
                  <RouterLink
                    :to="{ name: 'apps-channels-view-id', params: { id: product.channel_id } }"
                    class="font-weight-medium user-list-name"
                  >
                    Канал товара
                  </RouterLink>
                </td>
                <td class="text-center" style="width: 12rem;">
                <RouterLink
                  :to="{ name: 'apps-user-view-id', params: { id: product.user_id } }"
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
                  v-if="product.status == 1"
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
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
    <VCol cols="12" v-if="props.payments.length > 0">
      <VCard
        id="invoice-list"
        title="Платежи"
      >
        <VTable class="text-no-wrap invoice-list-table">
          <thead>
            <tr>
              <th scope="col">
                ID
              </th>
              <th scope="col" class="text-center">
                СУММА
              </th>
              <th scope="col" class="text-center">
                ПОКУПАТЕЛЬ
              </th>
              <th scope="col" class="text-center">
                ТОВАР
              </th>
              <th scope="col" class="text-center">
                ДЕЙСТВИЯ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="payment in props.payments"
              :key="payment.id"
            >
              <td>
                <RouterLink
                  :to="{ name: 'apps-user-view-id', params: { id: payment.id } }"
                >
                  #{{ payment.id }}
                </RouterLink>
              </td>
              <td class="text-center">
                {{ payment.price }} ₽
              </td>
              <td class="text-center">
                {{ payment.name }}
              </td>
              <td class="text-center">
                {{ payment.product_id }}
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
                >
                  <VIcon
                    size="24"
                    icon="mdi-check"
                  />
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
