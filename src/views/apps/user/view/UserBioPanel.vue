<script setup>
import {
avatarText,
formatDate
} from '@core/utils/formatters';

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
  channels: {
    type: Object,
    required: true
  }
})

const isUserInfoEditDialogVisible = ref(false)
const isUpgradePlanDialogVisible = ref(false)

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard v-if="props.userData">
        <VCardText class="text-center pt-15">
          <VAvatar
            rounded="sm"
            :size="120"
            color="primary"
            variant="tonal"
          >
            <span
              class="text-5xl font-weight-medium"
            >
              {{ avatarText(props.userData.first_name + ' ' + props.userData.last_name) }}
            </span>
          </VAvatar>
          
          <h6 class="text-h6 mt-4">
            {{ props.userData.first_name + ' ' + props.userData.last_name }}
          </h6>
          
          <VChip
            label
            color="info"
            size="small"
            class="text-capitalize mt-4"
            v-if="props.userData.role_id == 1"
          >
            Автор
          </VChip>
        </VCardText>

        <VCardText class="d-flex flex-wrap mt-3">
          <div class="d-flex align-center me-8 mb-2">
            <div>
              <h6 class="text-h6">
                {{ props.userData.balance }} ₽
              </h6>
              <span>Баланс</span>
            </div>
          </div>
        </VCardText>

        <VCardText>
          <h6 class="text-h6">
            Детали
          </h6>

          <VDivider class="mt-4" />

          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Username:
                  <a
                    :href="'https://t.me/' + props.userData.username"
                    target="blank"
                    class="text-xs text-medium-emphasis"
                  >@{{ props.userData.username }}</a>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Статус:

                  <VChip
                    color="success"
                    size="small"
                    class="text-capitalize"
                    v-if="props.userData.status == 1"
                  >Активный</VChip>
                  <VChip
                    color="error"
                    size="small"
                    class="text-capitalize"
                    v-else
                  >Заблокирован</VChip>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Telegram ID:
                  <span class="text-body-2">
                    {{ props.userData.tg_user_id }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Дата регистрации:
                  <span class="text-body-2">
                    {{ formatDate(props.userData.createdAt, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- <VCardText class="d-flex justify-center">
          <VBtn
            variant="tonal"
            color="error"
            v-if="props.userData.status == 1"
          >
            Блокировать
          </VBtn>
          <VBtn
            variant="tonal"
            color="warning"
            v-else
          >
            Разблокировать
          </VBtn>
        </VCardText> -->
      </VCard>
    </VCol>
    
    <VCol cols="12" v-if="props.channels.length > 0">
      <VCard title="Каналы">
        <VDivider />
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">АДРЕС</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="channel in props.channels"
              :key="channel.id"
            >
              <td>
                {{ channel.id }}
              </td>
              <td>
                <a
                  :href="'https://t.me/' + channel.address"
                  target="blank"
                  class="text-xs text-medium-emphasis"
                >{{ channel.address }}</a>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>

  <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="props.userData"
  />

  <UserUpgradePlanDialog v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.8rem;
}

.current-plan {
  border: 2px solid rgb(var(--v-theme-primary));
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
