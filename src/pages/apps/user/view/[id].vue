<script setup>
import { useUserListStore } from '@/views/apps/user/useUserListStore';
import UserBioPanel from '@/views/apps/user/view/UserBioPanel.vue';
import UserTabBillingsPlans from '@/views/apps/user/view/UserTabBillingsPlans.vue';
import UserTabOverview from '@/views/apps/user/view/UserTabOverview.vue';

const userListStore = useUserListStore()
const route = useRoute()
const userData = ref()
const userTab = ref(null)
const channels = ref([])
const payments = ref([])
const products = ref([])

const tabs = [
  {
    icon: 'mdi-account-outline',
    title: 'Информация',
  },
  {
    icon: 'mdi-bookmark-outline',
    title: 'Выплаты',
  },
]

userListStore.fetchUserById(Number(route.params.id)).then(response => {
  userData.value = response.data
})
userListStore.fetchUserChannelsById(Number(route.params.id)).then(response => {
  channels.value = response.data
})
userListStore.fetchUserPaymentsById(Number(route.params.id)).then(response => {
  payments.value = response.data.payments
})
userListStore.fetchUserProductsById(Number(route.params.id)).then(response => {
  products.value = response.data.products
})
</script>

<template>
  <VRow v-if="userData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <UserBioPanel :user-data="userData" :channels="channels" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            start
            :size="24"
            :icon="tab.icon"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <UserTabOverview :payments="payments" :products="products" />
        </VWindowItem>

        <VWindowItem>
          <UserTabBillingsPlans />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
