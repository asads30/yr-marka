<script setup>
import { useUserListStore } from '@/views/apps/user/useUserListStore';
import UserBioPanel from '@/views/apps/user/view/UserBioPanel.vue';
import UserTabBillingsPlans from '@/views/apps/user/view/UserTabBillingsPlans.vue';
import UserTabOverview from '@/views/apps/user/view/UserTabOverview.vue';

const userListStore = useUserListStore()
const route = useRoute()
const userData = ref()
const userTab = ref(null)

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

userListStore.fetchUser(Number(route.params.id)).then(response => {
  userData.value = response.data
})
</script>

<template>
  <VRow v-if="userData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <UserBioPanel :user-data="userData" />
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
          <UserTabOverview />
        </VWindowItem>

        <VWindowItem>
          <UserTabBillingsPlans />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
